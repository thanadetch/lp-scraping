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

module.exports = {
    propertyTypeMapper,
    petAllowedMapper,
    listingOwnerMapper,
    listingTypeMapper
}

