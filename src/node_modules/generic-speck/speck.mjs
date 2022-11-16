export default function speck (params = {}) {
  const BITS = params.bits || 16
  const ROUNDS = params.rounds || 22
  const RIGHT_ROTATIONS = params.rightRotations || 7
  const LEFT_ROTATIONS = params.leftRotations || 2

  const BIT_MAX = 2 ** BITS
  const BIT_MASK = BIT_MAX - 1

  const ROR = (x, r) => (x >> r) | ((x << (BITS - r)) & BIT_MASK)
  const ROL = (x, r) => ((x << r) & BIT_MASK) | (x >> (BITS - r))

  const R = (x, y, k) => {
    x = ROR(x, RIGHT_ROTATIONS)
    x = (x + y) & BIT_MASK
    x ^= k
    y = ROL(y, LEFT_ROTATIONS)
    y ^= x
    return [x, y]
  }
  const RR = (x, y, k) => {
    y ^= x
    y = ROR(y, LEFT_ROTATIONS)
    x ^= k
    x = (x - y) & BIT_MASK
    x = ROL(x, RIGHT_ROTATIONS)
    return [x, y]
  }

  function encryptRaw (pt, K) {
    let y = pt[0]
    let x = pt[1]
    let b = K[0]
    let a = K.slice(1)

    ;[x, y] = R(x, y, b)
    for (let i = 0; i < ROUNDS - 1; i++) {
      const j = i % a.length
      ;[a[j], b] = R(a[j], b, i)
      ;[x, y] = R(x, y, b)
    }

    return [y, x]
  }

  function decryptRaw (pt, K) {
    let y = pt[0]
    let x = pt[1]
    let b = K[0]
    let a = K.slice(1)

    for (let i = 0; i < ROUNDS - 1; i++) {
      const j = i % a.length
      ;[a[j], b] = R(a[j], b, i)
    }
    for (let i = 0; i < ROUNDS; i++) {
      const j = (ROUNDS - 2 - i) % a.length
      ;[x, y] = RR(x, y, b)
      ;[a[j], b] = RR(a[j], b, ROUNDS - 2 - i)
    }

    return [y, x]
  }

  // Wrap function in order to convert any bit size to the internal format
  function wrapFn (fn) {
    return (input, key) => {
      const result = fn([input / BIT_MAX | 0, input & BIT_MASK], key)
      return result[0] * BIT_MAX + result[1]
    }
  }

  return {
    encrypt: wrapFn(encryptRaw),
    decrypt: wrapFn(decryptRaw),
    encryptRaw,
    decryptRaw
  }
}
