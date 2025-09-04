import { getTop10Records } from './db/index.js'

export const config = { runtime: 'nodejs' }

export default async function handler(_req, res) {
  try {
    const records = await getTop10Records()
    res.json(records)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
