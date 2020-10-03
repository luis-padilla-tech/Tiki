var fs = require('fs');

function readFile(fileLocation) {
    fs.readFile(fileLocation, 'UTF-8' ,(err, data) => {
        if(err) {
            throw err;
        }

        console.log(data);
    });

    flipFiles(fileLocation, fileLocation);
}

/**
 * 
 * @param {string} fileLocation1 
 * @param {string} fileLocation2 
 */
function flipFiles(fileLocation1, fileLocation2) {

    tempFilePath1 = getRandomFileName(fileLocation1);
    // tempFilePath2 = getRandomFileName(fileLocation2);
}

/**
 * 
 * @param {string} originalFilePath 
 */
function getRandomFileName(originalFilePath){


    let newRandomName = 'TIKI_';
    const max = 10

    for(let i = 0; i < 8; i++) {
        newRandomName += Math.floor(Math.random() * Math.floor(max));
    }

    let folders = originalFilePath.split('\\');

    folders.pop();

    return `${folders.join('\\')}\\${newRandomName}`;
}

module.exports  = { readFile }