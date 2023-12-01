import { parseLines, readInput } from 'io'

const input = await readInput('day-01')

export const part1 = () => {
  const lines = parseLines(input)
  let part1result = 0
  lines.forEach((line) => {
    const digits = line.replaceAll(/[A-Za-z]/g, '')

    let number
    if (digits.length === 0) { return } else if (digits.length === 1) { number = Number.parseInt(`${digits[0]}${digits[0]}`) } else { number = Number.parseInt(`${digits[0]}${digits.at(-1)}`) }

    part1result += number
  })

  return part1result
}

export const part2 = () => {
  const numberMaps: [RegExp, string][] = [
    [/^one$/g, '1'],
    [/^two$/g, '2'],
    [/^three$/g, '3'],
    [/^four$/g, '4'],
    [/^five$/g, '5'],
    [/^six$/g, '6'],
    [/^seven$/g, '7'],
    [/^eight$/g, '8'],
    [/^nine$/g, '9'],
  ]

  let part2result = 0
  input.split('\n').forEach((line) => {
    const matches = [
      ...line.matchAll(/one|two|three|four|five|six|seven|eight|nine|[0-9]/gi),
    ]

    const lastMatch = line
      .split('')
      .reverse()
      .join('')
      .match(
        /eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|[0-9]/gi
      ) as RegExpMatchArray

    if (matches.length === 0) { return }

    let first = [...matches][0].toString()

    let last: string
    if (matches.length === 1) { last = first } else { last = lastMatch[0].split('').reverse().join('') }

    numberMaps.forEach(([reg, num]) => {
      first = first.replace(reg, num)
      last = last.replace(reg, num)
    })

    if (first.length !== 1) { console.log(first) }
    if (last.length !== 1) { console.log(last) }
    if (Number.parseInt(`${first}${last}`).toString() !== `${first}${last}`) { console.log(line) }

    part2result += Number.parseInt(`${first}${last}`)
  })
  return part2result
}
