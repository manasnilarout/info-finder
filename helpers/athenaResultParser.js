const athenaResultParser = (res) => {
    try {
        const keys = res[0].Data.map(chunk => chunk.VarCharValue);
        const results = [];

        for (let i = 1; i < res.length; i++) {
            const chunk = res[i].Data;
            const obj = {};

            for (let j = 0; j < keys.length; j++) {
                obj[keys[j]] = chunk[j].VarCharValue;
            }

            results.push(obj);
        }

        return results;
    } catch (err) {
        err.additionalMessage = 'Athena results parsing failed.';
        throw err;
    }
}

module.exports = { athenaResultParser }