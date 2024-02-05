// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const map = require('./generate_map');
const pdf = require('./generate_pdf');
const db = require('./read_db');
const s3 = require('./upload_s3');
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */


function sleep(ms) {
return new Promise((resolve) => {
    setTimeout(resolve, ms);
});
}

const lambdaHandler = async (event, context) => {
    try {
        //const emergencyId = event.queryStringParameters.emergencyId;
        const { id } = event.pathParameters;

        const emergency = await db.getEmergency(id);

        await map.generateMap({lat: emergency.lat, lon: emergency.lon});

        await pdf.generatePdf(emergency);

        await sleep(5000);

        const s3Response = await s3.storeInBucket(emergency.id);

        const { objectUrl } = s3Response;

        console.log({objectUrl});

        response = {
            statusCode: 200,
            body: JSON.stringify({
                url: objectUrl,
            }),
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

exports.lambdaHandler = lambdaHandler;
lambdaHandler({queryStringParameters: {emergencyId: 4}}, null);