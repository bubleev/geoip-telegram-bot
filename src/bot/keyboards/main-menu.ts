import { InlineKeyboard } from 'grammy'
import type { Context } from '#root/bot/context.js'

export async function createMainKeyboard(ctx: Context) {
  const MENU_BUTTONS = [
    { text: `🔍 ${ctx.t('ip-lookup')}`, callback_data: 'ip-lookup' },
    { text: `⚙️ ${ctx.t('settings')}`, callback_data: 'settings' },
  ]

  const buttonRows = MENU_BUTTONS
    .map(btn => InlineKeyboard.text(btn.text, btn.callback_data))

  return InlineKeyboard.from([buttonRows])
}
