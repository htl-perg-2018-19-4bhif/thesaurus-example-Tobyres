/** Requirements: */
/*
const args = process.argv.slice(2);
let wholeArray = [];
let foundSmth = false;

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('openthesaurus.txt')
});

lineReader.on('line', function (line: string) {
    wholeArray.push(line.split(';'));
});

lineReader.on('close', function () {
    findSynonyms();
});

function findSynonyms() {
    if(args.length < 1){
        console.log("Please specify words");
    }else{
        for(let i = 0; i < args.length; i++){
            for(let x = 0; x < wholeArray.length; x++){
                let res = checkAppearance(args[i], wholeArray[x]);
                if(res !== -1){
                    console.log(args[i] + ":");
                    console.log(fetchOtherSynonyms(x, res));
                }
            }
        }
    }

    if(!foundSmth){
        console.log("No matches found");
    }
}

function checkAppearance(givenWord, arr){
    for(let i = 0; i < arr.length; i++){
        if(arr[i].search(givenWord) !== -1){
            foundSmth = true;
            return i;
        }
    }
    return -1;
}

function fetchOtherSynonyms(indexW, index){
    let str = "";
    for(let i = 0; i < wholeArray[indexW].length; i++){
        if(i !== index) {
            str += "\t" + wholeArray[indexW][i] + "\n";
        }
    }
    return str;
}
*/

/** Extra Challenge #1: */
/*
const args = process.argv.slice(2);
let wholeArray = [];
let foundSmth = false;

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('openthesaurus.txt')
});

if(args.length < 1) {
    console.log("Please specify words");
}else {
    lineReader.on('line', function (line: string) {
        for (let i = 0; i < args.length; i++) {
            let tempArray = line.split(';');
            let res = checkAppearance(args[i], tempArray);
            if (res !== -1) {
                console.log(args[i] + ":");
                console.log(fetchOtherSynonyms(tempArray, res));
            }
        }
    });

    lineReader.on('close', function () {
        if(!foundSmth){
            console.log("No matches found");
        }
    });
}

function checkAppearance(givenWord, arr){
    for(let i = 0; i < arr.length; i++){
        if(arr[i].search(givenWord) !== -1){
            foundSmth = true;
            return i;
        }
    }
    return -1;
}

function fetchOtherSynonyms(arr, index){
    let str = "";
    for(let i = 0; i < arr.length; i++){
        if(i !== index) {
            str += "\t" + arr[i] + "\n";
        }
    }
    return str;
}
*/

/** Extra Challenge #2: */
const args = process.argv.slice(2);

let wholeArray = [];
let foundSmth = false;

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('openthesaurus.txt')
});

lineReader.on('line', function (line: string) {
    wholeArray.push(line.split(';'));
});

lineReader.on('close', function () {
    if (args.length < 1) {
        console.log("Please specify words");
    } else if (args.length === 1 && args[0] === "-i") {
        runInteractiveMode();
    } else {
        findSynonyms(args);
    }
});

function runInteractiveMode() {
    console.log("Interactive mode (cancel with \\q):");
    const std_IO = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    askForInput(std_IO);
    
/** Hier ging komischerweise der string compare nicht, habe daher mit einer Rekursion gearbeitet

    stdin.addListener("data", function (d) {
        if(d === "\\q"){
            console.log("exiting...");
            process.exit(0);
        }
    });
 */
}

function askForInput(std_IO){
    std_IO.question('-> ', (answer) => {
        if(answer === "\\q"){
            std_IO.close();
        }else{
            findSynonyms(answer.split(" "));
            askForInput(std_IO);
        }
    });
}

function findSynonyms(argArr) {
    for (let i = 0; i < argArr.length; i++) {
        for (let x = 0; x < wholeArray.length; x++) {
            let res = checkAppearance(argArr[i], wholeArray[x]);
            if (res !== -1) {
                console.log(argArr[i] + ":");
                console.log(fetchOtherSynonyms(x, res));
            }
        }
    }
    if (!foundSmth) {
        console.log("No matches found");
    }
}

function checkAppearance(givenWord, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].search(givenWord) !== -1) {
            foundSmth = true;
            return i;
        }
    }
    return -1;
}

function fetchOtherSynonyms(indexW, index) {
    let str = "";
    for (let i = 0; i < wholeArray[indexW].length; i++) {
        if (i !== index) {
            str += "\t" + wholeArray[indexW][i] + "\n";
        }
    }
    return str;
}
