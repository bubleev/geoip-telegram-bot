import { Composer } from 'grammy'
import { getCountryCode } from './get-country-code.js'
import type { Context } from '#root/bot/context.ts'
import { logHandle } from '#root/bot/helpers/logging.js'
import { getFlagEmoji } from '#root/bot/helpers/country-flag.js'
import { parseIps } from '#root/bot/helpers/parse-ips.js'
import { createSendMoreKeyboard } from '#root/bot/keyboards/get-geo.js'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature.command('get', logHandle('command-get'), async (ctx) => {
  // const msg = ctx.match?.trim()

  // if (!msg) {
  //   return ctx.reply('Пожалуйста, укажите IP-адрес после команды.')
  // }

  // const response = getCountryCode(msg)
  // const city = response?.city
  // const country = response?.country

  // const flag = getFlagEmoji(country?.iso_code as string)

  // let reply = 'Not Found'
  // if (city)
  //   reply = `${flag} ${country?.iso_code} ${city.names.ru} ${msg}`

  return ctx.reply('get', { parse_mode: 'MarkdownV2' })
})

feature.callbackQuery('ip-lookup', async (ctx) => {
  const promptMessage = await ctx.reply(ctx.t('await_ips'))
  await ctx.answerCallbackQuery()

  // Сохраняем ID сообщения для последующего удаления
  ctx.session.promptMessageId = promptMessage.message_id

  ctx.session.waitingForIps = true
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

    const replies = await Promise.all(ips.map(async (ip) => {
      const currentLocaleCode = await ctx.i18n.getLocale() as 'en' | 'ru'
      const response = await getCountryCode(ip)
      const city = response?.city
      const country = response?.country

      const flag = getFlagEmoji(country?.iso_code as string)

      let reply = `<s>${ip}</s>`
      if (country)
        reply = `${flag} ${country?.iso_code} ${city?.names[currentLocaleCode] ?? ''} <code>${ip}</code>`

      return reply
    }))

    const responseMessage = replies.join('\n') || ctx.t('geo_error_msg')
    await ctx.api.editMessageText(ctx.chat.id, loadingReply.message_id, `${ctx.t('geo_result_msg')}:\n\n${responseMessage}`, {
      parse_mode: 'HTML',
      reply_markup: await createSendMoreKeyboard(ctx),
    })
  }
})

export { composer as getGeoFuture }
