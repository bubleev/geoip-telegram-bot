/* eslint-disable no-cond-assign */
import { InlineKeyboard } from 'grammy'
import type { Context } from '#root/bot/context.js'
import { createBackButton } from '#root/bot/keyboards/back-button.js'

export async function createSendMoreKeyboard(ctx: Context) {
  return InlineKeyboard.from([
    [{ text: `⬅️ ${ctx.t('send_more')}`, callback_data: 'ip-lookup' }],
    [createBackButton(ctx, 'back-to-start')],
  ])
}

export async function extractIpsFromText(text: string): Promise<string[]> {
  const regex = /(\d+\.\d+\.\d+\.\d+)\s*-\s*\d+\s*прокси/g
  const ips: string[] = []
  let match

  // Находим все IP-адреса и количество прокси
  while ((match = regex.exec(text)) !== null) {
    ips.push(match[1])
  }

  return ips
}
