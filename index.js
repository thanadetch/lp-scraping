require('dotenv').config()
const {cleanUp, scrapeImages, signIn, loadPage} = require("./utils/scaperUtils");
const {
    generateExcel,
    getDataFromExcelV1,
    generateReportExcel, getDataFromExcelV2_1, getDataFromExcelV2_2, getDataFromExcelV2_3, fillMissingData,
    combineListAndCheckDuplicate, filterNotDuplicateLists,
} = require("./utils/excelUtils");
const {logDetail} = require("./utils/environmentUtils");
const {logReport} = require("./utils/reportUtils");
const {REPORT_STATUS} = require("./constants/report");
const {isDuplicate, propertyMapper, separateThaiAndEnglish} = require("./utils/propertyUtils");

const scrapeWebPage = async ({isMock = false, skipImage = false}) => {
    await cleanUp();
    const data = []
    const reports = []
    const {page, browser} = isMock ? {} : await signIn();
    // const propertiesV1 = await getDataFromExcelV1()
    // const propertiesV2_1 = await getDataFromExcelV2_1()
    const propertiesV2_2 = await getDataFromExcelV2_2()
    // const propertiesV2_3 = await getDataFromExcelV2_3()
    let psCodeObj = {};
    const latestProperties = propertiesV2_2;
    const length = latestProperties.length;

    for (const property of latestProperties) {
        const index = latestProperties.indexOf(property);
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

// scrapeWebPage({
//     isMock: false,
//     skipImage: true
// });

fillMissingData('listings.xlsx', {
    fillArea: true,
    fillPsCode: true,
    fillZoneId: false,
    fillProjectId: false,
    fillTitle: true,
})
// combineListAndCheckDuplicate(['listings1.xlsx', 'listings2.xlsx', 'listings3.xlsx'])

// S47 Sukhumvit เอส 47 สุขุมวิท
// console.log(separateThaiAndEnglish('S47 Sukhumvit เอส 47 สุขุมวิท'))
// const test = () => {
//     const inputs = [
//         '28 Chidlom 28 ชิดลม',
//         'Life @ Sathorn 10 ไลฟ์ แอท สาทร 10',
//         'Klass Siam คลาส สยาม',
//         'Via 31 เวีย 31',
//         'Muniq Sukhumvit 23 มิวนีค สุขุมวิท 23',
//         'The XXXIX By Sansiri เดอะ เทอร์ทีไนน์ บาย แสนสิริ',
//         'C Ekkamai ซี เอกมัย',
//         'Blocs 77 บลอคส์ 77'
//     ]
//     inputs.forEach(input => {
//         console.log(separateThaiAndEnglish(input))
//     })
// }

// test()
