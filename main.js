const fs = require('fs');
const path = require('path');
let srcDir = './src';

const readDir = (source) => {
    const files = fs.readdirSync(source);
    let targetDir = path.join(__dirname, './dest');
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
    }
    files.forEach(elem => {
        let elemPath = path.join(source, elem);
        let stat = fs.statSync(elemPath);
        if (!stat.isDirectory()) {
            let newElementPath = path.join(targetDir, elem[0]);
            if (!fs.existsSync(path.join(targetDir, elem[0]))) {
                fs.mkdirSync(path.join(targetDir, elem[0]));
            }
            fs.link(path.join(__dirname, elemPath), path.join(newElementPath, elem), err => {
                if (err) {
                    console.error(err.message);
                    return;
                }
            });
        } else {
            readDir(path.join(source,elem));
        }
    })
}

readDir(srcDir);