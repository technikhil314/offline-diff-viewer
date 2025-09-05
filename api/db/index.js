import { Pool } from 'pg'

let pool = null

export function getPool() {
  if (!pool || !pool.connected) {
    pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      max: 5, // Maximum number of connections in the pool
      idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
      connectionTimeoutMillis: 2000, // How long to wait for a connection from the pool
    })
  }
  return pool
}
