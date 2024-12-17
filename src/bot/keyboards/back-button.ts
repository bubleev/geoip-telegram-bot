import { InlineKeyboard } from 'grammy'
import type { Context } from '#root/bot/context.js'

export function createBackButton(ctx: Context, callbackData: string) {
  return InlineKeyboard.text(`⬅️ ${ctx.t('back')}`, callbackData)
}
