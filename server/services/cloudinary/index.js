const cloudinary = require('cloudinary').v2;

class CloudinaryService {
   constructor() {
      this.initialized = false;
   }

   init(config = null) {
      if (this.initialized) {
         return;
      }
      cloudinary.config(
         config || {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
         }
      );

      this.initialized = true;
   }

   async uploadImage(buffer, publicId = null, folderId = null) {
      if (!this.initialized) {
         throw new Error(
            'CloudinaryService not initialized. Call init() first.'
         );
      }

      return new Promise((resolve, reject) => {
         const uploadOptions = {
            resource_type: 'image',
            folder: folderId || 'default',
            public_id: publicId || undefined,
         };

         cloudinary.uploader
            .upload_stream(uploadOptions, (error, result) => {
               if (error) return reject(error);
               resolve(result);
            })
            .end(buffer);
      });
   }

   getUrl(publicId, options = {}) {
      if (!this.initialized) {
         throw new Error(
            'CloudinaryService not initialized. Call init() first.'
         );
      }
      return cloudinary.url(publicId, {
         secure: true,
         ...options,
      });
   }

   async uploadImageAndGetUrl(
      buffer,
      publicId = null,
      folderId = null,
      urlOptions = {}
   ) {
      const uploadResult = await this.uploadImage(buffer, publicId, folderId);
      return this.getUrl(uploadResult.public_id, urlOptions);
   }
}

module.exports = new CloudinaryService();
