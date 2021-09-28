console.log("does it run?")

const lineByLine = require("line-by-line");
const axios = require("axios");
const fs = require("fs");

console.log("does get to step 1?");

fs.truncateSync("broken.txt", 0);

console.log("does get to step 2?");

const noOp = () => {};

console.log("does get to step 3?");

const log = (data) => {
	console.log("does get to step 16?");
	fs.appendFile("broken.txt", data + "\r\n", (err) => {
		if (err) {
			console.log("does get to step 17?");
			console.log(err);
		}
	});
}

console.log("does get to step 4?");

const checkResponseCode = (url) => {
	console.log("does get to step 11?");
	(async () => {
		try {
			console.log("does get to step 12?");
			await axios.get(encodeURI(url));
		} catch (err) {
			console.log("does get to step 13?");
			if (err.response.status > 400) {
				console.log("does get to step 14?");
				log(err.response.status + " -> " + url);
			} else {
				console.log("does get to step 15?");
				log(url);
			}
		}
	})().catch(() => {
		console.log("does it error?");
		log(url);
	});
};

console.log("does get to step 5?");

const forEachUrl = (callback) => {
	console.log("does get to step 7?");
	const lr = new lineByLine("README.md");
	lr.on("error", noOp);
	console.log("does get to step 8?");
	setTimeout(()=>{
		console.log('did it even wait for it?')
	},1000)
	lr.on("line", (line) => {
		console.log("does get to step 9?");
		const url = line.match(/http\S+/gi);
		if (url && url[0]) {
			console.log("does get to step 10?");
			callback(url[0]);
		}
	});
};

console.log("does get to step 6?");

process.on("uncaughtException", err => {
	console.log(err)
}); 

forEachUrl(checkResponseCode);
