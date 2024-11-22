function getCodeBlockExt(language) {
    switch (language) {
        case "JavaScript":
            return "js"
        default:
            break;
    }
}

export function codeBlock(contents, language) {
    // console.log(language)
    return `\`\`\`${getCodeBlockExt(language)}\n${contents}\n\`\`\``
}

