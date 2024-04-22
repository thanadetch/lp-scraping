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
    zoneIdMapper, thaiAreaMapper
} = require("../constants/mapper");
const {logDetail} = require("./environmentUtils");
const {defaultListing} = require("../constants/listing");
const {getProjectFromNameEn, getProjectTitle} = require("./projectUtils");
const {getZoneList} = require("./zoneUtils");
const {separateThaiAndEnglish} = require("./separateThaiAndEnglish");

const getAvailabilityAndComment = (availabilityValue) => {
    let availability = ''
    let comment = ''
    if (availabilityValue?.includes('Available')) {
        availability = 'Available'
    } else if (availabilityValue?.includes('No Information')) {
        availability = 'Cannot contact'
    } else if (availabilityValue) {
        availability = 'Not Available'
        comment = availabilityValue
    }
    return {
        availability,
        comment
    }
}

const propertyMapper = async ($, property) => {
    const listingType = getTextFromChoicesMapperObject($, choices.listingType, listingTypeMapper);
    if (logDetail) console.log('Listing Type:', listingType)

    const propertyType = getTextFromTestId($, 'propertyType');
    if (logDetail) console.log('propertyType:', propertyType)

    const buildingType = mapperObject(propertyType, propertyTypeMapper)
    if (logDetail) console.log('buildingType:', buildingType)

    const projectName = getTextFromTestId($, 'projectName')
    const separatedProjectName = separateThaiAndEnglish(projectName)
    if (logDetail) console.log('projectName:', projectName)

    const datasource = getTextFromInput($, 'datasource')
    if (logDetail) console.log('datasource:', datasource)

    let monthlyPriceMinMonths = '';
    const months = [12, 6, 3, 1];
    for (let i = 0; i < months.length; i++) {
        const month = months[i];
        const monthValue = getTextFromInputNumber($, `monthlyPriceMin${month}Month${month > 1 ? 's' : ''}`)
        if (monthValue) {
            monthlyPriceMinMonths = monthValue
            break;
        }
    }
    if (logDetail) console.log('monthlyPriceMinMonths:', monthlyPriceMinMonths)


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

    const {
        projectId,
        zoneId: projectZoneId,
        areaLp
    } = await getProjectFromNameEn(separatedProjectName.english, buildingType);
    if (logDetail) console.log('projectId:', projectId)

    const zoneId = projectZoneId || mapperObject(property.area, zoneIdMapper)
    if (logDetail) console.log('zoneId:', zoneId)

    let area = ''
    if (zoneId) {
        const zoneList = await getZoneList()
        const zoneArea = zoneList.find(z => z.zoneId?.toString() === zoneId?.toString())
        area = zoneArea ? zoneArea.zoneNameEng : ''
    } else {
        area = ''
    }
    if (logDetail) console.log('area:', area)

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
        sku: property?.lpCode || '',
        building_type: buildingType,
        postType: listingType,
        postFrom: listingOwner,
        zoneId: zoneId,
        projectId: projectId,
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
        feedbackChecked: property?.feedbackChecked || '',
        listedOn: property?.listedOn || '',
        buildingYear: property?.buildingYear?.toString() || '',
        ...getAvailabilityAndComment(property?.availability || ''),
        psCode: property?.psCode ? ('' + property.psCode) : '',
        areaLp: areaLp || property.area,
        areaLv: area,
        avlChecked: property?.avlChecked || ''
    };
    const projectTitleRent = getProjectTitle(property, projectName, buildingType, 'Rent')
    const projectTitleSell = getProjectTitle(property, projectName, buildingType, 'Sell')

    if (listingType === 'buy/sell') {
        const resultRent = {
            ...result,
            postType: 'Rent',
            price: monthlyPriceMinMonths,
            titleTH: projectTitleRent.thai,
            titleEN: projectTitleRent.english
        }
        const resultSell = {
            ...result,
            postType: 'Sell',
            price: salePrice,
            titleTH: projectTitleSell.thai,
            titleEN: projectTitleSell.english
        }
        return [resultRent, resultSell]
    } else if (listingType === 'Rent') {
        result.price = monthlyPriceMinMonths;
        result.titleTH = projectTitleRent.thai
        result.titleEN = projectTitleRent.english
        return [result]
    } else if (listingType === 'Sell') {
        result.price = salePrice;
        result.titleTH = projectTitleSell.thai
        result.titleEN = projectTitleSell.english
        return [result]
    } else {
        return [defaultListing]
    }
}

const sortObjKeys = (unordered) => {
    return Object.keys(unordered).sort().reduce(
        (obj, key) => {
            obj[key] = unordered[key];
            return obj;
        },
        {}
    );
}

module.exports = {
    propertyMapper,
    sortObjKeys
}
