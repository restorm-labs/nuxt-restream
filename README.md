
# @restorm/nuxt-restream

> Restream is a module that allows you to create a stream of an audio/video file from the Firebase storage, protected from direct download through the client. Convenient to use if needed provide media files with restricted access such as purchase, subscription and avoid downloading the file directly from the Firebase storage on the client-side

## Features

- 🤓 Very easy to use
- 🛡 Direct download protection
- 🔥 Setup for Firebase Admin
- 🟢 Nuxt 3

## Quick setup

1. Install `@restorm/nuxt-restream`

   ```bash
   yarn add --dev nuxt-restream # or npm install --save-dev nuxt-restream
   ```

2. Add it to the `modules` section of `nuxt.config.ts`
   ```js
   import { defineNuxtConfig } from 'nuxt'

   export default defineNuxtConfig({
     modules: ['nuxt-restream']
   })
   ```

3. Basic configuration `restream` setup for accessing Firebase [Get JSON file with credential Admin Firebase](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk)
   ```js
   import { defineNuxtConfig } from 'nuxt'

   export default defineNuxtConfig({     
     restream: {
       credential: './firebase-admin-sdk.json',
       storage: 'firebase-storage-name.appspot.com'
     }
   })
   ```

4. Add `src` attribute with a link to server routes `/api/restream` with the `?f=` parameter containing the path to the file in Firebase storage.

   ```vue
   <template>
     <div>
       <audio src="/api/restream?f=path_to/audio.mp3" typeof="audio/mp3" controls />
     </div>
   </template>
   ```

   ## Configuration

Restream supports a number of options, which you can pass in your `nuxt.config.ts` file:

```js
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  // ...
  restream: {
    /**
     * Path (relative to your base URL) where the JSON file with Firebase admin credentials.
     * @example './assets/fearbook-c8d55-firebase-adminsdk-vbvi5-57b761f13c.json'
     * @default undefund
     */
    credential: string,

    /**
     * Firebase storage bucket url
     * @example 'fearbook-c8d55.appspot.com'
     * @default undefund
     */
    storage: string,

    /**
     * Base route that will be used for restream api
     * @example 'restream' -> 'api/restream?f=...'
     * @default 'restream' 
     */
    apiRouteName: string
  },
})
```

## Licence

[MIT Licence](./LICENCE)
