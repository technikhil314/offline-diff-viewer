import { DBInsertRecord } from '../types.js'
import { DB_SCHEMA } from './dbConstants.js'
import { getPool } from './index.js'

export async function insertRecord({ data, id }: DBInsertRecord) {
  const client = await getPool().connect()
  try {
    await client.query(
      `INSERT INTO "${DB_SCHEMA}".e2e_data(data, id) VALUES ($1, $2);`,
      [data, id]
    )
    return true
  } catch (error) {
    console.error(error)
    return false
  } finally {
    await client.release()
  }
}
