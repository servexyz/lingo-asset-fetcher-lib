require("dotenv").config();

const spaceId = process.env.SPACE_ID;
const apiToken = process.env.API_TOKEN;

const lingo = require("Lingojs");
console.log(`spaceId: ${spaceId}\napiToken: ${apiToken}`);

try {
	lingo.setup(spaceId, apiToken);
	console.log(`lingo: ${JSON.stringify(lingo, null, 2)}`);
	lingo
		.fetchKits()
		.then(kits => {
			console.log(`kits: ${kits}`);
		})
		.catch(err => {
			console.log(`fetchKits() ${err}`);
		});
} catch (err) {
	console.log(`lingo setup err: ${err}`);
}
