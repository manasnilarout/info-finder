require('dotenv').config()
const AWS = require('aws-sdk');
const sleep = require('util').promisify(setTimeout);

const { getQueryString } = require('./helpers/athenaQueries');
const { athenaResultParser } = require('./helpers/athenaResultParser');
const { APP_CONSTANTS } = require('./helpers/appConstants');

AWS.config.update({
    accessKeyId: process.env.ACCESS_ID,
    secretAccessKey: process.env.SECRET_KEY,
    region: APP_CONSTANTS.ATHENA_REGION
})

const athena = new AWS.Athena({ apiVersion: APP_CONSTANTS.ATHENA_API_VERSION });

const getQueryResults = async QueryExecutionId => {
    await sleep(APP_CONSTANTS.QUERY_WAIT_TIME);
    const { QueryExecution } = await athena
        .getQueryExecution({ QueryExecutionId })
        .promise();

    if (
        QueryExecution.Status.State !== APP_CONSTANTS.STATUSES.SUCCEEDED &&
        QueryExecution.Status.State !== APP_CONSTANTS.STATUSES.FAILED &&
        QueryExecution.Status.State !== APP_CONSTANTS.STATUSES.CANCELLED
    ) {
        console.log(`Not ready yet: ${JSON.stringify(QueryExecution, null, 2)}`);
        return getQueryResults(QueryExecutionId);
    }

    console.info(`(${QueryExecutionId}) Results ready.`);
    const data = await athena.getQueryResults({ QueryExecutionId }).promise();
    return data.ResultSet.Rows;
}

const getDataFromAthena = async (queryString) => {
    try {
        const params = {
            QueryString: queryString,
            QueryExecutionContext: {
                Database: APP_CONSTANTS.ALLOCATION_DB
            },
            ResultConfiguration: {
                OutputLocation: `s3://${process.env.S3_BUCKET}/results`
            }
        }

        var { QueryExecutionId } = await athena
            .startQueryExecution(params)
            .promise()

        console.info(`(${QueryExecutionId}) Getting query results...`)
        const data = await getQueryResults(QueryExecutionId)
        return athenaResultParser(data);
    } catch (err) {
        throw err
    }
}

module.exports = { getDataFromAthena }