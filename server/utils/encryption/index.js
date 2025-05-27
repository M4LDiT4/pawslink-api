`use strict`;

const bcrypt = require('bcrypt');
class BcryptService {
   constructor() {
      if (BcryptService.instance) {
         return BcryptService.instance;
      }
      this.saltRounds = parseInt(process.env.SALT_ROUNDS);
      BcryptService.instance = this;
   }

   async hash(password) {
      console.log(this.saltRounds);
      return bcrypt.hash(password, this.saltRounds);
   }

   async compare(plainPassword, hashedPassword) {
      return bcrypt.compare(plainPassword, hashedPassword);
   }
}

module.exports = new BcryptService();
