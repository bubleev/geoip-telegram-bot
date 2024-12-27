import { InlineKeyboard } from 'grammy'
import type { Context } from '#root/bot/context.js'
import { createBackButton } from '#root/bot/keyboards/back-button.js'

export async function createGeoFiltersKeyboard(ctx: Context) {
  const MENU_BUTTONS = [
    { text: `${ctx.t('geo_filters_country')}`, callback_data: 'geo-filters_country' },
    { text: `${ctx.t('geo_filters_city')}`, callback_data: 'geo-filters_city' },
  ]

  const buttonRows = MENU_BUTTONS.map(btn => InlineKeyboard.text(btn.text, btn.callback_data))
  const backButton = [createBackButton(ctx, 'back-to-start')]

  return InlineKeyboard.from([buttonRows, backButton])
}
