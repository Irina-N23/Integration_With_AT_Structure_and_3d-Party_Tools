"use strict";

const fs = require("fs");
const path = require("path");


module.exports.createTotalJsonReport = function() {
    let totalData = [];

    const fileNames = fs.readdirSync(path.join(__dirname, "../reports"));
    if (fileNames.length > 0 ) {
        fileNames.forEach(file => {
            let fileContent = fs.readFileSync(path.join(__dirname,
                                                  "../reports/", file), "utf8");
            fileContent = fileContent.substring(1, fileContent.length-1);
            totalData.push(JSON.parse(fileContent));
        });

        fs.writeFileSync(path.join(__dirname, "../reports/total-report.json"),
                                       JSON.stringify(totalData, undefined, 4));
    } else {
        throw new Error("(!) None of reports has been created");
    }
}