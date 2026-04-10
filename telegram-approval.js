/**
 * career-ops Telegram Approval Bot
 *
 * Sends a Telegram message with inline keyboard before any job application submit.
 * The apply mode calls sendApprovalRequest() and awaits the user's decision.
 *
 * Modes:
 *   development (NODE_ENV=development): polling mode — works locally without a public URL
 *   production  (NODE_ENV=production):  webhook mode — runs on Render, always online
 */

import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import { readFileSync, existsSync } from 'fs';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const RENDER_URL = process.env.RENDER_EXTERNAL_URL; // Auto-injected by Render
const PORT = process.env.PORT || 3000;

// Use webhook mode when running on Render (RENDER_EXTERNAL_URL is always set by Render)
// Use polling mode locally (no public URL needed)
const IS_RENDER = !!RENDER_URL;

if (!TOKEN) {
  console.error('[career-ops] TELEGRAM_BOT_TOKEN is not set in .env');
  process.exit(1);
}
if (!CHAT_ID) {
  console.error('[career-ops] TELEGRAM_CHAT_ID is not set in .env');
  process.exit(1);
}

let bot;

if (IS_RENDER) {
  // Webhook mode for Render — Express server must listen on PORT
  bot = new TelegramBot(TOKEN, { polling: false });
  const app = express();
  app.use(express.json());

  app.post(`/telegram-webhook`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), mode: 'webhook', url: RENDER_URL });
  });

  app.listen(PORT, () => {
    console.log(`[career-ops] Webhook server listening on port ${PORT}`);
    bot.setWebHook(`${RENDER_URL}/telegram-webhook`)
      .then(() => console.log(`[career-ops] Webhook registered: ${RENDER_URL}/telegram-webhook`))
      .catch(err => console.error('[career-ops] Failed to register webhook:', err.message));
  });
} else {
  // Polling mode for local development
  bot = new TelegramBot(TOKEN, { polling: true });
  console.log('[career-ops] Telegram bot started in POLLING mode (development)');
}

/**
 * Send an approval request before submitting a job application.
 *
 * @param {Object} job
 * @param {string} job.company   - Company name
 * @param {string} job.title     - Role title
 * @param {string} job.score     - Score like "4.2"
 * @param {string} job.grade     - Grade like "A"
 * @param {string} job.archetype - Detected archetype
 * @param {string} [job.reportPath] - Path to the report .md file (optional)
 *
 * @returns {Promise<'approve'|'reject'|'remind'>}
 */
export async function sendApprovalRequest(job) {
  const { company, title, score, grade, archetype, reportPath } = job;

  const text = [
    `*career-ops — Ready to Submit*`,
    ``,
    `*Company:* ${company}`,
    `*Role:* ${title}`,
    `*Score:* ${score}/5 (${grade})`,
    `*Archetype:* ${archetype}`,
    ``,
    `Tap to decide:`,
  ].join('\n');

  const keyboard = {
    inline_keyboard: [
      [
        { text: '✅ Approve and Submit', callback_data: 'approve' },
        { text: '❌ Reject and Skip', callback_data: 'reject' },
      ],
      [
        { text: '📄 View Fit Summary', callback_data: 'summary' },
        { text: '⏰ Remind Me Later', callback_data: 'remind' },
      ],
    ],
  };

  const sentMsg = await bot.sendMessage(CHAT_ID, text, {
    parse_mode: 'Markdown',
    reply_markup: keyboard,
  });

  return new Promise((resolve) => {
    let summaryShown = false;

    const callbackHandler = async (query) => {
      if (query.message.message_id !== sentMsg.message_id) return;

      await bot.answerCallbackQuery(query.id);
      const action = query.data;

      if (action === 'summary') {
        // Send first 20 lines of the report then re-show buttons
        if (reportPath && existsSync(reportPath)) {
          const lines = readFileSync(reportPath, 'utf8').split('\n').slice(0, 20).join('\n');
          await bot.sendMessage(CHAT_ID, `\`\`\`\n${lines}\n\`\`\``, { parse_mode: 'Markdown' });
        } else {
          await bot.sendMessage(CHAT_ID, '_Report not found._', { parse_mode: 'Markdown' });
        }

        if (!summaryShown) {
          summaryShown = true;
          // Re-show the decision buttons
          await bot.sendMessage(CHAT_ID, `*Decide for ${company} — ${title}:*`, {
            parse_mode: 'Markdown',
            reply_markup: keyboard,
          });
        }
        return; // Don't resolve yet — wait for approve/reject/remind
      }

      bot.removeListener('callback_query', callbackHandler);

      if (action === 'approve') {
        await bot.sendMessage(CHAT_ID, `✅ *Approved.* Submitting application to ${company}...`, { parse_mode: 'Markdown' });
        resolve('approve');
      } else if (action === 'reject') {
        await bot.sendMessage(CHAT_ID, `❌ *Rejected.* Skipping ${company} — ${title}.`, { parse_mode: 'Markdown' });
        resolve('reject');
      } else if (action === 'remind') {
        await bot.sendMessage(CHAT_ID, `⏰ *Remind Later.* Logged as pending-review.`, { parse_mode: 'Markdown' });
        resolve('remind');
      }
    };

    bot.on('callback_query', callbackHandler);

    // Poll every 5 seconds for up to 10 minutes before auto-rejecting
    const timeout = setTimeout(() => {
      bot.removeListener('callback_query', callbackHandler);
      bot.sendMessage(CHAT_ID, `⏰ *No response in 10 minutes.* Skipping ${company} — ${title}.`, { parse_mode: 'Markdown' });
      resolve('reject');
    }, 10 * 60 * 1000);

    // Clear timeout when resolved
    const originalResolve = resolve;
    resolve = (val) => {
      clearTimeout(timeout);
      originalResolve(val);
    };
  });
}

// If run directly (node telegram-approval.js), the bot stays alive for webhook/polling
// If imported as a module, only sendApprovalRequest() is used
