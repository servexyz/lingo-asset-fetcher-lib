require("dotenv").config();
const log = console.log;
import fs from "fs";
import lingo from "Lingojs";
import config from "./index.config";
/**
 * @param {int} spaceId :: Lingo Space ID (6 digits)
 * @param {int} apiToken :: Account root API
 */
export function getLingoSetupVariables(spaceId, apiToken) {
	if (spaceId == null || apiToken == null) {
		return [process.env.SPACE_ID, process.env.API_TOKEN];
	} else {
		return [spaceId, apiToken];
	}
}

/**
 *
 * @param {string} kitName
 */
// kitName = "Capswan - Mobile App - Style Guide"
export async function getKitId(kitName = "Capswan - Mobile App - Style Guide") {
	//TODO: Add test for accounts which only have single kit
	//? Not sure whether this is going to be an issue given that the data
	//? structure would change based on how many kits are returned
	let kitUuid;
	try {
		let kits = await lingo.fetchKits();
		// log(`kits: ${JSON.stringify(kits, null, 2)}`);
		kits.forEach(v => {
			// log(`v:${JSON.stringify(v, null, 2)}`);
			if (v.name === kitName) {
				// log(`v.name: ${v.name}`);
				// log(`v.kit_uuid:${v.kit_uuid}`);
				kitUuid = v.kit_uuid;
			}
			// log(`kitUuid: ${kitUuid}`);
		});
		return kitUuid;
	} catch (err) {
		log(`getKitId() ${err}`);
	}
}

export async function getRelevantAssetContainers(
	kitId,
	extractTarget,
	kitVersion = 0
) {
	try {
		let uuids = { sections: [] };
		let outline = await lingo.fetchKitOutline(kitId, kitVersion);
		// log(`outline: ${JSON.stringify(outline, null, 2)}`);
		// log(`kitId: ${kitId}`);
		extractTarget.sections.forEach(targetSec => {
			// log(`targetSec:${JSON.stringify(targetSec, null, 2)}`);
			//TODO: Rename "originSec" to "outlineSec" for clarity
			Object.values(outline).forEach(originSec => {
				//TODO: Add a test for sections with duplicate names
				// log(`originSec: ${JSON.stringify(originSec, null, 2)}`);
				let headerUuids = [];
				if (targetSec.name === originSec.name) {
					// log(`originSec.uuid: ${originSec.uuid}`);
					if (targetSec.hasOwnProperty("headers")) {
						// log(`has headers: ${originSec.name}`);
						// log(
						// 	`targetSec headers: ${JSON.stringify(targetSec.headers, null, 2)}`
						// );
						//TODO: Add a test for headers with duplicate names
						targetSec.headers.forEach(tsHeaderName => {
							// log(`tsHeaderName: ${tsHeaderName}`);
							originSec.headers.forEach(osHeader => {
								if (tsHeaderName === osHeader.name) {
									// log(`${osHeader.name} uuid: ${osHeader.uuid}`);
									headerUuids.push(osHeader.uuid);
								}
								// log(`osHeader: ${JSON.stringify(osHeader, null, 2)}`);
							});
						});
					}
					uuids.sections.push({
						name: originSec.name,
						uuid: originSec.uuid,
						headers: headerUuids
					});
				}
			});
		});
		// log(JSON.stringify(uuids, null, 2));
		return uuids;
	} catch (err) {
		log(`getRelevantAssetContainers() ${err}`);
	}
}

export async function getAssetUuids(assetContainer) {
	let { sections } = assetContainer;
	log(`assetContainer.section: ${JSON.stringify(sections, null, 2)}`);
	let assetUuids = sections.map(async sec => {
		var uuids = [];
		log(`sec: ${JSON.stringify(sec, null, 2)}`);
		log(`uuids1:${uuids}`);
		if (sec.headers.length == 0) {
			let newSec = await lingo.fetchSection(sec.uuid);
			Object.values(newSec.items).map(v => {
				log(`v.asset_uuid: ${v.asset_uuid}`);

				uuids.push(v.asset_uuid);
				log(`uuids2:${uuids}\n`);
				// log(`v: ${JSON.stringify(v.asset_uuid, null, 2)}`);
				// return uuids;
			});
		}
		log(`assetUuids: ${assetUuids}`);
		return assetUuids;
	});
	// log(`uuids: ${JSON.stringify(uuids, null, 2)}`);
	// return uuids;
}
// export async function batchDownload(assetUuids) {
// 	assetUuids.forEach(uuid => {
// 		log(`uuid: ${JSON.stringify(uuid, null, 2)}`);
// 	});
// }

export default async function init(
	kitName = "Capswan - Mobile App - Style Guide",
	extractTarget = null,
	spaceId = null,
	apiToken = null,
	kitVersion = 0
) {
	if (extractTarget == null) {
		throw Error("Extract Target is required");
	}
	let lsConfig = getLingoSetupVariables(spaceId, apiToken); //Allow overwriting of env variables
	lingo.setup(lsConfig[0], lsConfig[1]); //[0] => spaceId, [1] => apiToken
	let uuidsInInit = await getAssetUuids(
		await getRelevantAssetContainers(
			await getKitId(kitName),
			extractTarget,
			kitVersion
		)
	);
	log(`uuidsInInit: ${uuidsInInit}`);
}

// init("Capswan - Mobile App - Style Guide", config.capswan.targetTwo);
// init("Capswan - Mobile App - Style Guide", config.capswan.targetOne);
init("Test Me", config.testMe.targetOne);
// init("Test Me", config.testMe.targetTwo);
