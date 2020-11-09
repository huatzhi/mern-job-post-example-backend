const authHelper = require("../modules/authHelper")

describe("auth helper", () => {
  let hashedPassword
  describe('Hash Password Function', () => {
    it('should hash password', async () => {
      hashedPassword = await authHelper.hash("abcdef")
      expect(typeof hashedPassword).toEqual("string")
      expect(hashedPassword).not.toEqual("abcdef")
    })
  })

  describe('Verify Password Function', () => {
    it('should verify password as true when password is correct', async () => {
      let output = await authHelper.verify("abcdef", hashedPassword)
      expect(output).toEqual(true)
    })
    it('should verify password as false when password is wrong', async () => {
      let output = await authHelper.verify("abcdef2", hashedPassword)
      expect(output).toEqual(false)
    })
  })
})



