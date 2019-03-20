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
			// fs.writeFileSync("./src/kitOutline.json", JSON.stringify(kit, null, 2));
			let sectionUuid = kit[0].uuid;
			// log(`kit[0].uuid:${kit[0].uuid}`);
			let headerUuid;
			kit[0].headers.forEach(v => {
				// log(`v: ${JSON.stringify(v, null, 2)}\n`);
				// log(`name:${v.name}\nuuid:${v.uuid}`);
				if (v.name === headerName) {
					// log(`yes, headerName: ${v.name}`);
					// log(`v.uuid:${v.uuid}`);
					headerUuid = v.uuid;
				}
			});
			return [sectionUuid, headerUuid];
		});
	} catch (err) {
		log(`getHeaderUuid() ${err}`);
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
		log(`headerUuid: ${headerUuid}`);
		let assetsInHeader = await lingo.fetchAssetsForHeading(
			sectionUuid,
			headerUuid,
			version
		);
		// log(`assetsInHeader:${JSON.stringify(assetsInHeader, null, 2)}`);
		var assetUuids = [];
		for (const [k, v] of Object.entries(assetsInHeader)) {
			// log(`assetUuids: ${v.asset_uuid}`);
			assetUuids.push(v.asset_uuid);
			// return v.asset_uuid;
		}
		return assetUuids;
		// fs.writeFileSync("./src/assetUuidsV2.json", JSON.stringify(x, null, 2));
		// log(`x: ${JSON.stringify(x, null, 2)}`);
		// log(`x.length: ${x.length}`);
	} catch (err) {
		log(`getAssetUuids() ${err}`);
	}
}

async function downloadAssets(headerName, fileFormat) {
	try {
		let [sectionUuid, headerUuid] = await getHeaderUuid(
			capswanKitUuid,
			0,
			headerName
		);
		let assetUuids = await getAssetUuids(sectionUuid, headerUuid);
		assetUuids.forEach(async (uuid, idx) => {
			log(`uuid: ${uuid}\nfileFormat:${fileFormat}`);
			let x = await lingo.downloadAsset(uuid, fileFormat);
			fs.writeFile(`./src/img/${idx}`, x, "binary", err => {
				if (err) throw err;
				log(`...${idx}.PNG file saved`);
			});
		});
	} catch (err) {
		log(`init() ${err}`);
	}
}

downloadAssets("Icons", "PNG");
