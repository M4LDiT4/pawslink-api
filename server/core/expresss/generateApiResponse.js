`use strict`;

/**
 * @module generateApiResponse
 * @description formats api response
 * @author Jonathan Calugas
 * @requires chalk
 * @argument {object} app - express app
 */

const chalk = require('chalk');

module.exports = (app)=> {
    app.use((req, res, next) => {
        //return next middleware when responseData is not found
        if(!req.responseData){
            return next();
        }else{
            console.log(
            (req.responseData.statusCode === 200
                ? chalk.green.bold(req.responseData.statusCode)
                : chalk.red.bold(req.responseData.statusCode)) +
                ' - ' +
                req.route.path
            );
            // if there is no body for the response data, return a status code
            if(!req.responseData.body) {
                return res.sendStatus(req.responseData.statusCode || 202);
            //return body and statusCode of the `responseData`
            }else{
                return res
                .status(req.responseData.statusCode || 202)
                .send(req.responseData.body);
            }
        }
    }); 
}