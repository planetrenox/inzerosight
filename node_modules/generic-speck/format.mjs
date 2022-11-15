export function encode (value, alphabet, maxValue) {
  const len = alphabet.length
  let result = ''
  while (value > 0) {
    const rest = value % len
    result = alphabet.charAt(rest) + result
    value = Math.floor(value / len)
  }
  if (maxValue) {
    const length = Math.ceil(Math.log(maxValue) / Math.log(len))
    result = alphabet.charAt(0).repeat(length - result.length) + result
  }
  return result
}

export function decode (value, alphabet, throwIfUnrecognized) {
  const len = alphabet.length
  let exponent = 0
  return value.split('').reverse().reduce((sum, e, i) => {
    const index = alphabet.indexOf(e)
    if (index === -1) {
      if (throwIfUnrecognized) throw Error('unrecognized character')
      return sum
    }
    return sum + index * len ** (exponent++)
  }, 0)
}
