const readXlsxFile = require("read-excel-file/node");


const getZoneList = async () => {
    const map = {
        'Zone iD': 'zoneId',
        'Zone name ไทย': 'zoneNameTh',
        'Zone name English': 'zoneNameEng',
    }
    const {rows} = await readXlsxFile(`data/living_bulk2023.xlsx`, {
        sheet: 'Zone list',
        map: map,
    });
    return rows;
}

module.exports = {
    getZoneList
}
