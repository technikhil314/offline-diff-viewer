import { Request, Response } from 'express'
import { getRecordById } from './db/getRecordById.js'
import { getPool } from './db/index.js'
import { DBRecord } from './types.js'

export const config = { runtime: 'nodejs' }

export default async function handler(req: Request<{}, {}, {}, Pick<DBRecord, 'id'>>, res: Response) {
  try {
    const records = await getRecordById(req.query.id)
    res.json(records)
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
