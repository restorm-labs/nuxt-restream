import {
  defineNuxtModule,
  resolveModule,
  createResolver,
  resolvePath
} from '@nuxt/kit'
import { name, version } from '../package.json'

export interface ModuleOptions {
  /**
   * Base route that will be used for restream api
   * @default 'restream'
   * @type string
   */
  apiRouteName: string,
  /**
   * Firebase admin options
   * @default {}
   * @type Record<string, string>
   */
  credential?: string,
  /**
   * Firebase storage bucket url
   * @default undefined
   * @example example.appspot.com
   * @type string
   */
  storage?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'restream',
    compatibility: { nuxt: '^3.0.0' }
  },
  defaults: {
    apiRouteName: 'restream'
  },
  async setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const resolveRuntimeModule = (path: string) => resolveModule(path, { paths: resolve('./runtime') })

    // Api routes
    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.handlers = nitroConfig.handlers || []
      nitroConfig.handlers.push(
        {
          method: 'get',
          route: `/api/${options.apiRouteName}`,
          handler: resolveRuntimeModule('./server/api/index')
        }
      )
    })

    // Server config
    nuxt.options.runtimeConfig.restream = {
      base: options.apiRouteName,
      credential: await resolvePath(options.credential),
      storage: options.storage
    }
  }
})
