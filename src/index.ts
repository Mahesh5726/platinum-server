import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const allRoutes = new Hono()

allRoutes.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve(allRoutes, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
