const {getProjectCondoList, getProjectHouseList, getProject} = require("./excelUtils");
const {
    getTextFromChoicesMapperObject,
    getTextFromTestId,
    mapperObject,
    getTextFromInput,
    getTextFromInputNumber,
    getTextFromChoices,
    getTextFromMultiple
} = require("./elementUtils");
const {choices} = require("../constants/choices");
const {
    listingTypeMapper,
    propertyTypeMapper,
    petAllowedMapper,
    listingOwnerMapper,
    zoneIdMapper
} = require("../constants/mapper");
const {logDetail} = require("./environmentUtils");
const {defaultListing} = require("../constants/listing");

const propertyMapper = async ($, property) => {
    const listingType = getTextFromChoicesMapperObject($, choices.listingType, listingTypeMapper);
    if (logDetail) console.log('Listing Type:', listingType)

    const propertyType = getTextFromTestId($, 'propertyType');
    if (logDetail) console.log('propertyType:', propertyType)

    const buildingType = mapperObject(propertyType, propertyTypeMapper)
    if (logDetail) console.log('buildingType:', buildingType)

    const projectName = getTextFromTestId($, 'projectName')
    const title = separateThaiAndEnglish(projectName)
    if (logDetail) console.log('projectName:', projectName)

    const datasource = getTextFromInput($, 'datasource')
    if (logDetail) console.log('datasource:', datasource)

    const monthlyPriceMin12Months = getTextFromInputNumber($, 'monthlyPriceMin12Months')
    if (logDetail) console.log('monthlyPriceMin12Months:', monthlyPriceMin12Months)

    const salePrice = getTextFromInputNumber($, 'salePrice')
    if (logDetail) console.log('salePrice:', salePrice)

    const numberBedroomsRaw = getTextFromTestId($, 'numberBedrooms')

    const numberBedroomsRawNumber = +(numberBedroomsRaw?.split(' ')[0])
    let numberBedrooms;
    if (isNaN(numberBedroomsRawNumber)) {
        numberBedrooms = numberBedroomsRaw === 'Number of Bedrooms' ? '' : numberBedroomsRaw;
    } else {
        numberBedrooms = '' + numberBedroomsRawNumber;
    }
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

    let listingOwner
    if (property.postBy) {
        listingOwner = mapperObject(property.postBy, listingOwnerMapper)
    } else {
        listingOwner = getTextFromChoicesMapperObject($, choices.ownerType, listingOwnerMapper);
    }
    if (logDetail) console.log('listingOwner:', listingOwner)

    const {projectId, zoneId: projectZoneId} = await getProject(property, buildingType);
    if (logDetail) console.log('projectId:', projectId)

    const zoneId = projectZoneId || mapperObject(property.area, zoneIdMapper)
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
        projectId: projectId,
        titleTH: title.thai,
        titleEN: title.english,
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
        availability: property?.availability || '',
        psCode: property?.psCode ? ('' + property.psCode) : '',
        area: property?.area || ''
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

function separateThaiAndEnglish(input) {
    const thaiRegex = /[\u0E00-\u0E7F]+/g;
    const englishRegex = /[a-zA-Z]+/g;

    if (englishRegex.test(input) && thaiRegex.test(input)) {
        const splitInput = input.split(' ')
        let thWords = []
        let enWords = []

        if (Number.isInteger(Number(splitInput[0]))) {
            const firstNumber = splitInput[0]
            enWords.push(splitInput[0])
            for (let i = 1; i < splitInput.length; i++) {
                if (splitInput[i] === firstNumber) {
                    thWords = splitInput.slice(i, splitInput.length)
                    break;
                } else {
                    enWords.push(splitInput[i])
                }
            }
        } else if (splitInput[0].match(englishRegex)) {
            for (let i = 0; i < splitInput.length; i++) {
                if (splitInput[i].match(thaiRegex)) {
                    thWords = splitInput.slice(i, splitInput.length)
                    break;
                } else {
                    enWords.push(splitInput[i])
                }
            }
        }

        return {
            thai: thWords.join(' ').trim(),
            english: enWords.join(' ').trim()
        };
    }

    return {
        thai: input,
        english: input
    }
}


const isDuplicate = (properties, reports, property) => {
    const checkDuplicate = (list) => !!list.find(p => p.psCode === property.psCode)
    return checkDuplicate(properties) || checkDuplicate(reports)
}


module.exports = {
    propertyMapper,
    isDuplicate,
    separateThaiAndEnglish
}
