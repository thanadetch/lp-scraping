const separateThaiAndEnglish = (input) => {
    const thaiRegex = /[\u0E00-\u0E7F]+/g;
    const englishRegex = /[a-zA-Z]+/g;

    if (englishRegex.test(input) && thaiRegex.test(input)) {
        const splitInput = input.split(' ')
        let thWords = []
        let enWords = []

        if (Number.isInteger(Number(splitInput[0]))) {
            const firstNumber = splitInput[0]
            enWords.push(splitInput[0])
            for (let i = 1; i < splitInput.length; i++) {
                if (splitInput[i] === firstNumber) {
                    thWords = splitInput.slice(i, splitInput.length)
                    break;
                } else {
                    enWords.push(splitInput[i])
                }
            }
        } else if (splitInput[0].match(englishRegex)) {
            for (let i = 0; i < splitInput.length; i++) {
                if (splitInput[i].match(thaiRegex)) {
                    thWords = splitInput.slice(i, splitInput.length)
                    break;
                } else {
                    enWords.push(splitInput[i])
                }
            }
        }

        return {
            thai: thWords.join(' ').trim(),
            english: enWords.join(' ').trim()
        };
    }

    return {
        thai: input,
        english: input
    }
}

module.exports = {
    separateThaiAndEnglish
}
