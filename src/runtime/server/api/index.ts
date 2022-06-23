import { readFileSync } from 'node:fs'
import { getStorage } from 'firebase-admin/storage'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { sendStream, appendHeader, defineEventHandler, useQuery } from 'h3'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig().restream

const apps = getApps()

if (!apps.length) {
  initializeApp({
    // @ts-ignore
    credential: cert(JSON.parse(readFileSync(config.credential))),
    storageBucket: config.storage
  })
}

export default defineEventHandler(async (event) => {
  const storage = getStorage()
  const bucket = storage.bucket()

  const file = await bucket
    .file(<string>useQuery(event).f)

  const metadata = await file.getMetadata()
  const total = metadata[0].size

  if (event.req.headers.range) {
    const range = event.req.headers.range
    const parts = range.replace(/bytes=/, '').split('-')
    const partialstart = parts[0]
    const partialend = parts[1]
    const start = parseInt(partialstart, 10)
    const end = partialend ? parseInt(partialend, 10) : total - 1
    const chunksize = (end - start) + 1
    event.res.statusCode = 206
    appendHeader(event, 'Content-Length', chunksize.toString())
    appendHeader(event, 'Accept-Ranges', 'bytes')
    appendHeader(event, 'Content-Range', 'bytes ' + start + '-' + end + '/' + total)
    return sendStream(event, file.createReadStream({ start, end }))
  }
})
