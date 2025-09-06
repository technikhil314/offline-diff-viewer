export interface DBRecord {
  data: string
  id: string
  creationTimestamp: string
}

export type DBInsertRecord = Omit<DBRecord, 'creationTimestamp'>
