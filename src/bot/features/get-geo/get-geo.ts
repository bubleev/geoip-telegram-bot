import { Composer } from 'grammy'
import type { Context } from '#root/bot/context.ts'
import { parseIps } from '#root/bot/helpers/parse-ips.js'
import { createSendMoreKeyboard } from '#root/bot/keyboards/get-geo.js'
import { getReply } from '#root/bot/helpers/geo/get-replies.js'
import { createGeoFiltersKeyboard } from '#root/bot/keyboards/geo_filters.js'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature.callbackQuery('ip-lookup', async (ctx) => {
  const promptMessage = await ctx.reply(ctx.t('await_ips'))
  await ctx.answerCallbackQuery()

  ctx.session.promptMessageId = promptMessage.message_id

  ctx.session.waitingForIps = true
})

feature.callbackQuery('geo-filters', async (ctx) => {
  return ctx.editMessageReplyMarkup({
    reply_markup: await createGeoFiltersKeyboard(ctx),
  })
})

feature.on('message:text', async (ctx) => {
  if (ctx.session?.waitingForIps) {
    await ctx.api.deleteMessage(ctx.chat.id, ctx.session.promptMessageId as number)
    const loadingReply = await ctx.reply(`⏳ ${ctx.t('checking_ips')}`)
    ctx.session.waitingForMessage = true

    const input = ctx.message.text
    let ips = parseIps(input)

    if (ips.length > 50) {
      ips = ips.slice(0, 50)
    }
    ctx.session.waitingForIps = false

    const replies = await getReply(ctx, ips)

    const responseMessage = replies.join('\n') || ctx.t('geo_error_msg')
    await ctx.api.editMessageText(ctx.chat.id, loadingReply.message_id, `${ctx.t('geo_result_msg')}:\n\n${responseMessage}`, {
      parse_mode: 'HTML',
      reply_markup: await createSendMoreKeyboard(ctx),
    })
  }
})

export { composer as getGeoFuture }
