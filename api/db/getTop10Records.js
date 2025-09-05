import { DB_SCHEMA } from './dbConstants.js'
import { getPool } from './index.js'

export async function getTop10Records() {
  const client = await getPool().connect()
  try {
    const res = await client.query(
      `SELECT data, id, "creationTimestamp" FROM "${DB_SCHEMA}".e2e_data limit 10;`
    )
    return res.rows
  } catch (error) {
    console.error(error)
    return null
  } finally {
    await client.release()
  }
}
