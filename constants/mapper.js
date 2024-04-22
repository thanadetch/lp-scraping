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
    ['landlord']: 'Owner',
    ['Agent']: 'Agent',
    ['agent']: 'Agent',
}

const listingTypeMapper = {
    ['Rent']: 'Rent',
    ['Sell']: 'Sell',
    ['Rent/Sell']: 'buy/sell',
}

const listingTypeThaiMapper = {
    ['Rent']: 'เช่า',
    ['Sell']: 'ขาย',
}

const propertyTypeThaiMapper = {
    ['Condo']: 'คอนโดมิเนียม',
    ['Home']: 'บ้าน',
    ['Hotel_apartment']: 'อพาร์ทเม้นท์',
    ['Townhome']: 'ทาวน์เฮ้าส์',
    ['Land']: 'ที่ดิน',
    ['Commercial']: 'พื้นที่สำนักงาน'
}

const zoneIdMapper = {
    ['Ari']: 8,
    ['Asoke']: 18,
    ['Bang Chak']: 19,
    ['Bang Na']: 20,
    ['Bearing']: 20,
    ['Saphan Taksin']: 26,
    ['Chatuchak']: 9,
    ['Chit Lom']: 6,
    ['Chong Nonsi']: 24,
    ['Huai Khwang']: 13,
    ['Krung Thon Buri']: 26,
    ['Lat Phrao']: 10,
    ['Lumphini']: 6,
    ['Mo Chit']: 9,
    ['Nana']: 17,
    ['National Stadium']: 5,
    ['On Nut']: 19,
    ['Phaya Thai']: 7,
    ['Phloen Chit']: 6,
    ['Phra Khanong']: 19,
    ['Phra Ram 9']: 14,
    ['Phrom Phong']: 18,
    ['Punnawithi']: 19,
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
    ['Onnut/Phrakanong']: 19,
    ['Queen Sirikit']: 23,
    ['Ramkhamhaeng']: 31,
    ['Ratchadamri']: 6,
    ['Ratchadaphisek']: 13,
    ['Ratchaprarob']: 7,
    ['Ratchaprarop']: 7,
    ['Ratchathewi']: 7,
    ['Saint Louis']: 24,
    ['Sala Daeng']: 22,
    ['SalaDaeng']: 22,
    ['Sam Yan']: 5,
    ['Sanam Pao']: 8,
    ['Saphan Khwai']: 9,
    ['Silom']: 22,
    ['Surasak']: 24,
    ['Sutthisan']: 13,
    ['Tao Poon']: 39,
    ['Thailand Cultural Centre']: 13,
    ['Thong Lor']: 18,
    ['Udom Suk']: 19,
    ['Victory Monument']: 8,
    ['Wong Sawang']: 39,
    ['Wongwian Yai']: 26
}

const thaiAreaMapper = {
    ['Ari']: 'อารีย์',
    ['Asoke']: 'อโศก',
    ['Bang Chak']: 'บางจาก',
    ['Bang Na']: 'บางนา',
    ['Bearing']: 'แบริ่ง',
    ['Saphan Taksin']: 'สะพานตากสิน',
    ['Chatuchak']: 'จตุจักร',
    ['Chit Lom']: 'ชิดลม',
    ['Chong Nonsi']: 'ช่องนนทรี',
    ['Huai Khwang']: 'ห้วยขวาง',
    ['Krung Thon Buri']: 'กรุงธนบุรี',
    ['Lat Phrao']: 'ลาดพร้าว',
    ['Lumphini']: 'ลุมพินี',
    ['Mo Chit']: 'หมอชิต',
    ['Nana']: 'นานา',
    ['National Stadium']: 'สนามกีฬาแห่งชาติ',
    ['On Nut']: 'อ่อนนุช',
    ['Phaya Thai']: 'พญาไท',
    ['Phloen Chit']: 'เพลินจิต',
    ['Phra Khanong']: 'พระโขนง',
    ['Phra Ram 9']: 'พระราม 9',
    ['Phrom Phong']: 'พร้อมพงษ์',
    ['Punnawithi']: 'ปุณณวิถี',
    ['Phromphong']: 'พร้อมพงษ์', // Duplicate entry, you may want to remove one of them
    ['Thonglor']: 'ทองหล่อ',
    ['Ekkamai']: 'เอกมัย',
    ['Huaikwang']: 'ห้วยขวาง', // Duplicate entry, you may want to remove one of them
    ['Rama9']: 'พระราม 9', // Duplicate entry, you may want to remove one of them
    ['Ploenchit']: 'เพลินจิต', // Duplicate entry, you may want to remove one of them
    ['Ratchada']: 'รัชดา',
    ['Samyan']: 'สามย่าน',
    ['Silom/Saladaeng']: 'สีลม/ศาลาแดง',
    ['Chongnonsri/Sathorn']: 'ช่องนนทรี/สาทร',
    ['Krungthonburi']: 'กรุงธนบุรี',
    ['Onnut/Phrakanong']: 'อ่อนนุช/พระโขนง',
    ['Queen Sirikit']: 'ศูนย์ประชุมแห่งชาติสิริกิติ์',
    ['Ramkhamhaeng']: 'รามคำแหง',
    ['Ratchadamri']: 'ราชดำริ',
    ['Ratchadaphisek']: 'รัชดาภิเษก',
    ['Ratchaprarob']: 'ราชปรารภ',
    ['Ratchaprarop']: 'ราชปรารภ',
    ['Ratchathewi']: 'ราชเทวี',
    ['Saint Louis']: 'เซนต์หลุยส์',
    ['Sala Daeng']: 'ศาลาแดง',
    ['SalaDaeng']: 'ศาลาแดง', // Duplicate entry, you may want to remove one of them
    ['Sam Yan']: 'สามย่าน',
    ['Sanam Pao']: 'สนามเป้า',
    ['Saphan Khwai']: 'สะพานควาย',
    ['Silom']: 'สีลม',
    ['Surasak']: 'สุรศักดิ์',
    ['Sutthisan']: 'สุทธิสาร',
    ['Tao Poon']: 'เตาปูน',
    ['Thailand Cultural Centre']: 'ศูนย์วัฒนธรรมแห่งประเทศไทย',
    ['Thong Lor']: 'ทองหล่อ',
    ['Udom Suk']: 'อุดมสุข',
    ['Victory Monument']: 'อนุสาวรีย์ชัย',
    ['Wong Sawang']: 'วงศ์สว่าง',
    ['Wongwian Yai']: 'วงเวียนใหญ่',
    'Asoke/Nana': 'อโศก/นานา',
    Bangna: 'บางนา',
    'Hua Mak': 'หัวหมาก',
    'Khlong Toei': 'คลองเตย',
    Ladprao: 'ลาดพร้าว',
    Makkasan: 'มักกะสัน',
    Petchaburi: 'เพชรบุรี',
    Phetchaburi: 'เพชรบุรี',
    'Rama3 (Riverside)': 'พระราม 3',
    Ratchadapisek: 'รัชดาภิเษก',
    Ratchayothin: 'รัชโยธิน',
    Samrong: 'สำโรง',
    'Sapan Taksin': 'สะพานตากสิน',
    Sathorn: 'สาธร',
    Sirindhorn: 'สิรินธร',
    Suanluang: 'สวนหลวง',
    Sukhumvit: 'สุขุมวิท',
    'Ha Yaek Lat Phrao': 'ห้าแยกลาดพร้าว',
    'Lad Prao': 'ลาดพร้าว',
    'Phahon Yothin': 'พหลโยธิน',
    Phrakhanong: 'พระโขนง',
    'Huai kwang': 'หัวหมาก',
    Onnut: 'อ่อนนุช',
    Sapankwai: 'สะพานควาย',
    Udomsuk: 'อุดมสุข'
};

const listingMap = {
    'Action': 'action',
    'SKU': 'sku',
    'building_type': 'building_type',
    'PostType': 'postType',
    'PostFrom': 'postFrom',
    'ostAcceptAgent': 'ostAcceptAgent',
    'Zone ID': 'zoneId',
    'Project ID': 'projectId',
    'Title TH': 'titleTH',
    'Content TH': 'contentTH',
    'Title EN': 'titleEN',
    'Content EN': 'contentEN',
    'Price': 'price',
    'AreaSize': 'areaSize',
    'Area_rai': 'area_rai',
    'Area_ngan': 'area_ngan',
    'Area_wa': 'area_wa',
    'Floor': 'floor',
    'Room': 'room',
    'Bathroom': 'bathroom',
    'pet_allowed': 'pet_allowed',
    'fq': 'fq',
    'youtube': 'youtube',
    'latitude': 'latitude',
    'longitude': 'longitude',
    'Picture1': 'picture1',
    'Picture2': 'picture2',
    'Picture3': 'picture3',
    'Picture4': 'picture4',
    'Picture5': 'picture5',
    'Picture6': 'picture6',
    'Picture7': 'picture7',
    'Picture8': 'picture8',
    'Picture9': 'picture9',
    'Picture10': 'picture10',
    'Picture11': 'picture11',
    'Picture12': 'picture12',
    'Useful space': 'usefulSpace',
    'Income Avg./Year': 'incomeAvgPerYear',
    'Email': 'email',
    'Line ID': 'lineId',
    'Tel.': 'tel',
    'Name': 'name',
    'Whatsapp': 'whatsapp',
    'Facebook Messenger': 'facebookMessenger',
    'Wechat': 'wechat',
    'External Data Source': 'externalDataSource',
    'Facing direction': 'facingDirection',
    'Unit Number': 'unitNumber',
    'Property Type': 'propertyType',
    'Feedback Checked': 'feedbackChecked',
    'Listed On': 'listedOn',
    'Building year': 'buildingYear',
    'Availability': 'availability',
    'Comment': 'comment',
    'PS Code': 'psCode',
    'Area LP': 'areaLp',
    'Area LV': 'areaLv',
    'Avl. checked': 'avlChecked'
}

const areaLpCodeMapper = {
    "Ari": "AR",
    "Asoke": "SUA",
    "Bang Chak": "ONB",
    "Bang Na": "ONB",
    "Bangna": "ONB",
    "Bearing": "ONB",
    "Chatuchak": "JJ",
    "Chit Lom": "PL",
    "Chong Nonsi": "CHC",
    "Ekkamai": "SUE",
    "Ha Yaek Lat Phrao": "LA",
    "Hua Mak": "RM",
    "Huai Khwang": "HU",
    "Huai kwang": "HU",
    "Huaikwang": "HU",
    "Khlong Toei": "KT",
    "Krung Thon Buri": "CHK",
    "Lad Prao": "LA",
    "Ladprao": "LA",
    "Lat Phrao": "LA",
    "Lumphini": "PL",
    "Makkasan": "RA",
    "Mo Chit": "JJ",
    "Nana": "SUN",
    "National Stadium": "CUS",
    "On Nut": "ON",
    "Onnut": "ON",
    "Onnut/Phrakanong": "ON",
    "Petchaburi": "RA",
    "Phahon Yothin": "LA",
    "Phaya Thai": "PH",
    "Phetchaburi": "RA",
    "Phloen Chit": "PL",
    "Phra Khanong": "ON",
    "Phra Ram 9": "RA",
    "Phrakhanong": "ON",
    "Phrom Phong": "SUP",
    "Phromphong": "SUP",
    "Ploenchit": "PL",
    "Punnawithi": "ON",
    "Queen Sirikit": "KT",
    "Rama3 (Riverside)": "RN",
    "Ramkhamhaeng": "RM",
    "Ratchadamri": "PL",
    "Ratchadaphisek": "HUR",
    "Ratchadapisek": "HUR",
    "Ratchaprarop": "PH",
    "Ratchathewi": "PH",
    "Ratchayothin": "KA",
    "Saint Louis": "CHC",
    "Sala Daeng": "SI",
    "Sam Yan": "CUS",
    "Samrong": "ON",
    "Sanam Pao": "AR",
    "Sapan Taksin": "CHC",
    "Sapankwai": "JJ",
    "Saphan Khwai": "JJ",
    "Saphan Taksin": "CHC",
    "Sathorn": "CHC",
    "Silom": "SI",
    "Sirindhorn": "PN",
    "Suanluang": "SR",
    "Sukhumvit": "SUA",
    "Surasak": "CHC",
    "Sutthisan": "HU",
    "Thailand Cultural Centre": "HU",
    "Thong Lor": "SUT",
    "Thonglor": "SUT",
    "Udom Suk": "ON",
    "Udomsuk": "ON",
    "Victory Monument": "AR",
    "Wong Sawang": "BA",
    "Wongwian Yai": "CHC"
}



const lpCodeMapper = {
    Code: 'code',
    Count: 'count'
}

// TH
const thRentCondoSuffix = [
    'พร้อมเข้าอยู่ ด่วน!',
    'นัดชมได้เลยวันนี้',
    'ดีลดี ราคาพิเศษสุดๆ',
    'ทำเลดีมาก ห้องพร้อมอยู่',
    'คอนโดห้องสวย ราคาดี',
    'พร้อมเข้าอยู่ทันที นัดดูห้องได้เลย',
    'คอนโดอยู่สบาย',
    'คอนโดพร้อมเข้าอยู่',
    'ห้องสวย ราคาพิเศษ',
    'ห้องนี้ดี อยู่แล้วรวย',
    'คอนโดสวย ส่วนกลางดี',
    'คอนโดดี ทำเลได้ ส่วนกลางจัดเต็ม',
    'ห้องเช่า ทำเลดี พร้อมเข้าอยู่ ด่วน!',
    'คอนโดให้เช่า ติดต่อขอชมห้องวันนี้',
    'คอนโดให้เช่า ติดต่อเราเลย!',
    'คอนโดให้เช่า ติดต่อเพื่อขอชมห้องได้ วันนี้'
]
const thSellCondoSuffix = [
    'ขายคอนโด ด่วน!',
    'คอนโดน่าลงทุน',
    'คอนโดสวย ส่วนกลางดี',
    'คอนโดทำเลที่ใช่',
    'คอนโดน่าซื้อ',
    'ห้องสวย น่าลงทุน',
    'ซื้ออยู่เอง หรือปล่อยเช่าก็เฮง!',
    'ดีลดีอยู่ไม่นาน ติดต่อเราเลยวันนี้!',
    'นัดชมได้เลยวันนี้',
    'ดีลดี ราคาพิเศษสุดๆ',
    'ทำเลดีมาก ห้องพร้อมอยู่',
    'คอนโดห้องสวย ราคาดี',
    'พร้อมเข้าอยู่ทันที นัดดูห้องได้เลย',
    'ขายคอนโด ด่วน นัดดูห้องได้เลย วันนี้',
]
const thRentHomeSuffix = [
    'บ้านนี้ดี อยู่แล้วรวย',
    'บ้านสวย น่าอยู่มาก',
    'บ้านสวย ทำเลดี',
    'บ้านให้เช่า พร้อมเข้าอยู่ ด่วน!',
]
const thSellHomeSuffix = [
    'บ้านนี้ดี อยู่แล้วรวย',
    'บ้านสวย น่าลงทุน',
    'บ้านสวย ทำเลดี',
    'ขายบ้าน ทำเลดี',
    'ขายบ้าน พร้อมเข้าอยู่ ด่วน!'
]
const thRentLandSuffix = [
    'ที่ดินทำเลดี แปลงสวยมาก พร้อมเช่า!',
    'ที่ดินน่าลงทุน ด่วน!',
    'ที่ดินแปลงสวย ทำเลดี',
]
const thSellLandSuffix = [
    'ที่ดินทำเลดี แปลงสวยมาก ขาย ด่วน!',
    'ที่ดินน่าลงทุน ขายด่วน!',
    'ที่ดินแปลงสวย ทำเลดี',
]
const thRentCommercialSuffix = [
    'พื้นที่ให้เช่า ด่วน! ทำเลดี',
    'พร้อมเข้าชม วันนี้',
    'พร้อมให้เช่า',
]
const thSellCommercialSuffix = [
    'พื้นที่พร้อมขาย ด่วน! ทำเลดี',
    'พร้อมเข้าชม วันนี้',
    'พร้อมขาย'
];

// EN
const enRentCondoSuffix = [
    'Ready to move in, urgent!',
    'Schedule a viewing today',
    'Good deal, Special price',
    'Great location, Ready to move in',
    'Beautiful condo, attractive price, Rent condo here',
    'Ready to move in immediately, schedule a viewing now',
    'Comfortable condo for rent',
    'Ready-to-move-in condo',
    'Beautiful room, special price',
    'This room is good, living here brings prosperity',
    'Beautiful condo, excellent common area',
    'Good condo, great location, fully equipped common area',
    'Room for rent, great location, ready to move in, urgent!',
    'Condo for rent, contact us to schedule a viewing today',
    'Condo for rent, contact us now!',
    'Condo for rent, contact us to schedule a viewing today'
];
const enSellCondoSuffix = [
    'Urgent condo for sale!',
    'Condo investment opportunity',
    'Beautiful condo, excellent common area',
    'Condo with Right location Right price',
    'Condo worth buying',
    'Beautiful room, worth the investment',
    'Buy for yourself or rent it out, both are great!',
    'Good deal, won\'t last long, contact us today!',
    'Schedule a viewing today',
    'Good deal, special price',
    'Great location, Ready to move in unit',
    'Beautiful condo, attractive price',
    'Ready to move in immediately, schedule a viewing now',
    'Urgent condo sale, schedule a viewing today!'
];
const enRentHomeSuffix = [
    'Great house, living here brings prosperity',
    'Beautiful house, very livable',
    'Beautiful house, great location',
    'House for rent, ready to move in, urgent!'
];
const enSellHomeSuffix = [
    'Very lively house, living here brings prosperity',
    'Beautiful house, worth the investment',
    'Beautiful house, great location',
    'House for sale, great location',
    'House for sale, ready to move in, urgent!'
];
const enRentLandSuffix = [
    'Good location, beautiful plot, ready for rent!',
    'Profitable land, ready to book, urgent!',
    'Beautifully landscaped land, good location'
];
const enSellLandSuffix = [
    'Good location land, beautiful plot, for sale, urgent!',
    'Profitable land for Sale, urgent!',
    'Beautifully landscaped land, good location'
];
const enRentCommercialSuffix = [
    'Space for rent, urgent! Good location',
    'Ready to visit today',
    'Ready for rent, Commercial place',
    'Very lively place, living here brings prosperity'
];
const enSellCommercialSuffix = [
    'Space ready for sale, urgent! Good location',
    'Ready to visit today',
    'Ready for sale, Commercial place',
    'Very lively place, living here brings prosperity'
];

const suffixMapper = {
    TH: {
        Rent: {
            Condo: thRentCondoSuffix,
            Hotel_apartment: thRentCondoSuffix,
            Home: thRentHomeSuffix,
            Townhome: thRentHomeSuffix,
            Land: thRentLandSuffix,
            Commercial: thRentCommercialSuffix
        },
        Sell: {
            Condo: thSellCondoSuffix,
            Hotel_apartment: thSellCondoSuffix,
            Home: thSellHomeSuffix,
            Townhome: thSellHomeSuffix,
            Land: thSellLandSuffix,
            Commercial: thSellCommercialSuffix
        }
    },
    EN: {
        Rent: {
            Condo: enRentCondoSuffix,
            Hotel_apartment: enRentCondoSuffix,
            Home: enRentHomeSuffix,
            Townhome: enRentHomeSuffix,
            Land: enRentLandSuffix,
            Commercial: enRentCommercialSuffix
        },
        Sell: {
            Condo: enSellCondoSuffix,
            Hotel_apartment: enSellCondoSuffix,
            Home: enSellHomeSuffix,
            Townhome: enSellHomeSuffix,
            Land: enSellLandSuffix,
            Commercial: enSellCommercialSuffix
        }
    },
}


module.exports = {
    propertyTypeMapper,
    petAllowedMapper,
    listingOwnerMapper,
    listingTypeMapper,
    zoneIdMapper,
    listingMap,
    thaiAreaMapper,
    listingTypeThaiMapper,
    propertyTypeThaiMapper,
    areaLpCodeMapper,
    lpCodeMapper,
    suffixMapper
}

