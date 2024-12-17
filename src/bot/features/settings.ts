import { Composer } from 'grammy'
import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { createSettingsKeyboard } from '#root/bot/keyboards/settings.js'
import { createChangeLanguageKeyboard } from '#root/bot/keyboards/change-language.js'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature.command('settings', logHandle('command-settings'), async (ctx) => {
  return ctx.reply(ctx.t('settings'), {
    reply_markup: await createSettingsKeyboard(ctx),
  })
})

feature.callbackQuery('language', async (ctx) => {
  return ctx.editMessageText(ctx.t('language-select'), {
    reply_markup: await createChangeLanguageKeyboard(ctx),
  })
})

export { composer as settingsFuture }
