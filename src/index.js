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

export function formatAssetContainers({ sections } = assetContainers) {
	let singletonUuids = [];
	//? Not mapping because assetContainers will always be small.
	//? Unnecessary loops won't impact performance.
	sections.forEach((section, idx) => {
		// log(`section ${idx}: ${JSON.stringify(section, null, 2)}`);
		if (section.hasOwnProperty("headers") && section.headers.length === 0) {
			singletonUuids.push(Object.assign({}, { [section.uuid]: null }));
		} else {
			section.headers.forEach(header => {
				singletonUuids.push(Object.assign({}, { [section.uuid]: header }));
			});
		}
	});
	// log(`singleton: ${JSON.stringify(singletonUuids, null, 2)}`);
	return singletonUuids;
}

export async function getAssetUuids(singletonUuids) {
	//TODO: Revisit formatAssetContainers and consider consolidating functions
	//? This feels super clunky.
	var assetUuids = [];
	try {
		for (let s of singletonUuids) {
			let sectionUuid = Object.keys(s)[0];
			let headerUuid = Object.values(s)[0];
			// log(`sectionUuid; ${sectionUuid}`);
			// log(`headerUuid: ${headerUuid}`);
			if (headerUuid === null) {
				var section = await lingo.fetchSection(sectionUuid);
				// fs.writeFileSync(
				// 	"./src/samplePayloads/section.json",
				// 	JSON.stringify(section, null, 2)
				// );
				for (let k of section.items) {
					if (k.asset_uuid !== null) {
						assetUuids.push(k.asset_uuid);
					}
				}
			} else {
				var headerAssets = await lingo.fetchAssetsForHeading(
					sectionUuid,
					headerUuid
				);
				// fs.writeFileSync(
				// 	"./src/samplePayloads/headerAssets.json",
				// 	JSON.stringify(headerAssets, null, 2)
				// );
				for (const [k, v] of Object.entries(headerAssets, null, 2)) {
					if (v.asset_uuid !== null) {
						assetUuids.push(v.asset_uuid);
					}
				}
			}
		}
		return assetUuids;
	} catch (err) {
		log(`getAssetUuids() ${err}`);
	}
}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
// export async function batchDownload(assetUuids) {
// 	assetUuids.forEach(uuid => {
// 		log(`uuid: ${JSON.stringify(uuid, null, 2)}`);
// 	});
// }
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

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
		formatAssetContainers(
			await getRelevantAssetContainers(
				await getKitId(kitName),
				extractTarget,
				kitVersion
			)
		)
	);
	log(`uuidsInInit: ${uuidsInInit}`);
}

// init("Capswan - Mobile App - Style Guide", config.capswan.targetTwo);
init("Capswan - Mobile App - Style Guide", config.capswan.targetOne);
// init("Test Me", config.testMe.targetOne);
// init("Test Me", config.testMe.targetTwo);
