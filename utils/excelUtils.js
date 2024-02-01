const writeXlsxFile = require("write-excel-file/node");
const {basePath} = require("./environmentUtils");
const readXlsxFile = require("read-excel-file/node");
const {listingMap, zoneIdMapper} = require("../constants/mapper");
const {mapperObject} = require("./elementUtils");
const {REPORT_STATUS} = require("../constants/report");
const {cleanUp} = require("./scaperUtils");
const {separateThaiAndEnglish} = require("./propertyUtils");
let projectCondoLists;
let projectHouseLists;

const generateExcel = async (objects) => {
    console.log('Generating Listing Excel...')
    const schema = [
        {column: 'Action', type: String, value: listing => listing.action},
        {column: 'SKU', type: String, value: listing => listing.sku},
        {column: 'building_type', type: String, value: listing => listing.building_type},
        {column: 'PostType', type: String, value: listing => listing.postType},
        {column: 'PostFrom', type: String, value: listing => listing.postFrom},
        {column: 'ostAcceptAgent', type: Boolean, value: listing => listing.ostAcceptAgent},
        {column: 'Zone ID', type: Number, value: listing => listing.zoneId},
        {column: 'Project ID', type: Number, value: listing => listing.projectId},
        {column: 'Title TH', type: String, value: listing => listing.titleTH},
        {column: 'Content TH', type: String, value: listing => listing.contentTH},
        {column: 'Title EN', type: String, value: listing => listing.titleEN},
        {column: 'Content EN', type: String, value: listing => listing.contentEN},
        {column: 'Price', type: Number, value: listing => listing.price},
        {column: 'AreaSize', type: Number, value: listing => listing.areaSize},
        {column: 'Area_rai', type: Number, value: listing => listing.area_rai},
        {column: 'Area_ngan', type: Number, value: listing => listing.area_ngan},
        {column: 'Area_wa', type: Number, value: listing => listing.area_wa},
        {column: 'Floor', type: String, value: listing => listing.floor},
        {column: 'Room', type: String, value: listing => listing.room},
        {column: 'Bathroom', type: String, value: listing => listing.bathroom},
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
        {column: 'Property Type', type: String, value: listing => listing.propertyType},
        {column: 'Feedback Checked', type: String, value: listing => listing.feedbackChecked},
        {column: 'Listed On', type: Date, format: 'dd/mm/yyyy', value: listing => listing.listedOn},
        {column: 'Building year', type: Number, value: listing => listing.buildingYear},
        {column: 'Availability', type: String, value: listing => listing.availability},
        {column: 'PS Code', type: String, value: listing => listing.psCode},
        {column: 'Area', type: String, value: listing => listing.area},
    ];

    await writeXlsxFile(objects, {
        schema,
        filePath: `${basePath}/listings.xlsx`,
    })
}

const generateReportExcel = async (objects) => {
    console.log('Generating Report Excel...')
    const schema = [
        {column: 'No', type: Number, value: listing => listing.no},
        {column: 'LP Code', type: String, value: listing => listing.lpCode},
        {column: 'PS Code', type: String, value: listing => listing.psCode},
        {column: 'Status', type: String, value: listing => listing.status},
    ];

    await writeXlsxFile(objects, {
        schema,
        filePath: `${basePath}/reports.xlsx`
    })
}

const getDataFromExcelV1 = async () => {
    const rows = await readXlsxFile(`data/dataV1-1.xlsx`);
    rows.shift();
    return rows.map(value => ({
        lpCode: value[0],
        name: value[1],
        psCode: value[2],
        area: value[3]
    }))
}


const getDataFromExcelV2 = async (fileName) => {
    const rows = await readXlsxFile(`data/${fileName}`);
    rows.shift();
    return rows.map(value => ({
        psCode: value[0],
        lpCode: value[1],
        area: value[2],
        name: value[3],
        postBy: value[5],
        feedBackChecked: value[14],
        listedOn: value[15],
        buildingYear: value[16],
        availability: value[17],
    }))
}

const getDataFromExcelV2_1 = async () => {
    return getDataFromExcelV2('dataV2-1.xlsx')
}

const getDataFromExcelV2_2 = async () => {
    return getDataFromExcelV2('dataV2-2.xlsx')
}

const getDataFromExcelV2_3 = async () => {
    return getDataFromExcelV2('dataV2-3.xlsx')
}

const getProjectLists = async (sheet, variable) => {
    if (!variable) {
        const map = {
            'Zone ID': 'zoneId',
            'Project ID': 'projectId',
            'Project name ไทย': 'projectNameTH',
            'Project name English': 'projectNameEN',
        }
        const {rows} = await readXlsxFile(`data/living_bulk2023.xlsx`, {
            sheet: sheet,
            map: map,
        });
        variable = rows
    }
    return variable;
}

const getProjectCondoList = () => getProjectLists('Project list(CONDO)', projectCondoLists);
const getProjectHouseList = () => getProjectLists('Project list(House)', projectHouseLists);

const getProject = async (property, buildingType) => {
    let projectCondoList;
    let projectHouseList;

    function findProjectId(list) {
        const filterCondo = list.find(p => p.projectNameEN.includes(property.name));

        return {
            projectId: filterCondo?.projectId,
            zoneId: filterCondo?.zoneId
        }
    }

    switch (buildingType) {
        case 'Condo':
        case 'Hotel_apartment':
            projectCondoList = await getProjectCondoList();
            return findProjectId(projectCondoList);
        case 'Home':
        case 'Townhome':
        case 'Land':
            projectHouseList = await getProjectHouseList();
            return findProjectId(projectHouseList);
        case 'Commercial':
            projectCondoList = await getProjectCondoList();
            projectHouseList = await getProjectHouseList();
            return findProjectId([...projectCondoList, ...projectHouseList]);
        default:
            return ''
    }
}


const getDataList = async (fileName) => {
    switch (fileName) {
        case 'listingsV1-1.xlsx':
            return getDataFromExcelV1()
        case 'listingsV2-1.xlsx':
            return getDataFromExcelV2_1()
        case 'listingsV2-2.xlsx':
            return getDataFromExcelV2_2()
        default:
            const dataV1 = await getDataFromExcelV1()
            const dataV2_1 = await getDataFromExcelV2_1()
            const dataV2_2 = await getDataFromExcelV2_2()
            return [...dataV1, ...dataV2_1, ...dataV2_2]
    }
}

const defaultOptions = {
    fillProjectId: true,
    fillZoneId: true,
    fillPsCode: true,
    fillArea: true,
    fillTitle: true,
}
const fillMissingData = async (fileName, options = defaultOptions) => {
    options = {...defaultOptions, ...options}
    await cleanUp();
    const dataList = await getDataList(fileName);
    const {rows} = await readXlsxFile(`data/${fileName}`, {
        map: listingMap,
    });
    const results = [];
    let index = 0;

    for (const row of rows) {
        const data = dataList.find(d => d.lpCode === row.sku)
        const {
            projectId,
            zoneId: projectZoneId
        } = options.fillProjectId ? await getProject(data, row.building_type) : {projectId: null, zoneId: null};
        const zoneId = options.fillZoneId ? projectZoneId ? projectZoneId : mapperObject(data?.area, zoneIdMapper) : null;
        if (options.fillZoneId) row.zoneId = zoneId
        if (options.fillProjectId) row.projectId = projectId
        if (options.fillPsCode) row.psCode = data.psCode ? ('' + data.psCode) : ''
        if (options.fillArea) row.area = data.area

        let titleENValue = ''
        let titleTHValue = ''
        if (options.fillTitle && row.building_type === 'Condo') {
            const title = separateThaiAndEnglish(row.titleTH)

            titleENValue = title.english
            titleTHValue = title.thai
            row.titleEN = title.english
            row.titleTH = title.thai
        }
        results.push(row);
        console.log(`[${index + 1}/${rows.length}]`, data.lpCode,
            'zoneId:', zoneId,
            'projectId:', projectId,
            'psCode:', row.psCode,
            'titleEN:', titleENValue,
            'titleTH:', titleTHValue,
        )
        index++;
    }
    // if (browser) await browser.close();
    await generateExcel(results)
    console.log('finished')
}


const filterNotDuplicateLists = async (listings) => {
    console.log('Check Duplicating...')
    const psCodeObj = {};
    let index = 0;
    let duplicatedCount = 0;
    for (const listing of listings) {
        const key = listing.psCode + listing.postType;
        if (psCodeObj[key]) {
            duplicatedCount++;
            listing.isRemoved = true;
            console.log(`[${index + 1}/${listings.length}]`, listing.sku, listing.postType, listing.psCode, REPORT_STATUS.DUPLICATED);
        }
        psCodeObj[key] = true;
        index++;
    }
    console.log('Duplicate Count:', duplicatedCount)
    return listings.filter(listing => !listing.isRemoved);
}

const combineListAndCheckDuplicate = async (fileNames) => {
    await cleanUp();
    let listings = [];
    for (const fileName of fileNames) {
        const {rows} = await readXlsxFile(`listing/${fileName}`, {
            map: listingMap,
        });
        listings = [...listings, ...rows]
    }
    const results = await filterNotDuplicateLists(listings);
    await generateExcel(results)
    console.log('finished')
}

module.exports = {
    generateExcel,
    generateReportExcel,
    getDataFromExcelV1,
    getDataFromExcelV2,
    getDataFromExcelV2_1,
    getDataFromExcelV2_2,
    getDataFromExcelV2_3,
    getProjectCondoList,
    getProjectHouseList,
    fillMissingData,
    getProject,
    combineListAndCheckDuplicate,
    filterNotDuplicateLists,
}
