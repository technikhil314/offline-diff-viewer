import { insertRecord } from './db/index.js'

export const config = { runtime: 'nodejs' }

export default async function handler(req, res) {
  try {
    const result = await insertRecord({
      data: req.body.data,
      id: req.body.id,
    })
    if (result) {
      res.status(200).json({
        success: true,
      })
    } else {
      throw new Error('Failed to insert record')
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message || 'Internal server error' })
  }
}
