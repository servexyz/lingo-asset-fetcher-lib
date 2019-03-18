require("dotenv").config();
const log = console.log;
const fs = require("fs");

const spaceId = process.env.SPACE_ID;
const apiToken = process.env.API_TOKEN;

const lingo = require("Lingojs");
log(`spaceId: ${spaceId}\napiToken: ${apiToken}`);
const capswanKitUuid = "5889C55A-CDD4-48D7-9F6F-28B92635E5A6";

try {
	lingo.setup(spaceId, apiToken);
} catch (err) {
	log(`Lingo module issue ${err}`);
}

function getSectionUuid(kitUuid, kitVersion) {
	try {
		return lingo.fetchKitOutline(kitUuid, kitVersion).then(kit => {
			log(`kit[0].uuid: ${kit[0].uuid}`);
			return kit[0].uuid;
		});
	} catch (err) {
		length(`getSectionUuid() ${err}`);
	}
}
async function getAssetUuids(sectionUuid, version = 0, page = 1, limit = 500) {
	try {
		let section = await lingo.fetchSection(sectionUuid, 0, 1, 500);
		// log(`section: ${JSON.stringify(section, null, 2)}`);
		let x = Object.entries(section.items).forEach((v, idx) => {
			// log(`idx:${idx}\nv:${JSON.stringify(v[1], null, 2)}`);
			// log(`asset_uuid: ${v[1].asset_uuid}`);
			return v[1].asset_uuid;
		});
		log(`x: ${x}`);
	} catch (err) {
		log(`getAssetUuids() ${err}`);
	}
}

async function init() {
	try {
		let sectionUuid = await getSectionUuid(capswanKitUuid, 0);
		let assetUuids = await getAssetUuids(sectionUuid);
		log(`assetUuids: ${assetUuids}`);
	} catch (err) {
		log(`init() ${err}`);
	}
}

init();
