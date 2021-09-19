
const lineByLine = require('line-by-line');
const axios = require('axios');
const fs = require('fs');

const log = (data) => {
	fs.appendFile("broken.txt", data + "\r\n", (err) => {
		if (err) {
			console.log(err);
		}
	});
}

lr = new lineByLine('README.md')

lr.on('line', function (line) {

	const url = line.match(/http\S+/gi);

	if (url && url[0]) {
		(async () => {
			try {
				await axios.get(encodeURI(url[0]));
			} catch (err) {
				if (err.response.status > 400) {
					log(err.response.status + " -> " + url[0]);
				} else {
					log(url[0]);
				}
			}
		})().catch(e => {
			log(url[0]);
		});
	}
});

lr.on('error', function (err) {
	// At the minute, noop
});
process.on('uncaughtException', (err, origin) => {
	// At the minute, noop
});