const authControllerRegistry = {
   signIn: require('./sign_in'),
   signUp: require('./sign_up'),
   refresh: require('./refresh_token'),
};

module.exports = authControllerRegistry;
