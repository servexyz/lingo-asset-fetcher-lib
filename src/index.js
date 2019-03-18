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

function getHeaderUuid(kitUuid, kitVersion, headerName = "Icons") {
	try {
		return lingo.fetchKitOutline(kitUuid, kitVersion).then(kit => {
			fs.writeFileSync("./src/kitOutline.json", JSON.stringify(kit, null, 2));
			let uuid = 1;
			kit[0].headers.forEach(v => {
				// log(`v: ${JSON.stringify(v, null, 2)}\n`);
				// log(`name:${v.name}\nuuid:${v.uuid}`);
				if (v.name === headerName) {
					// log(`yes, headerName: ${v.name}`);
					// log(`v.uuid:${v.uuid}`);
					uuid = v.uuid;
				}
			});
			return uuid;
		});
	} catch (err) {
		log(`getHeaderUuid() ${err}`);
	}
}
async function getAssetUuids(headerUuid, version = 0, page = 1, limit = 500) {
	try {
		log(`headerUuid: ${headerUuid}`);
		return await lingo.fetchAssetsForHeading(headerUuid);
	} catch (err) {
		log(`getAssetUuids() ${err}`);
	}
}

async function init() {
	try {
		let headerUuid = await getHeaderUuid(capswanKitUuid, 0);
		let assetUuids = await getAssetUuids(headerUuid);
		log(`assetUuids: ${JSON.stringify(assetUuids, null, "\t")}`);
		log(`headerUuid: ${headerUuid}`);
	} catch (err) {
		log(`init() ${err}`);
	}
}

init();
