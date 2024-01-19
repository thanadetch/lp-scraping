require('dotenv').config()
const cheerio = require('cheerio');
const fs = require("fs");
const {
    getTextFromChoicesMapperObject,
    getTextFromTestIdMapperObject,
    getTextFromTestId,
    getTextFromInput,
    getTextFromInputNumber,
    getTextFromChoices,
    getTextFromMultiple
} = require("./utils/elementUtils");
const {petAllowedMapper, listingOwnerMapper, propertyTypeMapper, listingTypeMapper} = require("./constants/mapper");
const {choices} = require("./constants/choices");
const {cleanUp, scrapeImages, signIn, getPageData} = require("./utils/scaperUtils");
const {generateExcel, getDataFromExcel} = require("./utils/excelUtils");
const {defaultListing} = require("./constants/listing");

function propertyMapper($, property) {
    const listingType = getTextFromChoicesMapperObject($, choices.listingType, listingTypeMapper);
    console.log('Listing Type:', listingType)

    const propertyType = getTextFromTestIdMapperObject($, 'propertyType', propertyTypeMapper)
    console.log('propertyType:', propertyType)

    const projectName = getTextFromTestId($, 'projectName')
    console.log('projectName:', projectName)

    const datasource = getTextFromInput($, 'datasource')
    console.log('datasource:', datasource)

    const monthlyPriceMin12Months = getTextFromInputNumber($, 'monthlyPriceMin12Months')
    console.log('monthlyPriceMin12Months:', monthlyPriceMin12Months)

    const salePrice = getTextFromInputNumber($, 'salePrice')
    console.log('salePrice:', salePrice)

    const numberBedrooms = +(getTextFromTestId($, 'numberBedrooms')?.split(' ')[0])
    console.log('numberBedrooms:', numberBedrooms)

    const floorSize = getTextFromInputNumber($, 'floorSize')
    console.log('floorSize:', floorSize)

    const unitNumber = getTextFromInput($, 'propertyUnitNumber')
    console.log('unitNumber:', unitNumber)

    const floorLevel = getTextFromInputNumber($, 'floorLevel')
    console.log('floorLevel:', floorLevel)

    const petAllow = getTextFromChoicesMapperObject($, choices.pet, petAllowedMapper);
    console.log('pet:', petAllow)

    const direction = getTextFromChoices($, choices.direction);
    console.log('direction:', direction)

    const listingOwner = getTextFromChoicesMapperObject($, choices.ownerType, listingOwnerMapper);
    console.log('listingOwner:', listingOwner)

    const name = getTextFromMultiple($, 'name')
    console.log('name:', name)

    const phone = getTextFromMultiple($, 'phone')
    console.log('phone:', phone)

    const whatsapp = getTextFromMultiple($, 'whatsapp')
    console.log('whatsapp:', phone)

    const line = getTextFromMultiple($, 'line')
    console.log('line:', line)

    const email = getTextFromMultiple($, 'email')
    console.log('email:', email)

    const fbmessenger = getTextFromMultiple($, 'fbmessenger')
    console.log('fbmessenger:', fbmessenger)

    const wechat = getTextFromMultiple($, 'wechat')
    console.log('wechat:', wechat)

    const result = {
        ...defaultListing,
        action: 'New',
        sku: property.lpCode,
        building_type: propertyType,
        postType: listingType,
        postFrom: listingOwner,
        zoneId: property.area,
        titleTH: projectName,
        titleEN: projectName,
        areaSize: floorSize,
        floor: floorLevel,
        room: numberBedrooms,
        bathroom: numberBedrooms,
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

async function loadPage(isMock, page, property) {
    if (isMock) {
        return cheerio.load(fs.readFileSync('test.html'));
    } else {
        const pageData = await getPageData(page, property.psCode);
        return cheerio.load(pageData);
    }
}

const scrapeWebPage = async ({isMock = false}) => {
    await cleanUp();
    const data = []
    const {page, browser} = isMock ? {} : await signIn();
    const properties = await getDataFromExcel()
    for (const property of properties) {
        if (property.psCode) {
            let $;
            $ = await loadPage(isMock, page, property);
            const properties = propertyMapper($, property);
            data.push(...properties)
            if (!!properties[0].postType) await scrapeImages($, property);
            console.log('===================================================')
        } else {
            data.push(defaultListing)
        }
    }

    await generateExcel(data)

    //closing the browser
    if (!isMock) await browser.close();
    console.log('finished')
};

scrapeWebPage({isMock: true});
