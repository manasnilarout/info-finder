const queryStrings = {
    CUSTOMER_LOAN_ACCOUNT_ADDRESS: `SELECT loan_amount, customername, fathername, mailingaddress, mailinglandmark, mailingcity, mailingstate, mailingzipcode, mailingmobile FROM "allocation-dump"."allocation_dump" WHERE agreementid = 'placeholder'`,
}

const getQueryString = (type, arg) => {
    console.log(`Given argument => ${arg}`);
    return queryStrings[type].replace('placeholder', arg);
}

module.exports = { getQueryString };