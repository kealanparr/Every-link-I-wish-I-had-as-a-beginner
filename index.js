const lineByLine = require("line-by-line");
const axios = require("axios");
const fs = require("fs");
fs.truncateSync("broken.txt", 0);

const noOp = () => {};

const log = (data) => {
	fs.appendFile("broken.txt", data + "\r\n", (err) => {
		if (err) {
			console.log(err);
		}
	});
}

const checkResponseCode = (url) => {
	(async () => {
		try {
			await axios.get(encodeURI(url));
		} catch (err) {
			if (err.response.status > 400) {
				log(err.response.status + " -> " + url);
			} else {
				log(url);
			}
		}
	})().catch(() => {
		log(url);
	});
};

const forEachUrl = (callback) => {
	const lr = new lineByLine("README.md");
	lr.on("error", noOp);
	lr.on("line", (line) => {
		const url = line.match(/http\S+/gi);
		if (url && url[0]) {
			callback(url[0]);
		}
	});
};

forEachUrl(checkResponseCode);

process.on("uncaughtException", noOp);