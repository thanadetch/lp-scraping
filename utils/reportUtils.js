const logReport = (report, index, property, properties, status) => {
    report.push({no: index + 1, lpCode: property.lpCode, status: status});
    console.log(`[${index + 1}/${properties.length}]`, property.lpCode, status)
}

module.exports = {
    logReport
}
