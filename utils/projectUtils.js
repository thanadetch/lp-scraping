const readXlsxFile = require("read-excel-file/node");
const {mapperObject} = require("./elementUtils");
const {thaiAreaMapper, listingMap} = require("../constants/mapper");
const {separateThaiAndEnglish} = require("./separateThaiAndEnglish");
const _ = require("lodash");
let projectCondoLists;
let projectHouseLists;

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

const projectMapper = {}
let oldListingGroups

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


const getProjectFromNameEn = async (projectNameEn, buildingType) => {
    if (!oldListingGroups) {
        oldListingGroups = await getListingGroupsByTitleEN([
            'Total Listing Lot1-9 Final with Description.xlsx',
        ])
    }

    const listings = oldListingGroups[projectNameEn]
    if (listings) {
        const projectIds = [...new Set(listings.map(listing => listing?.projectId?.toString()))].filter(value => value)
        const zoneIds = [...new Set(listings.map(listing => listing?.zoneId?.toString()))].filter(value => value)
        const areaLPs = [...new Set(listings.map(listing => listing?.areaLp))].filter(value => value !== '-')

        const projectId = projectIds.length > 0 ? ((projectIds.length > 1 ? '*' : '') + projectIds.join(', ')) : ''
        const zoneId = zoneIds.length > 0 ? ((zoneIds.length > 1 ? '*' : '') + zoneIds.join(', ')) : ''
        const areaLp = areaLPs.length > 0 ? ((areaLPs.length > 1 ? '*' : '') + areaLPs.join(', ')) : ''

        if (projectId && zoneId) {
            return {
                projectId: projectId,
                zoneId: zoneId,
                areaLp: areaLp
            }
        }
    }

    if (projectMapper[projectNameEn]) {
        return {
            projectId: projectMapper[projectNameEn].projectId,
            zoneId: projectMapper[projectNameEn].zoneId,
            areaLp: ''
        }
    }
    let projectCondoList;
    let projectHouseList;


    function findProjectId(list) {
        const replaceFilterWord = (word) => word?.replaceAll('Condominium', '')?.replaceAll('Condo', '')?.replaceAll('-', '').trim()?.toLowerCase();
        const filterCondo = list.find(p => replaceFilterWord(p.projectNameEN).includes(replaceFilterWord(projectNameEn)));

        if (filterCondo) {
            projectMapper[projectNameEn] = filterCondo;
        }

        return {
            projectId: filterCondo?.projectId,
            zoneId: filterCondo?.zoneId,
            areaLp: ''
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

const getProjectTitle = (property, projectName, buildingType, postType) => {
    let title = {thai: '', english: ''}
    if (projectName === 'Type Your Project Name') {
        const areaThai = mapperObject(property.area, thaiAreaMapper);
        const areaEng = property.area === '-' ? '' : property.area;
        const markThai = areaThai === '' ? '*' : ''
        const markEng = areaEng === '' ? '*' : ''
        const sellThai = postType === 'Sell' ? 'ขาย' : ''
        const rentThai = postType === 'Rent' ? 'ให้เช่า' : ''
        const postTypeEng = postType === 'Sell' ? 'Sale' : 'Rent'
        if (buildingType === 'Townhome') {
            title.thai = `${markThai}${sellThai}ทาวน์เฮ้าส์${rentThai} ใกล้ ${areaThai}`
            title.english = `${markEng}Townhouse for ${postTypeEng} near ${areaEng}`
        } else if (buildingType === 'Home') {
            title.thai = `${markThai}${sellThai}บ้าน${rentThai} ใกล้ ${areaThai}`
            title.english = `${markEng}House for ${postTypeEng} near ${areaEng}`
        } else if (buildingType === 'Commercial') {
            title.thai = `${markThai}${sellThai}สำนักงาน/พื้นที่${rentThai} ใกล้ ${areaThai}`
            title.english = `${markEng}Office/Commercial Space for ${postTypeEng} near ${areaEng}`
        } else if (buildingType === 'Land') {
            title.thai = `${markThai}${sellThai}ที่ดิน${rentThai} ใกล้ ${areaThai}`
            title.english = `${markEng}Land for ${postTypeEng} near ${areaEng}`
        } else {
            title.thai = property.name
            title.english = property.name
        }
    } else {
        title = separateThaiAndEnglish(projectName)
    }
    return title
}

module.exports = {
    getProjectFromNameEn,
    getProjectTitle
}
