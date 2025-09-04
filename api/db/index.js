import { Client } from 'pg'

const DB_SCHEMA = process.env.DB_SCHEMA

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

export async function getTop10Records() {
  try {
    await client.connect()
    const res = await client.query(
      `SELECT data, id, "creationTimestamp" FROM "${DB_SCHEMA}".e2e_data limit 10;`
    )
    return res.rows
  } catch (error) {
    console.error(error)
    return null
  } finally {
    await client.end()
  }
}

export async function getRecordById(id) {
  try {
    await client.connect()
    const res = await client.query(
      `SELECT data, "creationTimestamp" FROM "${DB_SCHEMA}".e2e_data WHERE id = ${id};`
    )
    return res.rows
  } catch (error) {
    console.error(error)
    return null
  } finally {
    await client.end()
  }
}

export async function insertRecord({ data, id }) {
  try {
    await client.connect()
    await client.query(
      `INSERT INTO "${DB_SCHEMA}".e2e_data(data, id) VALUES ('${data}', '${id}');`
    )
    return true
  } catch (error) {
    console.error(error)
    return false
  } finally {
    await client.end()
  }
}
