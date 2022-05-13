// Load wink-bm25-text-search
var bm25 = require('wink-bm25-text-search');
// Create search engine's instance
var engine = bm25();
// Load NLP utilities
var nlp = require('wink-nlp-utils');
// Load sample data (load any other JSON data instead of sample)
var docs = require('./data3.json');
console.log(docs)

var fs = require('fs')

var s = process.argv[2]
console.log(s);

// var arg = ['women', 'wedding', 'saree', 'yellow', 'sada-suhagan', 'mixxy ']
var arg = ['men']

let string = '';
arg.map((word) => {
    string = string + word + ' ';
})

console.log(string)

// Step I: Define config
// Only field weights are required in this example.
engine.defineConfig({ fldWeights: { body: 20, title: 2 } });

// Step II: Define PrepTasks
// Set up preparatory tasks for 'body' field
engine.definePrepTasks([
    nlp.string.lowerCase,
    nlp.string.removeExtraSpaces,
    nlp.string.tokenize0,
    nlp.tokens.propagateNegations,
    nlp.tokens.removeWords,
    nlp.tokens.stem
], 'body');
// Set up 'default' preparatory tasks i.e. for everything else
engine.definePrepTasks([
    nlp.string.lowerCase,
    nlp.string.removeExtraSpaces,
    nlp.string.tokenize0,
    nlp.tokens.propagateNegations,
    nlp.tokens.stem
]);

// Step III: Add Docs
// Add documents now...
docs.forEach(function (doc, i) {
    // Note, 'i' becomes the unique id for 'doc'
    engine.addDoc(doc, i);
});

// console.log(docs)
// Step IV: Consolidate
// Consolidate before searching
engine.consolidate();

// All set, start searching!
var results = engine.search(string, [1000000]);
// results is an array of [ doc-id, score ], sorted by score
// results[ 0 ][ 0 ] i.e. the top result is:

console.log("+++++++++++++++++++");
console.log(results.length);
console.log(results);
console.log("+++++++++++++++++++");

var ans = []

results.map((id) => {
    //console.log(docs[id[0]]);
    ans.push(docs[id[0]])
})

// -> Michelle LaVaughn Robinson Obama (born January 17, 1964) is...

fs.writeFile("ans.json", JSON.stringify(ans), function (err) {
    if (err) throw err;
    console.log('complete');
}
);