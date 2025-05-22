const jwt = require("jsonwebtoken");

class TokenGenerationService {
    constructor(){
        if(TokenGenerationService.instance){
            return TokenGenerationService.instance;
        }
        this.accessKey = process.env.JWT_ACCESS_KEY;
        this.refreshKey = process.env.JWT_REFRESH_KEY;
        TokenGenerationService.instance = this;
    }

    generateAccessKey(payload, expiration){
        return jwt.sign(
            payload,
            this.accessKey,
            {expiresIn: expiration}
        )
    }

    generateRefreshKey(payload, expiration){
        return jwt.sign(
            payload,
            this.refreshKey,
            {expiresIn: expiration}
        )
    }

    verifyRefreshToken(oldToken){
        return jwt.verify(oldToken, this.refreshKey);
    }
}

module.exports = new TokenGenerationService();