import fs from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as mmdb from 'mmdb-lib'
import type { CityResponse } from 'mmdb-lib'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const directory = join(__dirname, '../../../db')

let reader: mmdb.Reader<CityResponse> | null = null

export async function loadDatabase(): Promise<void> {
  try {
    const files = await fs.readdir(directory)

    const folderName = files.find(file => /^GeoLite2-City_\d{8}$/.test(file))

    if (!folderName) {
      throw new Error(`No valid GeoLite2 folder found in: ${directory}`)
    }

    const dbPath = join(directory, folderName, 'GeoLite2-City.mmdb')

    try {
      await fs.access(dbPath) // Проверяем, что файл существует
    }
    catch {
      throw new Error(`GeoLite2-City.mmdb not found in folder: ${folderName}`)
    }

    const dbBuffer = await fs.readFile(dbPath)
    reader = new mmdb.Reader<CityResponse>(dbBuffer)
  }
  catch (error) {
    console.error('Error loading the database:', error)
    throw error // Перезапуск бота при ошибке загрузки базы
  }
}

export function getReader(): mmdb.Reader<CityResponse> | null {
  return reader
}
