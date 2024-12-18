export function parseIps(input: string): string[] {
  const formattedInput = input.replace(/\s+/g, ',').replace(/,+/g, ',') // удаляем лишние запятые
  return formattedInput.split(',').map(ip => ip.trim()).filter(ip => ip !== '') // убираем пустые строки
}
