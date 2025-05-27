// googleAuthService.js
const { google } = require('googleapis');
const path = require('path');

class GoogleAuthService {
   constructor() {
      this.auth = null;
      this.initialized = false;
   }

   async init() {
      if (this.initialized) return;

      const keyFile =
         process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH ||
         path.join(__dirname, 'service-account.json');

      this.auth = new google.auth.JWT({
         keyFile,
         scopes: ['https://www.googleapis.com/auth/drive'],
      });

      await this.auth.authorize();
      this.initialized = true;
   }

   getAuth() {
      if (!this.initialized) {
         throw new Error(
            'GoogleAuthService not initialized. Call init() first.'
         );
      }
      return this.auth;
   }
}

// Export a single shared instance (singleton)
module.exports = new GoogleAuthService();
