const crypto = require("crypto")

/* given a password and a salt,
 returns the hashed password */
const hashPasswordWithSalt = (password, salt) => {
  const hashedPass = crypto.pbkdf2Sync(password, salt,
    1000, 64, `sha512`).toString(`hex`)

  return hashedPass
}

/* generated a random salt,
 and hashes the password with it */
const hashPasswordWithRandomSalt = (password) => {
  const salt = crypto.randomBytes(16).toString('hex')

  return {
    hashedPass: hashPasswordWithSalt(password, salt),
    salt: salt
  }
}

module.exports = {
  hashPasswordWithSalt,
  hashPasswordWithRandomSalt
}