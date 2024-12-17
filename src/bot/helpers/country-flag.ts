export function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2)
    return ''

  return countryCode
    .toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(0x1F1E6 + char.charCodeAt(0) - 65))
    .join('')
}
