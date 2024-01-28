const logReport = (report, index, property, length, status) => {
    report.push({
        no: index + 1,
        lpCode: property.lpCode,
        psCode: property?.psCode ? ('' + property.psCode) : '',
        status: status
    });
    console.log(`[${index + 1}/${length}]`, property.lpCode, status)
}

module.exports = {
    logReport
}
