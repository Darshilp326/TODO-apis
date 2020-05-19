const jwt = require('jwt-simple');
/**
 * @swagger
 *
 * /api/ensureAuthenticated/notused:
 *   post:
 *     description: route description
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: path
 *       - name: editThis
 *         description:
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description:
 */
exports.ensureAuthenticated = function (request, response, next) {
    console.log('inside auth');
    if (request.headers.authorization) {
        console.log('inside header');
        var token = request.headers.authorization.split(' ')[1];
        try {
            console.log('tryy');
            var decoded = jwt.decode(token, process.env.TOKEN_SECRET);
            if (decoded.exp <= Date.now()) {
                response.json({
                    status: 400,
                    message: 'Access token has expired' //ACCESS_TOKEN_EXPIRED
                });
            } else {
                console.log('else');
                request.user = decoded.user;
                return next();
            }
        }
        catch (error) {
            console.log(error);
            return response.json({
                status: 500,
                message: TOKEN_PARSING_ERROR
            });
        }
    } else {
        console.log('if else');
        return response.json({
        status: 401,
        message: ACCESS_TOKEN_REQUIRED
    });}
};