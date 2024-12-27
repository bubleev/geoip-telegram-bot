import { getCountryCode } from '#root/bot/features/get-geo/get-country-code.js'
import { getFlagEmoji } from '#root/bot/helpers/country-flag.js'
import type { Context } from '#root/bot/context.ts'

export async function getReply(ctx: Context, ips: string[]): Promise<string[]> {
  return await Promise.all(
    ips.map(async (ip): Promise<string> => {
      const currentLocaleCode = (await ctx.i18n.getLocale()) as 'en' | 'ru'
      const response = await getCountryCode(ip)

      const city = response?.city
      const country = response?.country

      const flag = getFlagEmoji(country?.iso_code || '')

      let reply = `<s>${ip}</s>`
      if (country) {
        reply = `${flag} ${country.iso_code} ${
          city?.names[currentLocaleCode] ?? ''
        } <code>${ip}</code>`
      }

      return reply
    }),
  )
}
