const propertyTypeMapper = {
    ['Condo']: 'Condo',
    ['Apartment']: 'Condo',
    ['Semi-detached House']: 'Home',
    ['House']: 'Home',
    ['Serviced Apartment']: 'Hotel_apartment',
    ['Townhouse']: 'Townhome',
    ['Villa']: 'Home',
    ['Penthouse']: 'Condo',
    ['Duplex']: 'Condo',
    ['Land']: 'Land',
    ['Commercial']: 'Commercial'
}

const petAllowedMapper = {
    ['Small Pet Allowed']: 'Allow',
    ['Medium Pet Allowed']: 'Allow',
    ['Not Allowed']: '',
}

const listingOwnerMapper = {
    ['Landlord']: 'Owner',
    ['Agent']: 'Agent',
}

const listingTypeMapper = {
    ['Rent']: 'Rent',
    ['Sell']: 'Sell',
    ['Rent/Sell']: 'buy/sell',
}

const zoneIdMapper = {
    ['Asoke']: 18,
    ['Phromphong']: 18,
    ['Thonglor']: 18,
    ['Ekkamai']: 18,
    ['Huaikwang']: 13,
    ['Rama9']: 14,
    ['Ploenchit']: 6,
    ['Ratchada']: 13,
    ['Samyan']: 5,
    ['Silom/Saladaeng']: 22,
    ['Chongnonsri/Sathorn']: 24,
    ['Krungthonburi']: 26,
    ['Onnut/Phrakanong']: 19
}

module.exports = {
    propertyTypeMapper,
    petAllowedMapper,
    listingOwnerMapper,
    listingTypeMapper,
    zoneIdMapper
}

