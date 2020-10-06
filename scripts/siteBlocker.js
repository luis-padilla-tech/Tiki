var fs = require('fs');

function readFile(fileLocation) {

    console.log('reading file', fileLocation);

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

    let tempFilePath1 = getRandomFileName(fileLocation1);

    console.log(`trying to rename ${fileLocation1} file to ${tempFilePath1}`);

    fs.rename(fileLocation1, tempFilePath1, (err) =>{
        if(err){
            console.log('error renaming', err);
        }else{
           console.log('success renaming file'); 
        }
    });
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