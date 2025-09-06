import { DB_SCHEMA } from './dbConstants.js'
import { getPool } from './index.js'

export async function getRecordById(id: string) {
  const client = await getPool().connect()
  try {
    const res = await client.query(
      `SELECT data, "creationTimestamp" FROM "${DB_SCHEMA}".e2e_data WHERE id = $1;`,
      [id]
    )
    return res.rows
  } catch (error) {
    console.error(error)
    return null
  } finally {
    await client.release()
  }
}
