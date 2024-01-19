const writeXlsxFile = require("write-excel-file/node");
const {basePath} = require("./environmentUtils");
const readXlsxFile = require("read-excel-file/node");

const generateExcel = async (objects) => {
    const schema = [
        {column: 'Action', type: String, value: listing => listing.action},
        {column: 'SKU', type: String, value: listing => listing.sku},
        {column: 'building_type', type: String, value: listing => listing.building_type},
        {column: 'PostType', type: String, value: listing => listing.postType},
        {column: 'PostFrom', type: String, value: listing => listing.postFrom},
        {column: 'ostAcceptAgent', type: Boolean, value: listing => listing.ostAcceptAgent},
        {column: 'Zone ID', type: String, value: listing => listing.zoneId},
        {column: 'Project ID', type: String, value: listing => listing.projectId},
        {column: 'Title TH', type: String, value: listing => listing.titleTH},
        {column: 'Content TH', type: String, value: listing => listing.contentTH},
        {column: 'Title EN', type: String, value: listing => listing.titleEN},
        {column: 'Content EN', type: String, value: listing => listing.contentEN},
        {column: 'Price', type: Number, value: listing => listing.price},
        {column: 'AreaSize', type: Number, value: listing => listing.areaSize},
        {column: 'Area_rai', type: Number, value: listing => listing.area_rai},
        {column: 'Area_ngan', type: Number, value: listing => listing.area_ngan},
        {column: 'Area_wa', type: Number, value: listing => listing.area_wa},
        {column: 'Floor', type: Number, value: listing => listing.floor},
        {column: 'Room', type: Number, value: listing => listing.room},
        {column: 'Bathroom', type: Number, value: listing => listing.bathroom},
        {column: 'pet_allowed', type: String, value: listing => listing.pet_allowed},
        {column: 'fq', type: String, value: listing => listing.fq},
        {column: 'youtube', type: String, value: listing => listing.youtube},
        {column: 'latitude', type: Number, value: listing => listing.latitude},
        {column: 'longitude', type: Number, value: listing => listing.longitude},
        {column: 'Picture1', type: String, value: listing => listing.picture1},
        {column: 'Picture2', type: String, value: listing => listing.picture2},
        {column: 'Picture3', type: String, value: listing => listing.picture3},
        {column: 'Picture4', type: String, value: listing => listing.picture4},
        {column: 'Picture5', type: String, value: listing => listing.picture5},
        {column: 'Picture6', type: String, value: listing => listing.picture6},
        {column: 'Picture7', type: String, value: listing => listing.picture7},
        {column: 'Picture8', type: String, value: listing => listing.picture8},
        {column: 'Picture9', type: String, value: listing => listing.picture9},
        {column: 'Picture10', type: String, value: listing => listing.picture10},
        {column: 'Picture11', type: String, value: listing => listing.picture11},
        {column: 'Picture12', type: String, value: listing => listing.picture12},
        {column: 'Useful space', type: Number, value: listing => listing.usefulSpace},
        {column: 'Income Avg./Year', type: Number, value: listing => listing.incomeAvgPerYear},
        {column: 'Email', type: String, value: listing => listing.email},
        {column: 'Line ID', type: String, value: listing => listing.lineId},
        {column: 'Tel.', type: String, value: listing => listing.tel},
        {column: 'Name', type: String, value: listing => listing.name},
        {column: 'Whatsapp', type: String, value: listing => listing.whatsapp},
        {column: 'Facebook Messenger', type: String, value: listing => listing.facebookMessenger},
        {column: 'Wechat', type: String, value: listing => listing.wechat},
        {column: 'External Data Source', type: String, value: listing => listing.externalDataSource},
        {column: 'Facing direction', type: String, value: listing => listing.facingDirection},
        {column: 'Unit Number', type: String, value: listing => listing.unitNumber},
    ];

    await writeXlsxFile(objects, {
        schema,
        filePath: `${basePath}/listings.xlsx`
    })

}

const getDataFromExcel = async () => {
    const rows = await readXlsxFile(`configs/data.xlsx`);
    rows.shift();
    return rows.map(value => ({
        lpCode: value[0],
        name: value[1],
        psCode: value[2],
        area: value[3]
    }))
}

module.exports = {
    generateExcel,
    getDataFromExcel
}
