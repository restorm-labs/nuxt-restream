import { defineNuxtConfig } from 'nuxt'
import restreamModule from '..'

export default defineNuxtConfig({
  modules: [
    restreamModule
  ],
  restream: {
    credential: './fire.json',
    storage: 'fearbook-c8d55.appspot.com'
  }
})
