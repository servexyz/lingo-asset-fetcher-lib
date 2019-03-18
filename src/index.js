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

// lingo
// 	.searchAssetsInKit(capswanKitUuid, 0, "Icons", 1, 500)
// 	.then(sections => {
// 		log(`sections: ${JSON.stringify(sections, null, 2)}`);
// 		fs.writeFileSync(
// 			`./src/searchAssetsInKit.json`,
// 			JSON.stringify(sections, null, 2)
// 		);
// 	})
// 	.catch(err => {
// 		log(`searchAssetsInKit() ${err}`);
// 	});
function getSectionUuid(kitUuid, kitVersion) {
	try {
		return lingo.fetchKitOutline(kitUuid, kitVersion).then(kit => {
			// log(`section uuid aka. kit[0].uuid: ${kit[0].uuid}`);
			fs.writeFileSync("./src/kitOutline.json", JSON.stringify(kit, null, 2));
			return kit[0].uuid; //sectionUuid
		});
	} catch (err) {
		length(`getSectionUuid() ${err}`);
	}
}
async function getAssetUuids(
	sectionUuid,
	headerUuid,
	version = 0,
	page = 1,
	limit = 500
) {
	try {
		let section = await lingo.fetchSection(sectionUuid, 0, 1, 500);
		let y = [];
		Object.entries(section.items).forEach((v, idx) => {
			// log(`idx:${idx}\nv:${JSON.stringify(v[1], null, 2)}`);
			// log(`asset_uuid: ${v[1].asset_uuid}`);
			let uuid = v[1].asset_uuid;
			if (uuid !== null && v[1].section_uuid === sectionUuid) {
				log(`sectionUuid: ${v[1].section_uuid}`);
				y.push(v[1].asset_uuid);
			}
		});
		// y.shift(); //get rid of empty first
		log(`y: ${y.length}`);
		return y;
	} catch (err) {
		log(`getAssetUuids() ${err}`);
	}
}

async function init() {
	try {
		let sectionUuid = await getSectionUuid(capswanKitUuid, 0);
		let assetUuids = await getAssetUuids(sectionUuid);
		log(`assetUuids: ${JSON.stringify(assetUuids, null, "\t")}`);
	} catch (err) {
		log(`init() ${err}`);
	}
}

init();
