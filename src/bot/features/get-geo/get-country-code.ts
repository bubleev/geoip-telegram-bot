import { getReader } from './dbLoader.js'

export async function getCountryCode(ip: string) {
  try {
    const reader = getReader()

    if (!reader) {
      throw new Error('Database reader is not initialized. Ensure loadDatabase() was called on startup.')
    }

    const record = reader.get(ip)

    if (!record || !record.country) {
      return null
    }

    return record
  }
  catch (error) {
    console.error('Error accessing the database:', (error as Error).message)
    return null
  }
}
