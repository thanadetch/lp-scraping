const env = process.env
const username = env.USERNAME
const password = env.PASSWORD
const basePath = env.RESULT_BASE_PATH
const imageBasePath = env.RESULT_IMAGE_BASE_PATH

module.exports = {
    env,
    username,
    password,
    basePath,
    imageBasePath
}
