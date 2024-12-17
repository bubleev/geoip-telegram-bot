import { Composer } from 'grammy'
import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { createMainKeyboard } from '#root/bot/keyboards/main-menu.js'
import { createSettingsKeyboard } from '#root/bot/keyboards/settings.js'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature.command('start', logHandle('command-start'), async (ctx) => {
  return ctx.reply(ctx.t('start'), {
    reply_markup: await createMainKeyboard(ctx),
  })
})

feature.callbackQuery('start', async (ctx) => {
  return ctx.editMessageText(ctx.t('start'), {
    reply_markup: await createMainKeyboard(ctx),
  })
})

feature.callbackQuery('settings', async (ctx) => {
  return ctx.editMessageText(ctx.t('settings'), {
    reply_markup: await createSettingsKeyboard(ctx),
  })
})

feature.callbackQuery('ip-lookup', async (ctx) => {
  return ctx.editMessageText(ctx.t('ip-lookup'), {
    reply_markup: await createMainKeyboard(ctx),
  })
})

export { composer as startFuture }
