const writeXlsxFile = require("write-excel-file/node");
const {basePath, imageBasePath} = require("./environmentUtils");
const readXlsxFile = require("read-excel-file/node");
const {
    listingMap,
    zoneIdMapper,
    listingTypeThaiMapper,
    propertyTypeThaiMapper,
    thaiAreaMapper, areaLpCodeMapper, lpCodeMapper, suffixMapper
} = require("../constants/mapper");
const {mapperObject} = require("./elementUtils");
const {REPORT_STATUS} = require("../constants/report");
const {cleanUp} = require("./scaperUtils");
const {separateThaiAndEnglish} = require("./propertyUtils");
const {getProjectFromNameEn} = require("./projectUtils");
const {getZoneList} = require("./zoneUtils");
const fs = require("fs");
const {logReport, logLpReport} = require("./reportUtils");
const _ = require("lodash");
const {dataSchema} = require("../constants/schema");

const generateExcel = async (objects) => {
    console.log('Generating Listing Excel...')
    const schema = [
        {column: 'Action', type: String, value: listing => listing.action},
        {column: 'SKU', type: String, value: listing => listing.sku},
        {column: 'building_type', type: String, value: listing => listing.building_type},
        {column: 'PostType', type: String, value: listing => listing.postType},
        {column: 'PostFrom', type: String, value: listing => listing.postFrom},
        {column: 'ostAcceptAgent', type: Boolean, value: listing => listing.ostAcceptAgent},
        {column: 'Zone ID', value: listing => listing.zoneId},
        {column: 'Project ID', value: listing => listing.projectId},
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
        {column: 'Building year', type: String, value: listing => listing.buildingYear?.toString()},
        {column: 'Availability', type: String, value: listing => listing.availability},
        {column: 'Comment', type: String, value: listing => listing.comment},
        {column: 'PS Code', type: String, value: listing => listing.psCode},
        {column: 'Area LP', type: String, value: listing => listing.areaLp},
        {column: 'Area LV', type: String, value: listing => listing.areaLv},
        {column: 'Avl. checked', type: String, value: listing => listing.avlChecked},
    ];

    await writeXlsxFile(objects, {
        schema,
        filePath: `${basePath}/listings.xlsx`,
    })
}

const generateDataExcel = async (objects) => {
    console.log('Generating Data Excel...')

    const schema = [
        {column: 'PS Code', value: data => data.psCode},
        {column: 'LP Code', value: data => data.lpCode},
        {column: 'Nearest Transport', value: data => data.nearestTransport},
        {column: 'Project name', value: data => data.projectName},
        {column: 'Rental Price', value: data => data.rentalPrice},
        {column: 'Post by', value: data => data.postBy},
        {column: 'Property type', value: data => data.propertyType},
        {column: 'Bedrooms', value: data => data.bedrooms},
        {column: 'Bathrooms', value: data => data.bathrooms},
        {column: 'Floor size', value: data => data.floorSize},
        {column: 'Unit number', value: data => data.unitNumber},
        {column: 'Floor', value: data => data.floor},
        {column: 'Sale Price', value: data => data.salePrice},
        {column: 'Listing type', value: data => data.listingType},
        {column: 'Feedback Checked', value: data => data.feedbackChecked},
        {column: 'Listed On', type: Date, format: 'dd/mm/yyyy', value: data => data.listedOn},
        {column: 'Building year', value: data => data.buildingYear},
        {column: 'Availability', value: data => data.availability},
        {column: 'Avl. checked', value: data => data.avlChecked}
    ];

    await writeXlsxFile(objects, {
        schema,
        filePath: `${basePath}/data.xlsx`,
    })
}

const generateInternalExcel = async (objects) => {
    console.log('Generating Internal Data Excel...')

    const schema = [
        {column: 'Area_LP', type: String, value: listing => listing.areaLP},
        {column: 'Area_LV', type: String, value: listing => listing.areaLV},
        {column: 'SKU', type: String, value: listing => listing.sku},
        {column: 'Property_Type', type: String, value: listing => listing.propertyType},
        {column: 'PostType', type: String, value: listing => listing.postType},
        {column: 'PostFrom', type: String, value: listing => listing.postFrom},
        {column: 'Title_EN', type: String, value: listing => listing.titleEN},
        {column: 'Price', type: Number, value: listing => listing.price},
        {column: 'AreaSize', type: Number, value: listing => listing.areaSize},
        {column: 'Floor', type: String, value: listing => listing.floor},
        {column: 'Bedroom', type: String, value: listing => listing.bedroom},
        {column: 'Bathroom', type: String, value: listing => listing.bathroom},
        {column: 'Pet_Allowed', type: String, value: listing => listing.petAllowed},
        {column: 'Facing_Direction', type: String, value: listing => listing.facingDirection},
        {column: 'Unit_Number', type: String, value: listing => listing.unitNumber},
        {column: 'Building_Year', type: String, value: listing => listing.buildingYear},
        {column: 'Email', type: String, value: listing => listing.email},
        {column: 'Line_ID', type: String, value: listing => listing.lineID},
        {column: 'Tel.', type: String, value: listing => listing.tel},
        {column: 'Name', type: String, value: listing => listing.name},
        {column: 'Whatsapp', type: String, value: listing => listing.whatsapp},
        {column: 'Facebook_Messenger', type: String, value: listing => listing.facebookMessenger},
        {column: 'Wechat', type: String, value: listing => listing.wechat},
        {column: 'External_Data_Source', type: String, value: listing => listing.externalDataSource},
        {column: 'Listed_On', type: Date, format: 'dd/mm/yyyy', value: listing => listing.listedOn},
        {column: 'Availability', type: String, value: listing => listing.availability},
        {column: 'Comment', type: String, value: listing => listing.comment},
        {column: 'Update_Availability', type: String, value: listing => listing.updateAvailability},
        {column: 'Exclusive', type: String, value: listing => listing.exclusive},
        {column: 'PS_Code', type: String, value: listing => listing.psCode}
    ];

    await writeXlsxFile(objects, {
        schema,
        filePath: `${basePath}/data.xlsx`,
    })
}

const generateLpCodeExcel = async (objects) => {
    console.log('Generating LP Excel...')
    const schema = [
        {column: 'Code', type: String, value: lpCode => lpCode.code},
        {column: 'Count', type: Number, value: lpCode => lpCode.count},
    ];

    await writeXlsxFile(objects, {
        schema,
        filePath: `${basePath}/lp-code.xlsx`,
    })
}

const generateReportExcelOptions = {
    psCode: true
}
const generateReportExcel = async (objects, options = generateReportExcelOptions) => {
    options = {...generateReportExcelOptions, ...options}
    console.log('Generating Report Excel...')
    let schema = [
        {column: 'LP Code', type: String, value: listing => listing.lpCode},
        {column: 'PS Code', type: String, value: listing => listing.psCode},
        {column: 'Status', type: String, value: listing => listing.status},
    ];
    if (!options.psCode) schema = schema.filter(s => s.column !== 'PS Code')

    const summarySchema = [
        {column: 'Status', type: String, value: summary => summary.status},
        {column: 'Count', type: Number, value: summary => summary.count},
    ]
    const summaryObjects = [];
    const statusObj = {};
    for (const object of objects) {
        statusObj[object.status] = (statusObj[object.status] || 0) + 1;

    }
    for (const [status, count] of Object.entries(statusObj)) {
        summaryObjects.push({status, count})
    }

    await writeXlsxFile([objects, summaryObjects], {
        schema: [schema, summarySchema],
        sheets: ['Data', 'Summary'],
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
        avlChecked: value[18],
    }))
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const getTitleEN = ({sku, postType, titleEN, titleTH, areaLp, room, building_type, pet_allowed, propertyType}) => {
    const suffixes = suffixMapper['EN'][postType][building_type]
    const suffix = suffixes[getRandomInt(suffixes.length)]
    return `[${sku}] ${titleEN} (${titleTH}) : ${propertyType} for ${postType === 'Sell' ? 'Sale' : 'Rent'} ${pet_allowed === 'Allow' ? `Pet friendly ` : ''}${room !== undefined ? `${room} Bedroom` : ''} Near ${areaLp} ${suffix}`
}

const getTitleTH = ({sku, postType, titleEN, titleTH, areaLp, room, building_type, pet_allowed}) => {
    const suffixes = suffixMapper['TH'][postType][building_type]
    const suffix = suffixes[getRandomInt(suffixes.length)]
    return `[${sku}] ${titleEN} (${titleTH}) : ${postType === 'Sell' ? 'ขาย' : ''}${propertyTypeThaiMapper[building_type]}${postType === 'Rent' ? 'ให้เช่า' : ''} ${pet_allowed === 'Allow' ? `เลี้ยงสัตว์ได้ ` : ''}${room !== undefined ? `${room} ห้องนอน` : ''} ใกล้${thaiAreaMapper[areaLp]} ${suffix}`
}


const getDescriptionTemplateEN = ({
                                      postType, building_type, titleEN, sku, propertyType,
                                      areaLp, room, bathroom, areaSize, floor, price
                                  }) =>
    `[${postType === 'Sell' ? 'Sale' : 'Rent'}] ${titleEN} (${sku})\n\n` +
    `🚗 Near ${areaLp}\n\n` +
    `🏡 Property Type: ${propertyType}\n` +
    `${(room !== undefined || bathroom !== undefined) && `- Bed-Bath: ${room !== undefined ? `${room} Beds ` : ''}${bathroom !== undefined ? `${bathroom} Baths` : ''} \n`}` +
    `${areaSize ? `- Unit Size: ${areaSize} sq.m.\n${!floor ? '\n' : ''}` : ''}` +
    `${floor ? `- Floor: ${floor}\n\n` : ''}` +
    `💸 ${postType === 'Rent' ? `Rental Price: ${price.toLocaleString()} thb/month` : `Selling Price: ${price.toLocaleString()} thb`}\n\n` +
    `📞 Contact: Janis (Property consultant)\n` +
    `Mobile: 083-525-9585\n` +
    `Whatsapp: (66)82-423-3151\n` +
    `Line ID : @lifeproperty Or click https://lin.ee/rBG2BOp\n` +
    `Wechat : thananid\n` +
    `Email: lifeproperty.bkk@gmail.com\n\n` +
    `Contact us now to schedule a real visit!\n` +
    `LIFE PROPERTY, we're your local real estate experts in Bangkok, happy to suggest and assist you in finding your perfect home – absolutely Free!\n` +
    `Your dream home awaits you! Call us now!` +
    `${['Condo', 'Hotel_apartment'].includes(building_type) ? `\n\n#เช่าคอนโด #คอนโดให้เช่า #คอนโดติดรถไฟฟ้า #เอเจนท์คอนโด #คอนโดติดbts #คอนโดใกล้รถไฟฟ้า #condoforrentbangkok\n` : ''}` +
    `${['Condo', 'Hotel_apartment'].includes(building_type) ? `#bangkokcondo #คอนโดพร้อมอยู่  #คอนโดน่าอยู่ #คอนโดน่าลงทุน #คอนโดหรู #condointhailand #thailandcondo\n` : ''}` +
    `${['Condo', 'Hotel_apartment'].includes(building_type) ? `#thailandrealestate #thailandresidence #condoinvestment #LifeProperty #${titleEN.replaceAll(' ', '')} #${areaLp.replaceAll(' ', '')}` : ''}`;

const getDescriptionTemplateTH = ({
                                      postType, building_type, titleTH, sku,
                                      areaLp, room, bathroom, areaSize, floor, price
                                  }) =>
    `[${listingTypeThaiMapper[postType]}] ${titleTH} (${sku})\n\n` +
    `🚗 ใกล้${thaiAreaMapper[areaLp]}\n\n` +
    `🏡 ประเภท: ${propertyTypeThaiMapper[building_type]}\n` +
    `${(room !== undefined || bathroom !== undefined) && `- ห้องนอน-ห้องน้ำ: ${room !== undefined ? `${room} ห้องนอน ` : ''}${bathroom !== undefined ? `${bathroom} ห้องน้ำ` : ''} \n`}` +
    `${areaSize ? `- ขนาดห้อง: ${areaSize} ตร.ม.\n${!floor ? '\n' : ''}` : ''}` +
    `${floor ? `- ชั้น: ${floor}\n\n` : ''}` +
    `💸 ${postType === 'Rent' ? `ราคาเช่า: ${price.toLocaleString()} บาท/เดือน` : `ราคาขาย: ${price.toLocaleString()} บาท`}\n\n` +
    `📞 ติดต่อ: เจนิส (ที่ปรึกษาด้านอสังหาฯ)\n` +
    `โทร: 083-525-9585\n` +
    `Whatsapp: (66)82-423-3151\n` +
    `Line ID : @lifeproperty Or click https://lin.ee/rBG2BOp\n` +
    `Wechat : thananid\n` +
    `อีเมล: lifeproperty.bkk@gmail.com\n\n` +
    `ติดต่อเราเพื่อนัดชมสถานที่จริง วันนี้!\n` +
    `LIFE PROPERTY (ไลฟ์ พร็อพเพอร์ตี้) เราคือผู้เชี่ยวชาญทางด้านอสังหาริมทรัพย์ในกรุงเทพฯ\n` +
    `เรามีทีมงานพร้อมให้คำปรึกษาและช่วยหาสถานที่ที่เหมาะสมที่สุดให้คุณ ฟรี!` +
    `${['Condo', 'Hotel_apartment'].includes(building_type) ? `\n\n#เช่าคอนโด #คอนโดให้เช่า #คอนโดติดรถไฟฟ้า #เอเจนท์คอนโด #คอนโดติดbts #คอนโดใกล้รถไฟฟ้า #condoforrentbangkok\n` : ''}` +
    `${['Condo', 'Hotel_apartment'].includes(building_type) ? `#bangkokcondo #คอนโดพร้อมอยู่  #คอนโดน่าอยู่ #คอนโดน่าลงทุน #คอนโดหรู #condointhailand #thailandcondo\n` : ''}` +
    `${['Condo', 'Hotel_apartment'].includes(building_type) ? `#thailandrealestate #thailandresidence #condoinvestment #LifeProperty #${titleTH.replaceAll(' ', '')} #${areaLp.replaceAll(' ', '')}` : ''}`;

const defaultOptions = {
    fillProjectId: true,
    fillZoneId: true,
    fillPsCode: true,
    fillArea: true,
    fillTitle: true,
    fillDescription: true,
    fillFeedbackChecked: true,
}
const fillMissingData = async (dataFileName, fileName, options = defaultOptions) => {
    options = {...defaultOptions, ...options}
    await cleanUp();
    const {rows: dataList} = await readXlsxFile(`data/${dataFileName}`, {
        map: dataSchema,
    })
    const {rows} = await readXlsxFile(`listings/${fileName}`, {
        map: listingMap,
    });
    const results = [];
    let index = 0;

    for (const row of rows) {
        const data = dataList.find(d => d.lpCode === row.sku)
        const {
            projectId,
            zoneId: projectZoneId
        } = options.fillProjectId ? await getProjectFromNameEn(data, row.building_type) : {
            projectId: null,
            zoneId: null
        };
        const zoneId = options.fillZoneId ? projectZoneId ? projectZoneId : mapperObject(data?.area, zoneIdMapper) : null;
        if (options.fillZoneId) row.zoneId = zoneId
        if (options.fillProjectId) row.projectId = projectId
        if (options.fillPsCode) row.psCode = data.psCode ? ('' + data.psCode) : ''
        if (options.fillArea) row.area = data.area
        if (options.fillFeedbackChecked) row.feedbackChecked = data.feedbackChecked
        if (options.fillDescription) {
            const descriptionEN = getDescriptionTemplateEN(row)
            const descriptionTH = getDescriptionTemplateTH(row)
            row.contentEN = descriptionEN
            row.contentTH = descriptionTH
        }

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

const mapAreaFromListing = async (fileName, dataFileName) => {
    await cleanUp();
    const zoneList = await getZoneList()
    const dataList = await getDataFromExcelV2(dataFileName)
    const {rows} = await readXlsxFile(`data/${fileName}`, {
        map: listingMap,
    });
    const results = [];
    let index = 0;

    for (const row of rows) {
        const data = dataList.find(d => d.lpCode === row.sku)
        const zoneId = row.zoneId;

        let area = ''
        if (zoneId) {
            const zoneArea = zoneList.find(z => z.zoneId === zoneId)
            area = zoneArea ? zoneArea.zoneNameEng : ''
        } else {
            area = ''
        }
        row.areaLp = data.area
        row.areaLv = area
        results.push(row);
        console.log(`[${index + 1}/${rows.length}]`, row.sku)
        index++;
    }
    // if (browser) await browser.close();
    await generateExcel(results)
    console.log('finished')
}

const mapAreaLV = async (fileName) => {
    await cleanUp();
    const zoneList = await getZoneList()
    const {rows} = await readXlsxFile(`listing/${fileName}`, {
        map: listingMap,
    });
    const results = [];
    let index = 0;

    for (const row of rows) {
        const zoneId = row.zoneId;

        let area = ''
        if (zoneId) {
            const zoneArea = zoneList.find(z => z.zoneId?.toString() === zoneId?.toString())
            area = zoneArea ? zoneArea.zoneNameEng : ''
        } else {
            area = ''
        }
        row.areaLv = area
        results.push(row);
        console.log(`[${index + 1}/${rows.length}]`, row.sku)
        index++;
    }
    await generateExcel(results)
    console.log('finished')
}

const mapDescription = async (fileName) => {
    await cleanUp();
    const {rows} = await readXlsxFile(`listing/${fileName}`, {
        map: listingMap,
    });
    const results = [];
    let index = 0;

    for (const row of rows) {
        const descriptionEN = row?.contentEN || getDescriptionTemplateEN(row)
        const descriptionTH = row?.contentTH || getDescriptionTemplateTH(row)
        row.contentEN = descriptionEN
        row.contentTH = descriptionTH
        results.push(row);
        console.log(`[${index + 1}/${rows.length}]`, row.sku)
        index++;
    }
    await generateExcel(results)
    console.log('finished')
}

const filterNotDuplicateLists = async (listings, reports = []) => {
    console.log('Check Duplicating...')
    const psCodeObj = {};
    let index = 0;
    let duplicatedCount = 0;
    for (const listing of listings) {
        const key = listing.psCode + listing.postType;
        if (psCodeObj[key]) {
            duplicatedCount++;
            listing.isRemoved = true;
            reports.push({lpCode: listing.sku, psCode: listing.psCode, status: REPORT_STATUS.DUPLICATED})
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
    const reports = []
    let listings = [];
    for (const fileName of fileNames) {
        const {rows} = await readXlsxFile(`listing/${fileName}`, {
            map: listingMap,
        })
        listings.push(...rows)
    }
    const results = await filterNotDuplicateLists(listings, reports);
    await generateExcel(results)
    await generateReportExcel(reports)
    console.log('finished')
}

const generateLpCode = async (fileName) => {

    await cleanUp();
    let dupObj = {};
    const missingLpCodeObj = {};
    let {rows} = await readXlsxFile(`listing/${fileName}`, {
        map: listingMap,
    });
    let {rows: lpCodeRows} = await readXlsxFile(`data/lp-code.xlsx`, {
        map: lpCodeMapper,
    });
    let lpCodeObj = {};
    lpCodeRows.forEach(row => {
        lpCodeObj[row.code] = row.count
    })
    rows = rows.sort((a, b) => a.areaLp < b.areaLp ? -1 : 1)
    const areaLpList = [...new Set(rows.map(row => row.areaLp))]
    for (const areaLp of areaLpList) {
        if (!areaLpCodeMapper[areaLp]) missingLpCodeObj[areaLp] = ''
    }
    if (Object.entries(missingLpCodeObj).length > 0) {
        console.log('There are missing LP Codes. Please check the following:');
        console.log(missingLpCodeObj)
        return
    }

    const results = [];
    let index = 0;

    for (const row of rows) {
        const lpCode = mapperObject(row.areaLp, areaLpCodeMapper)
        if (!lpCode) console.error(row.areaLp + ' not found')
        if (!dupObj[row.psCode]) lpCodeObj[lpCode]++;
        const lpNumber = lpCodeObj[lpCode]
        dupObj = {...dupObj, [row.psCode]: true}
        row.sku = `${lpCode}-${lpNumber}`
        results.push(row);
        console.log(`[${index + 1}/${rows.length}]`, `${lpCode}-${lpNumber}`, `${row.areaLp}`)
        index++;
    }
    await generateExcel(results)
    const lpCodeArray = Object.entries(lpCodeObj).map(([code, count]) => ({
        code,
        count
    })).sort((a, b) => a.code < b.code ? -1 : 1)
    await generateLpCodeExcel(lpCodeArray)
    console.log('finished')
}

const mapScrapingImagesFromListing = async (fileName) => {
    await cleanUp();
    const zoneList = await getZoneList()
    const {rows} = await readXlsxFile(`data/${fileName}`, {
        map: listingMap,
    });
    const results = [];
    let index = 0;

    for (const row of rows) {
        try {

            console.log(`[${index + 1}/${rows.length}]`, row.sku, REPORT_STATUS.SUCCESS)
        } catch (e) {
            console.log(`[${index + 1}/${rows.length}]`, row.sku, REPORT_STATUS.ERROR)
        } finally {
            index++;
        }
    }
    // if (browser) await browser.close();
    await generateExcel(results)
    console.log('finished')
}


const separateImagesFromListing = async (fileName) => {
    await cleanUp();
    const reports = []
    const {rows} = await readXlsxFile(`listing/${fileName}`, {
        map: listingMap,
    });
    let index = 0;

    for (const row of rows) {
        try {
            await fs.promises.cp(`listing/images/${row.sku}`, `${imageBasePath}/${row.sku}`, {recursive: true})
            logLpReport(reports, index, row.sku, rows.length, REPORT_STATUS.SUCCESS);
        } catch (e) {
            logLpReport(reports, index, row.sku, rows.length, REPORT_STATUS.IMAGE_NOT_FOUND);
        }
        index++;
    }
    reports.sort((a, b) => a.status === REPORT_STATUS.IMAGE_NOT_FOUND ? -1 : 1)
    await generateReportExcel(reports, {psCode: false})
    console.log('finished')
}


const getListingGroupsByTitleEN = async (fileNames) => {
    let listings = [];
    for (const fileName of fileNames) {
        const {rows} = await readXlsxFile(`listing/${fileName}`, {
            map: listingMap,
        })
        listings.push(...rows)
    }
    return _.groupBy(listings, listing => listing.titleEN);
}

const mapProjectIdAndZoneIdFromListing = async (mainFileName) => {
    await cleanUp();
    const {rows: mainRows} = await readXlsxFile(`listing/${mainFileName}`, {
        map: listingMap,
    });
    let index = 0;

    // const listingGroups = await getListingGroupsByTitleEN(fileNames)
    for (const mainRow of mainRows) {
        const project = await getProjectFromNameEn(mainRow.titleEN, mainRow.building_type)

        mainRow.projectId = mainRow.projectId || project.projectId
        mainRow.zoneId = mainRow.zoneId || project.zoneId
        mainRow.areaLp = mainRow.areaLp || project.areaLp
        // const listings = listingGroups[mainRow.titleEN]
        // if (listings) {
        //     const areaLPs = [...new Set(listings.map(listing => listing.areaLp))].filter(value => value !== '-')
        //     const projectIds = [...new Set(listings.map(listing => listing.projectId?.toString()))].filter(value => value)
        //     const zoneIds = [...new Set(listings.map(listing => listing.zoneId?.toString()))].filter(value => value)
        //
        //     mainRow.areaLp = areaLPs.length > 0 ? ((areaLPs.length > 1 ? '*' : '') + areaLPs.join(', ')) : mainRow.areaLp
        //     mainRow.projectId = projectIds.length > 0 ? ((projectIds.length > 1 ? '*' : '') + projectIds.join(', ')) : mainRow.projectId
        //     mainRow.zoneId = zoneIds.length > 0 ? ((zoneIds.length > 1 ? '*' : '') + zoneIds.join(', ')) : mainRow.zoneId
        // }
        index++;
        console.log(`[${index + 1}/${mainRows.length}]`, `${mainRow.sku}`)

    }
    await generateExcel(mainRows)
    console.log('finished')
}


const checkDuplicateFromListing = async (dataFileName, listingFiles) => {
    await cleanUp();
    const psCodeObj = {};
    let index = 0;
    let duplicatedCount = 0;
    const listings = [];
    const results = []
    const {rows: dataList} = await readXlsxFile(`data/${dataFileName}`, {
        map: dataSchema,
    })
    for (const listingFile of listingFiles) {
        const {rows} = await readXlsxFile(`listing/${listingFile}`, {
            map: listingMap,
        })
        listings.push(...rows)
    }

    for (const listing of listings) {
        const key = listing.psCode;
        psCodeObj[key] = true;
    }

    for (const data of dataList) {
        const key = data.psCode;
        if (psCodeObj[key]) {
            duplicatedCount++;
            console.log(data.lpCode, data.psCode, REPORT_STATUS.DUPLICATED);
        } else {
            results.push(data)
        }
        psCodeObj[key] = true;
        index++;
    }

    console.log('Duplicate Count:', duplicatedCount)
    console.log('Data Count Left:', results.length)
    console.log('Total Count:', listings.length + results.length)

    await generateDataExcel(results)
}

const mapFeedbackChecked = async (dataFileName, fileName) => {
    await cleanUp();
    const {rows: dataList} = await readXlsxFile(`data/${dataFileName}`, {
        map: dataSchema,
    })
    const {rows} = await readXlsxFile(`listing/${fileName}`, {
        map: listingMap,
    });
    const results = [];
    let index = 0;

    for (const row of rows) {
        const data = dataList.find(d => d.psCode === row.psCode)
        row.feedbackChecked = data?.feedbackChecked || ''
        results.push(row);
        console.log(`[${index + 1}/${rows.length}]`, row.sku, row.feedbackChecked)
        index++;
    }
    await generateExcel(results)
    console.log('finished')

}

const generateNewNameAndDescription = async (mainFileName) => {


    await cleanUp();
    const {rows: mainRows} = await readXlsxFile(`listing/${mainFileName}`, {
        map: listingMap,
    });
    const missingLpCodeObj = {};
    const areaLpList = [...new Set(mainRows.map(row => row.areaLp))].filter(val => val)
    for (const areaLp of areaLpList) {
        if (!thaiAreaMapper[areaLp]) missingLpCodeObj[areaLp] = ''
    }
    if (Object.entries(missingLpCodeObj).length > 0) {
        console.log('There are missing LP Codes. Please check the following:');
        console.log(missingLpCodeObj)
        return
    }
    let index = 0;

    for (const mainRow of mainRows) {
        mainRow.contentTH = getDescriptionTemplateTH(mainRow);
        mainRow.contentEN = getDescriptionTemplateEN(mainRow);
        const titleTH = getTitleTH(mainRow)
        const titleEN = getTitleEN(mainRow)
        mainRow.titleTH = titleTH
        mainRow.titleEN = titleEN

        index++;
        console.log(`[${index + 1}/${mainRows.length}]`, `${mainRow.sku}`)
        if (mainRow.contentTH.includes('undefined')) console.log('contentTH, There are undefined text.');
        if (mainRow.contentEN.includes('undefined')) console.log('contentTH, There are undefined text.');
        if (mainRow.titleTH.includes('undefined')) console.log('titleTH, There are undefined text.');
        if (mainRow.titleEN.includes('undefined')) console.log('titleEN, There are undefined text.');

    }
    await generateExcel(mainRows)
    console.log('finished')
}

const mapListingToInternalSearch = async (fileName) => {
    await cleanUp();
    const {rows: mainRows} = await readXlsxFile(`listing/${fileName}`, {
        map: listingMap,
    });
    const results = mainRows.map(row => ({
        areaLP: row.areaLp,
        areaLV: row.areaLv,
        sku: row.sku,
        propertyType: row.propertyType,
        postType: row.postType,
        postFrom: row.postFrom,
        titleEN: row.titleEN,
        price: row.price,
        areaSize: row.areaSize,
        floor: row.floor,
        bedroom: row.room,
        bathroom: row.bathroom,
        petAllowed: row.pet_allowed,
        facingDirection: row.facingDirection,
        unitNumber: row.unitNumber,
        buildingYear: row.buildingYear,
        email: row.email,
        lineID: row.lineId,
        tel: row.tel?.replaceAll('+', ''),
        name: row.name,
        whatsapp: row.whatsapp?.replaceAll('+', ''),
        facebookMessenger: row.facebookMessenger,
        wechat: row.wechat,
        externalDataSource: row.externalDataSource,
        listedOn: row.listedOn,
        availability: row.availability,
        comment: row.comment,
        updateAvailability: ' ',
        exclusive: '',
        psCode: row.psCode
    }));
    await generateInternalExcel(results)
    console.log('finished')
}

module.exports = {
    generateExcel,
    generateReportExcel,
    getDataFromExcelV1,
    getDataFromExcelV2,
    fillMissingData,
    combineListAndCheckDuplicate,
    filterNotDuplicateLists,
    mapAreaFromListing,
    mapAreaLV,
    mapDescription,
    generateLpCode,
    separateImagesFromListing,
    mapProjectIdAndZoneIdFromListing,
    checkDuplicateFromListing,
    generateDataExcel,
    getListingGroupsByTitleEN,
    mapFeedbackChecked,
    generateNewNameAndDescription,
    mapListingToInternalSearch
}
