const getTextFromChoices = ($, choices) => {
    for (const choice of choices) {
        const text = $(`div[data-testid="${choice}"].bg-primary-gray`).text();
        if (text) {
            return text;
        }
    }
    return '';
}

const getTextFromMultiple = ($, id) => {
    const elements = $(`#${id}.mb-4.scroll-mt-48.mb-8.scroll-mt-48`).last()
        .find('div.cursor-pointer.flex.items-center')
        .map((i, element) => $(element).text())
    return elements.get().join(',')
}

const getTextFromTestId = ($, id) => {
    return $(`div[data-testid="${id}"]`).text()
}

const getTextFromInput = ($, name) => {
    return $(`input[name="${name}"]`).val()
}

const getTextFromInputNumber = ($, name) => {
    const text = getTextFromInput($, name)?.replaceAll(',', '')
    return text ? +text : ''
}

const mapperObject = (text, mapper) => {
    return mapper[text] || ''
}

const getTextFromChoicesMapperObject = ($, id, mapper) => {
    const text = getTextFromChoices($, id);
    return mapperObject(text, mapper)
}

const getTextFromTestIdMapperObject = ($, id, mapper) => {
    const text = getTextFromTestId($, id);
    return mapperObject(text, mapper)
}

module.exports = {
    getTextFromChoices,
    getTextFromMultiple,
    getTextFromTestId,
    getTextFromInput,
    getTextFromInputNumber,
    mapperObject,
    getTextFromChoicesMapperObject,
    getTextFromTestIdMapperObject
}
