import { Composer } from 'grammy'
import { CountryResponse } from 'mmdb-lib'
import { getCountryCode } from './get-country-code.js'
import type { Context } from '#root/bot/context.ts'
import { logHandle } from '#root/bot/helpers/logging.js'
import { getFlagEmoji } from '#root/bot/helpers/country-flag.js'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature.command('get', logHandle('command-get'), async (ctx) => {
  const msg = ctx.match?.trim() // Получаем аргумент команды (после /get)

  if (!msg) {
    return ctx.reply('Пожалуйста, укажите IP-адрес после команды.')
  }

  const response = getCountryCode(msg)
  const city = response?.city
  const country = response?.country

  const flag = getFlagEmoji(country?.iso_code as string)

  let reply = 'Not Found'
  if (city)
    reply = `${flag}  \`${msg} | ${country?.names.ru} | ${city.names.ru}\``

  return ctx.reply(reply, { parse_mode: 'MarkdownV2' })
})

export { composer as getGeoFuture }
