// main-menu.ts
import { InlineKeyboard } from 'grammy'
import type { Context } from '#root/bot/context.js'
import { createBackButton } from '#root/bot/keyboards/back-button.js'

export async function createSettingsKeyboard(ctx: Context) {
  const MENU_BUTTONS = [
    { text: `🌐 ${ctx.t('settings_language')}`, callback_data: 'language' },
  ]

  const buttonRows = MENU_BUTTONS
    .map(btn => InlineKeyboard.text(btn.text, btn.callback_data))

  return InlineKeyboard.from([buttonRows, [createBackButton(ctx, 'start')]])
}
