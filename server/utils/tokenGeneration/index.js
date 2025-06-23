const jwt = require('jsonwebtoken');

/**
 * Singleton service for generating and verifying JWT tokens.
 *
 * @class TokenGenerationService
 * @singleton
 *
 * @author Jonathan Calugas
 * @description This service provides methods to generate access and refresh tokens,
 *              verify access tokens, and verify refresh tokens. It uses environment
 */
class TokenGenerationService {
   constructor() {
      if (TokenGenerationService.instance) {
         return TokenGenerationService.instance;
      }
      this.accessKey = process.env.JWT_ACCESS_KEY;
      this.refreshKey = process.env.JWT_REFRESH_KEY;
      TokenGenerationService.instance = this;
   }

   /**
    *
    * @param {*} payload data that will be encoded in the token
    * @description payload should contain the user id and other information that will be used to identify the user
    * @param {*} expiration the amount of time the token will be valid
    * @description expiration should be a string that is parsable by the jsonwebtoken library, e.g. "1h", "2d", etc.
    * @returns jwt token
    * @description returns a signed JWT token with the provided payload and expiration time
    * @author Jonathan Calugas
    * @memberof TokenGenerationService
    */
   generateAccessKey(payload, expiration) {
      return jwt.sign(payload, this.accessKey, { expiresIn: expiration });
   }

   /**
    *
    * @param {*} payload data that will be encoded in the refresh token
    * @description payload should contain the user id and other information that will be used to identify the user
    * @param {*} expiration the amount of time the refresh token will be valid
    * @description expiration should be a string that is parsable by the jsonwebtoken library, e.g. "1h", "2d", etc.
    * @author Jonathan Calugas
    * @memberof TokenGenerationService
    * @description returns a signed JWT refresh token with the provided payload and expiration time
    * @returns jwt refresh token
    */

   generateRefreshKey(payload, expiration) {
      return jwt.sign(payload, this.refreshKey, { expiresIn: expiration });
   }
   /**
    *
    * @param {*} oldToken the refresh token that will be verified
    * @description oldToken should be a string that is a valid JWT refresh token
    * @author Jonathan Calugas
    * @memberof TokenGenerationService
    * @description verifies the refresh token and returns the decoded payload if valid
    * @returns decoded payload if the refresh token is valid, otherwise throws an error
    * @throws {Error} if the refresh token is invalid or expired
    */

   verifyRefreshToken(oldToken) {
      return jwt.verify(oldToken, this.refreshKey);
   }

   /**
    *
    * @param {*} accessToken the access token that will be verified
    * @description accessToken should be a string that is a valid JWT access token
    * @param {*} callback optional callback function that will be called with the decoded payload or an error
    * @author Jonathan Calugas
    * @memberof TokenGenerationService
    * @description verifies the access token and returns the decoded payload if valid
    * @throws {Error} if the access token is invalid or expired
    */

   verifyAccessToken(accessToken, callback) {
      if (callback && typeof callback === 'function') {
         return jwt.verify(accessToken, this.accessKey, callback);
      } else {
         return jwt.verify(accessToken, this.accessKey);
      }
   }
}

module.exports = new TokenGenerationService();
