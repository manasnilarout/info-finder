const APP_CONSTANTS = {
    ATHENA_REGION: 'ap-south-1',
    ATHENA_API_VERSION: '2017-05-18',
    ALLOCATION_DB: 'allocation-dump',
    QUERY_WAIT_TIME: 5000,
    STATUSES: {
        SUCCEEDED: 'SUCCEEDED',
        FAILED: 'FAILED',
        CANCELLED: 'CANCELLED',
    },
}

module.exports = { APP_CONSTANTS };