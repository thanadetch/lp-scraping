require('dotenv').config()
const {cleanUp, scrapeImages, signIn, loadPage} = require("./utils/scaperUtils");
const {
    generateExcel,
    getDataFromExcelV1,
    generateReportExcel, fillMissingData,
    combineListAndCheckDuplicate, filterNotDuplicateLists, getDataFromExcelV2, mapAreaFromListing, mapAreaLV,
    mapDescription, generateLpCode, separateImagesFromListing, mapProjectIdAndZoneIdFromListing,
    checkDuplicateFromListing, mapFeedbackChecked, generateNewNameAndDescription, mapListingToInternalSearch,
} = require("./utils/excelUtils");
const {logDetail} = require("./utils/environmentUtils");
const {logReport} = require("./utils/reportUtils");
const {REPORT_STATUS} = require("./constants/report");
const {propertyMapper, sortObjKeys} = require("./utils/propertyUtils");
const {getTextFromChoicesMapperObject} = require("./utils/elementUtils");
const {choices} = require("./constants/choices");
const {listingTypeMapper, listingMap, areaLpCodeMapper} = require("./constants/mapper");
const readXlsxFile = require("read-excel-file/node");
const {dataSchema} = require("./constants/schema");


const scrapeWebPageFromListing = async ({isMock = false}) => {
    await cleanUp();
    const reports = []
    const {page, browser} = isMock ? {} : await signIn();
    let {rows} = await readXlsxFile(`listing/Lot 10 _  รอโหลดรูป.xlsx`, {
        map: listingMap,
    });
    const length = rows.length;

    for (const property of rows) {
        const reportObj = {
            lpCode: property.sku,
            psCode: property.psCode
        }
        const index = rows.indexOf(property);
        try {
            if (property.psCode) {
                const $ = await loadPage(isMock, page, property);
                const listingType = getTextFromChoicesMapperObject($, choices.listingType, listingTypeMapper);
                if (logDetail) console.log('Listing Type:', listingType)

                if (!!listingType) {
                    await scrapeImages($, {lpCode: property.sku});
                    logReport(reports, index, reportObj, length, REPORT_STATUS.SUCCESS);
                } else {
                    logReport(reports, index, reportObj, length, REPORT_STATUS.DATA_NOT_FOUND);
                }
            } else {
                logReport(reports, index, reportObj, length, REPORT_STATUS.SKIPPED);
            }
        } catch (e) {
            console.log(e)
            logReport(reports, index, reportObj, length, REPORT_STATUS.ERROR);
        } finally {
            if (logDetail) console.log('===================================================')
        }
    }
    await generateReportExcel(reports)

    //closing the browser
    if (!isMock) await browser.close();
    console.log('Finished')
};

const scrapeWebPage = async ({isMock = false, skipImage = false}) => {
    await cleanUp();
    const data = []
    const reports = []
    const {page, browser} = isMock ? {} : await signIn();

    // let latestProperties = await getDataFromExcelV2('lot9_check dup.xlsx')
    let {rows: dataList} = await readXlsxFile(`data/Lot 10 check dup.xlsx`, {
        map: dataSchema,
    })
    const length = dataList.length;

    for (const property of dataList) {
        const index = dataList.indexOf(property);
        try {
            if (property.psCode) {
                const $ = await loadPage(isMock, page, property);
                const propertyResults = await propertyMapper($, property);
                if (!!propertyResults[0].postType) {
                    data.push(...propertyResults)
                    if (!skipImage) await scrapeImages($, property);
                    logReport(reports, index, property, length, REPORT_STATUS.SUCCESS);
                } else {
                    logReport(reports, index, property, length, REPORT_STATUS.DATA_NOT_FOUND);
                }
            } else {
                logReport(reports, index, property, length, REPORT_STATUS.SKIPPED);
            }
        } catch (e) {
            console.log(e)
            logReport(reports, index, property, length, REPORT_STATUS.ERROR);
        } finally {
            if (logDetail) console.log('===================================================')
        }
    }
    const results = await filterNotDuplicateLists(data)
    await generateExcel(results)
    await generateReportExcel(reports)

    //closing the browser
    if (!isMock) await browser.close();
    console.log('Finished')
};

// scrapeWebPageFromListing({isMock: false})
// scrapeWebPage({
//     isMock: false,
//     skipImage: true,
// });
// mapDescription('_Total Listing Lot1-9 Final with Description.xlsx')

// mapAreaFromListing('listings-lot5.xlsx', 'dataV2-5.xlsx')

// mapAreaLV('listings-lot9 Checking Area2.xlsx')

// combineListAndCheckDuplicate([
//     'Total Final listing 2_1-2-3 Clear all dup with images checked and description.xlsx',
//     'final listings-4-5-6 check dup_no description.xlsx',
//     'Checked area_listings Lot7 checked Dup_LP code.xlsx',
//     'Lot8 checked area เหลือ+Description.xlsx',
//     'listings-lot9.xlsx'
// ])
// mapProjectIdAndZoneIdFromListing('listings-lot9 Checking Area.xlsx')
// generateLpCode('Lot 10 _ Checked area, รอโหลดรูป.xlsx')

// const areaLpCodeMapperOrdered = sortObjKeys(areaLpCodeMapper)
// console.log(JSON.stringify(areaLpCodeMapperOrdered));

// separateImagesFromListing('Final Listings Lot9 Row502-755 with Description.xlsx')
// generateNewNameAndDescription('_Total Listing Lot1-9 Final with Description.xlsx')
// fillMissingData('lot9_check dup.xlsx', '',{
//     fillArea: false,
//     fillPsCode: false,
//     fillZoneId: false,
//     fillProjectId: false,
//     fillTitle: false,
//     fillDescription: false,
//     fillFeedbackChecked: true
// })

// mapFeedbackChecked('lot9_check dup.xlsx','Listings-lot9 Checked area รันLP code รอ Images.xlsx')

// checkDuplicateFromListing('Lot 10.xlsx', [
//     'Total Listing Lot1-9 Final with Description.xlsx',
// ])

mapListingToInternalSearch('Lot 10 _  รอโหลดรูป.xlsx')


