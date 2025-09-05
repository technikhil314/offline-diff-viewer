import { getRecordById } from './db/index.js'

export const config = { runtime: 'nodejs' }

export default async function handler(req, res) {
  try {
    const records = await getRecordById(req.query.id)
    res.json(records)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message || 'Internal server error' })
  }
}
