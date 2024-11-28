const fs = require('fs');
const path = require('path');

export function codeBlock(file) {
    const {metaData, contents} = file
    // console.log(language)
    switch (metaData.extension.replace(/\.(?=[^.]+$)/, "")) {
        // case "png":
        //     return `<img src="data:image/${metaData.extension.replace(/\.(?=[^.]+$)/, "")};base64,${binaryTo64(contents, metaData.extension, file)}" />`;
        default:
            return `\`\`\`${metaData.extension.replace(/\.(?=[^.]+$)/, "")}\n${contents}\n\`\`\``
    }
}


