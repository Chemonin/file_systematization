const fs = require('fs');
const path = require('path');
const util = require('util');

const link = util.promisify(fs.link);

const srcDir = './src';
const targetDir = path.join(__dirname, './dest');
let fileCounter = 0;

async function managePath (fileId, fileName) {
    let stat = fs.statSync(path.resolve(fileId));
    if (!stat.isDirectory()) {
        let newElementPath = path.join(targetDir, fileName[0]);
        if (!fs.existsSync(newElementPath)) {
            fs.mkdirSync(newElementPath);
        }
        await link(fileId, path.join(newElementPath, fileName));
        fileCounter++
    } else {
        await readDir(fileId);
    }
}

const readDir = (source) => {
    return new Promise((resolve, reject) => {
        const currentDir = path.resolve(source);
        const files = fs.readdirSync(currentDir);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir);
        }
        const promiseList = [];
        files.forEach((file) => {
            promiseList.push(managePath(path.join(currentDir, file), file));
        })
        resolve(Promise.all(promiseList));
    })
}

readDir(srcDir).then(() => {
    console.log(`Find and sort ${fileCounter} files`);
});