require("dotenv").config();
const log = console.log;

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
	return lingo.fetchKitOutline(kitUuid, kitVersion).then(o => {
		return o.uuid;
	});
}
async function init() {
	let uuid = await getSectionUuid(capswanKitUuid, 0);
	log(`uuid: ${uuid}`);
}

// function getSectionHeaderUuid(sectionName) {
// 	return lingo
// 		.fetchKitOutline(capswanKitUuid, 0)
// 		.then(sections => {
// 			// log(`sections: ${JSON.stringify(sections[0], null, 2)}`);
// 			let uuid;
// 			log(`sections: ${JSON.stringify(sections, null, 2)}`);
// 			sections[0].headers.forEach((v, idx) => {
// 				// log(`idx:${idx}\nv:${JSON.stringify(v, null, 2)}`);
// 				if (v.name === sectionName) {
// 					// console.log(`v.uuid: ${v.uuid}`);
// 					uuid = v.uuid;
// 				}
// 			});
// 			return uuid;
// 		})
// 		.catch(err => {
// 			log(`getSectionHeaderUuid() ${err}`);
// 		});
// }

// function getAssetUuids(sectionUuid) {
// 	lingo
// 		// .fetchSection(sectionUuid, 0)
// 		.fetchSection("9533C6B8-599E-4709-9120-9DA8E10A2922", 0)
// 		.then(v => {
// 			console.log(v);
// 			return v;
// 		})
// 		.catch(err => {
// 			log(`getAssetUuids() ${err}`);
// 		});
// 	log(`sectionUuid: ${sectionUuid}`);
// }

// getSectionHeaderUuid("Icons")
// 	.then(sectionUuid => {
// 		console.log(`sectionUuid inside getSectionHeaderUuid: ${sectionUuid}`);
// 		getAssetUuids(sectionUuid);
// 		log(`sectionUuid reference: ${sectionUuid}`);
// 	})
// 	.catch(err => {
// 		log(`init ${err}`);
// 	});

// log(`lingo: ${JSON.stringify(lingo, null, 2)}`);

// lingo
// 	.fetchKits()
// 	.then(kits => {
// 		log(`kits: ${JSON.stringify(kits, null, 2)}`);
// 	})
// 	.catch(err => {
// 		log(`fetchKits() ${err}`);
// 	});

// lingo
// 	.fetchKit(capswanKitUuid)
// 	.then(kit => {
// 		log(JSON.stringify(kit, null, 2));
// 	})
// 	.catch(err => {
// 		log(`fetchKit() ${err}`);
// 	});
