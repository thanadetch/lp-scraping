require('dotenv').config()
const {
    getTextFromChoicesMapperObject,
    getTextFromTestId,
    getTextFromInput,
    getTextFromInputNumber,
    getTextFromChoices,
    getTextFromMultiple, mapperObject
} = require("./utils/elementUtils");
const {
    petAllowedMapper,
    listingOwnerMapper,
    propertyTypeMapper,
    listingTypeMapper,
    zoneIdMapper
} = require("./constants/mapper");
const {choices} = require("./constants/choices");
const {cleanUp, scrapeImages, signIn, loadPage} = require("./utils/scaperUtils");
const {generateExcel, getDataFromExcelV1, getDataFromExcelV2, generateReportExcel} = require("./utils/excelUtils");
const {defaultListing} = require("./constants/listing");
const {logDetail} = require("./utils/environmentUtils");
const {logReport} = require("./utils/reportUtils");
const propertyMapper = ($, property) => {
    const listingType = getTextFromChoicesMapperObject($, choices.listingType, listingTypeMapper);
    if (logDetail) console.log('Listing Type:', listingType)

    const propertyType = getTextFromTestId($, 'propertyType');
    if (logDetail) console.log('propertyType:', propertyType)

    const buildingType = mapperObject(propertyType, propertyTypeMapper)
    if (logDetail) console.log('buildingType:', buildingType)

    const projectName = getTextFromTestId($, 'projectName')
    if (logDetail) console.log('projectName:', projectName)

    const datasource = getTextFromInput($, 'datasource')
    if (logDetail) console.log('datasource:', datasource)

    const monthlyPriceMin12Months = getTextFromInputNumber($, 'monthlyPriceMin12Months')
    if (logDetail) console.log('monthlyPriceMin12Months:', monthlyPriceMin12Months)

    const salePrice = getTextFromInputNumber($, 'salePrice')
    if (logDetail) console.log('salePrice:', salePrice)

    const numberBedroomsRaw = getTextFromTestId($, 'numberBedrooms')

    const numberBedroomsRawNumber = +(numberBedroomsRaw?.split(' ')[0])
    const numberBedrooms = isNaN(numberBedroomsRawNumber) ? numberBedroomsRaw : ('' + numberBedroomsRawNumber)
    if (logDetail) console.log('numberBedrooms:', numberBedrooms)

    const bathroomsCount = $(`#bathrooms_count input`).val()
    if (logDetail) console.log('bathroomsCount:', bathroomsCount)

    const floorSize = getTextFromInputNumber($, 'floorSize')
    if (logDetail) console.log('floorSize:', floorSize)

    const unitNumber = getTextFromInput($, 'propertyUnitNumber')
    if (logDetail) console.log('unitNumber:', unitNumber)

    const floorLevel = getTextFromInput($, 'floorLevel')
    if (logDetail) console.log('floorLevel:', floorLevel)

    const petAllow = getTextFromChoicesMapperObject($, choices.pet, petAllowedMapper);
    if (logDetail) console.log('pet:', petAllow)

    const direction = getTextFromChoices($, choices.direction);
    if (logDetail) console.log('direction:', direction)

    let listingOwner = ''
    if (property.postBy) {
        listingOwner = mapperObject(property.postBy, listingOwnerMapper)
    } else {
        listingOwner = getTextFromChoicesMapperObject($, choices.ownerType, listingOwnerMapper);
    }
    if (logDetail) console.log('listingOwner:', listingOwner)

    const zoneId = mapperObject(property.area, zoneIdMapper)
    if (logDetail) console.log('zoneId:', zoneId)

    const name = getTextFromMultiple($, 'name')
    if (logDetail) console.log('name:', name)

    const phone = getTextFromMultiple($, 'phone')
    if (logDetail) console.log('phone:', phone)

    const whatsapp = getTextFromMultiple($, 'whatsapp')
    if (logDetail) console.log('whatsapp:', phone)

    const line = getTextFromMultiple($, 'line')
    if (logDetail) console.log('line:', line)

    const email = getTextFromMultiple($, 'email')
    if (logDetail) console.log('email:', email)

    const fbmessenger = getTextFromMultiple($, 'fbmessenger')
    if (logDetail) console.log('fbmessenger:', fbmessenger)

    const wechat = getTextFromMultiple($, 'wechat')
    if (logDetail) console.log('wechat:', wechat)

    const result = {
        ...defaultListing,
        action: 'New',
        sku: property.lpCode,
        building_type: buildingType,
        postType: listingType,
        postFrom: listingOwner,
        zoneId: zoneId,
        titleTH: projectName,
        titleEN: projectName,
        areaSize: floorSize,
        floor: floorLevel,
        room: numberBedrooms,
        bathroom: bathroomsCount,
        pet_allowed: petAllow,
        usefulSpace: floorSize,
        email: email,
        lineId: line,
        tel: phone,
        name: name,
        whatsapp: whatsapp,
        facebookMessenger: fbmessenger,
        wechat: wechat,
        externalDataSource: datasource,
        facingDirection: direction,
        unitNumber: unitNumber,
        propertyType: propertyType,
        feedbackChecked: property?.feedBackChecked || '',
        listedOn: property?.listedOn || '',
        buildingYear: property?.buildingYear || '',
        availability: property?.availability || ''
    };
    if (listingType === 'buy/sell') {
        const resultRent = {...result, postType: 'Rent', price: monthlyPriceMin12Months}
        const resultSell = {...result, postType: 'Sell', price: salePrice}
        return [resultRent, resultSell]
    } else if (listingType === 'Rent') {
        result.price = monthlyPriceMin12Months;
        return [result]
    } else if (listingType === 'Sell') {
        result.price = salePrice;
        return [result]
    } else {
        return [defaultListing]
    }
}

const scrapeWebPage = async ({isMock = false, skipImage = false}) => {
    await cleanUp();
    const data = []
    const report = []
    const {page, browser} = isMock ? {} : await signIn();
    const propertiesV1 = await getDataFromExcelV1()
    const propertiesV2 = await getDataFromExcelV2()
    const length = propertiesV2.length;

    for (const property of propertiesV2) {
        const index = propertiesV2.indexOf(property);
        try {
            if (property.psCode) {
                const isDuplicated = !!propertiesV1.find(p => p.psCode === property.psCode)
                if (isDuplicated) {
                    logReport(report, index, property, length, 'DUPLICATED');
                    continue;
                }
                const $ = await loadPage(isMock, page, property);
                const propertyResults = propertyMapper($, property);
                data.push(...propertyResults)
                if (!!propertyResults[0].postType) {
                    if (!skipImage) await scrapeImages($, property);
                    logReport(report, index, property, length, 'SUCCESS');
                } else {
                    logReport(report, index, property, length, 'DATA NOT FOUND');
                }
            } else {
                data.push(defaultListing)
                logReport(report, index, property, length, 'SKIPPED');
            }
        } catch (e) {
            logReport(report, index, property, length, 'ERROR');
        } finally {
            if (logDetail) console.log('===================================================')
        }
    }

    await generateExcel(data)
    await generateReportExcel(report)

    //closing the browser
    if (!isMock) await browser.close();
    console.log('Finished')
};

scrapeWebPage({
    isMock: false,
    skipImage: false
});
