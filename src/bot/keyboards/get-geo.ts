import { InlineKeyboard } from 'grammy'
import type { Context } from '#root/bot/context.js'
import { createBackButton } from '#root/bot/keyboards/back-button.js'

export async function createSendMoreKeyboard(ctx: Context) {
  return InlineKeyboard.from([
    [{ text: `📜 ${ctx.t('geo_filters')}`, callback_data: 'geo-filters' }],
    [{ text: `➕ ${ctx.t('send_more')}`, callback_data: 'ip-lookup' }],
    [createBackButton(ctx, 'back-to-start')],
  ])
}
