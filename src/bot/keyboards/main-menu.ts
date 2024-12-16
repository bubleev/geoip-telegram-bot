// main-menu.ts
import { Keyboard } from 'grammy'
import type { Context } from '#root/bot/context.js'

export const BUTTON_TEXTS = {
  IP_LOOKUP: (ctx: Context) => `🔍 ${ctx.t('ip-lookup')}`,
  SETTINGS: (ctx: Context) => `⚙️ ${ctx.t('settings')}`,
}

export async function createMainMenuKeyboard(ctx: Context) {
  const buttons = [
    { text: BUTTON_TEXTS.IP_LOOKUP(ctx) },
    { text: BUTTON_TEXTS.SETTINGS(ctx) },
  ]

  const buttonRows = buttons.map(button =>
    [Keyboard.text(button.text)],
  )

  return Keyboard.from(buttonRows).resized()
}
