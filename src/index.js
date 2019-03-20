require("dotenv").config();
const log = console.log;
// const fs = require("fs");
const lingo = require("Lingojs");

/**
 * @param {int} spaceId :: Lingo Space ID (6 digits)
 * @param {int} apiToken :: Account root API
 */

log(`SPACE_ID: ${process.env.SPACE_ID}`);
log(`API_TOKEN: ${process.env.API_TOKEN}`);

function getLingoSetupVariables(spaceId, apiToken) {
	if (spaceId == null || apiToken == null) {
		return [process.env.SPACE_ID, process.env.API_TOKEN];
	} else {
		return [spaceId, apiToken];
	}
}

function init(spaceId = null, apiToken = null) {
	let lsConfig = getLingoSetupVariables(spaceId, apiToken);
}

// function init(spaceId = null, apiToken = null) {
// 	if (spaceId === null || apiToken === null) {
// 		this.spaceId = process.env.SPACE_ID;
// 		this.apiToken = process.env.API_TOKEN;
// 	} else {
// 		this.spaceId = spaceId;
// 		this.apiToken = apiToken;
// 	}
// }

// init();
// log(`this.spaceId: ${this.spaceId}`);
// log(`this.apiToken: ${this.apiToken}`);

// try {
// 	lingo.setup(this.spaceId, this.apiToken);
// } catch (err) {
// 	log(`Setup failed ${err}`);
// }

/**
 *
 * @param {string} kitName
 */
function getKitId(kitName) {
	return lingo.fetchKits().then(kits => {
		log(`kits: ${kits}`);
	});
}
