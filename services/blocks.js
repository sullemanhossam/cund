
export function codeBlock(file) {
    const {metaData, contents} = file
    // console.log(language)
    return `\`\`\`${metaData.extension.replace(/\.(?=[^.]+$)/, "")}\n${contents}\n\`\`\``
}

// function getCodeBlockExt(language) {
//     switch (language) {
//         case "JavaScript":
//             return "js"
//         default:
//             break;
//     }
// }


