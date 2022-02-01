import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex') // 8 bytes = 64 hex chars, this is a random salt that is used to hash the password
    const buffer = await scryptAsync(password, salt, 64) as Buffer // 64 is the length of the hash, buffer is the hash of the password and salt combination

    return `${buffer.toString('hex')}.${salt}`
  }

  static compare(storedPassword: string, suppliedPassword: string) {

  }
}

export default Password