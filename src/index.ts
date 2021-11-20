import { handleRequest, handleSchedule } from './handler'

addEventListener('fetch', (event) => {
  return event.respondWith(handleRequest())
})

addEventListener("scheduled", (event) => {
  event.waitUntil(handleSchedule())
})