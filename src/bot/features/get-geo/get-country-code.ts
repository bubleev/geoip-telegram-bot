import fs from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as mmdb from 'mmdb-lib'
import type { AnonymousIPResponse, CityResponse, Response } from 'mmdb-lib'

/**
 * Get country code by IP from the GeoLite2 database
 * @param {string} ip - IP address to look up
 * @returns {string|null} - ISO country code or null if not found
 */
export function getCountryCode(ip: string) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const directory = join(__dirname, '../../../db')

  try {
    // Читаем содержимое директории
    const files = fs.readdirSync(directory)

    // Находим папку, которая соответствует шаблону "GeoLite2-Country_YYYYMMDD"
    const folderName = files.find(file => /^GeoLite2-City_\d{8}$/.test(file))

    if (!folderName) {
      console.error('No valid folder found in:', directory)
      return null
    }

    // Строим путь к файлу базы данных внутри папки
    const dbPath = join(directory, folderName, 'GeoLite2-City.mmdb')

    // Проверяем, существует ли файл
    if (!fs.existsSync(dbPath)) {
      console.error('GeoLite2-Country.mmdb not found in folder:', folderName)
      return null
    }

    // Читаем содержимое базы данных в память
    const db = fs.readFileSync(dbPath)

    // Открываем базу данных с использованием Reader и передаем buffer
    const reader = new mmdb.Reader<CityResponse>(db)
    const record = reader.get(ip)
    // const countryCode = getCountryCodeFromRecord(record)

    // Возвращаем ISO код страны, если найдено
    return record
  }
  catch (error: unknown) {
    console.error('Error accessing the database:', (error as Error).message)
    return null
  }
}

// function getCountryCodeFromRecord(record: Response | AnonymousIPResponse | null): string | null {
//   if (record === null) {
//     return null
//   }
//   if ('country' in record && record.country) {
//     return record.country.iso_code
//   }
//   else {
//     return null
//   }
// }
