
var fs = require('fs')
const csv = require('csvtojson')

const csvFilePath = "./dataset/dataset2.csv"

var docs;

csv()
    .fromFile('./dataset/dataset2.csv')
    .then((jsonObj) => {
        console.log(jsonObj);
        docs = jsonObj;
        /**
         * [
         * 	{a:"1", b:"2", c:"3"},
         * 	{a:"4", b:"5". c:"6"}
         * ]
         */
    })


fs.writeFile("data2.json", JSON.stringify(docs), function (err) {
    if (err) throw err;
    console.log('complete');
}
);
