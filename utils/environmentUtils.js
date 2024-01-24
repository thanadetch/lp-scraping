const env = process.env
const username = env.USERNAME
const password = env.PASSWORD
const webUrl = env.WEB_URL
const basePath = env.RESULT_BASE_PATH
const imageBasePath = env.RESULT_IMAGE_BASE_PATH
const logDetail = env.LOG_DETAIL === 'true'

module.exports = {
    env,
    username,
    password,
    webUrl,
    basePath,
    imageBasePath,
    logDetail
}
