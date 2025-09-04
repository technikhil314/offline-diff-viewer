// import { getTop10Records } from './db/index.js'

export const config = { runtime: 'nodejs' }

export default function handler(_req, res) {
  // const records = await getTop10Records()
  res.json({ message: 'Hello World' })
}
