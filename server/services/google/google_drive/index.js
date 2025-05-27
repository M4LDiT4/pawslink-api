const { google } = require('googleapis');
const { PassThrough } = require('stream');
const googleAuthService = require('../auth');

class GoogleDriveService {
   constructor() {
      this.drive = null;
      this.initialized = false;
   }

   async init() {
      if (this.initialized) return;

      await googleAuthService.init();
      const auth = googleAuthService.getAuth();
      this.drive = google.drive({ version: 'v3', auth });
      this.initialized = true;
   }

   async uploadFile(buffer, fileName, mimeType, parentFolderId = null) {
      if (!this.initialized) {
         throw new Error(
            'GoogleDriveService not initialized. Call init() first.'
         );
      }

      const stream = new PassThrough();
      stream.end(buffer);

      const response = await this.drive.files.create({
         requestBody: {
            name: fileName,
            mimeType,
            ...(parentFolderId && { parents: [parentFolderId] }),
         },
         media: {
            mimeType,
            body: stream,
         },
         fields: 'id, name, webViewLink, webContentLink',
      });

      return response.data;
   }

   async makeFilePublic(fileId) {
      await this.drive.permissions.create({
         fileId,
         requestBody: {
            role: 'reader',
            type: 'anyone',
         },
      });

      const file = await this.drive.files.get({
         fileId,
         fields: 'webViewLink, webContentLink',
      });

      return file.data;
   }
}

// 👇 Export a singleton instance
module.exports = new GoogleDriveService();
