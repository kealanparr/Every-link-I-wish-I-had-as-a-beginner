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
			axios.defaults.headers.get['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJGaXJlZm94IGJveW9zIiwiVXNlcm5hbWUiOiJKb3JnZUhvcmdlIiwiZXhwIjoxNzMwNjI3NjY0LCJpYXQiOjE3MzA2Mjc2NjR9.inRMrsUkoVnhFujp6q06JjPCm6tueYw7rQ6SgX1FBzI`;
			axios.defaults.headers.get['Accept'] = "text/html, application/json",
			axios.defaults.headers.get['Accept-Encoding'] = "gzip, deflate, br";
			axios.defaults.headers.get['Content-Type'] = "application/json";
			axios.defaults.headers.get['User-Agent'] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
			axios.defaults.headers.get['Referer'] = "www.google.com"
			axios.defaults.headers.get['Cookie'] = "sessionId=asdjkndjnkdssdnn; theme=light"
			axios.defaults.headers.get['Cache-Control'] = "no-cache";
			axios.defaults.headers.get['Host'] = "www.google.com";
			axios.defaults.headers.get['Accept-Language'] = "en-US";
			await axios.get(encodeURI(url));
		} catch (err) {
			if (err.response.status > 400 && err.response.status !== 403) {
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
	const lr = new lineByLine("readme.md");
	lr.on("error", noOp);
	lr.on("line", (line) => {
		const url = line.match(/http\S+/gi);
		if (url && url[0]) {
			callback(url[0]);
		}
	});
};

forEachUrl(checkResponseCode);
