import { Request, Response } from 'express'
import { getPool } from './db/index.js'
import { insertRecord } from './db/insertRecord.js'
import { DBInsertRecord } from './types.js'
export const config = { runtime: 'nodejs' }

export default async function handler(req: Request<{}, {}, DBInsertRecord>, res: Response) {
  const body = req.body
  try {
    const result = await insertRecord({
      data: body.data,
      id: body.id,
    })
    if (result) {
      res.status(200).json({
        success: true,
      })
    } else {
      throw new Error('Failed to insert record')
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error)
      res.status(500).json({ message: error.message || 'Internal server error' })
    }
  }
}

process.on('SIGTERM', () => {
  getPool().end()
})
