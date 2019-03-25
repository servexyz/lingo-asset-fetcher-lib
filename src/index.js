require("dotenv").config();
const log = console.log;
import fs from "fs-extra";
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

function buildFileName(assetName, assetKeywords) {
	//TODO: Make this extensible so people can pass their own options
	if (assetKeywords.length >= 1) {
		let tags = assetKeywords
			.split(",")
			.map(tag => {
				return tag.trim();
			})
			.map(trimmed => {
				return trimmed.replace(/ /g, "_");
			});
		let underscoredKeywords = tags.join("_");
		let underscoredAssetName = assetName.replace(/ /g, "_");
		let newName = underscoredAssetName + "_" + underscoredKeywords;
		return newName;
	} else {
		return assetName;
	}
}

export async function getAssetUuids(
	singletonUuids,
	version = 0,
	page = 1,
	limit = 2000
) {
	//TODO: Revisit formatAssetContainers and consider consolidating functions
	//? This feels super clunky.
	var assetUuids = [];
	try {
		for (let s of singletonUuids) {
			let sectionUuid = Object.keys(s)[0];
			let headerUuid = Object.values(s)[0];
			if (headerUuid === null) {
				// http://developer.lingoapp.com/lingojs/#sections
				var section = await lingo.fetchSection(
					sectionUuid,
					version,
					page,
					limit
				);
				// fs.writeFileSync(
				// 	"./src/samplePayloads/section.json",
				// 	JSON.stringify(section, null, 2)
				// );
				for (let item of section.items) {
					if (item.asset_uuid !== null) {
						if (item.asset.hasOwnProperty("keywords")) {
							var fileName = buildFileName(
								item.asset.name,
								item.asset.keywords
							);
						} else {
							fileName = item.asset.name;
						}
						assetUuids.push(Object.assign({}, { [item.asset_uuid]: fileName }));
					}
				}
			} else {
				// http://developer.lingoapp.com/lingojs/#heading-contents
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
						// log(`v.asset.name: ${v.asset.name}`);
						// log(`v.asset.keywords: ${v.asset.keywords}`);
						if (v.asset.hasOwnProperty("keywords")) {
							var fileName = buildFileName(v.asset.name, v.asset.keywords);
						} else {
							fileName = v.asset.name;
						}
						// log(`header fileName: ${fileName}`);
						assetUuids.push(Object.assign({}, { [v.asset_uuid]: fileName }));
					}
				}
			}
		}
		return assetUuids;
	} catch (err) {
		log(`getAssetUuids() ${err}`);
	}
}

//TODO: Extract name from getAssetUuid (to name the file)
//TODO: Add param comments
//TODO: Consider checking all file names for duplicates (to prevent unnecessary overwrites)
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
export async function batchDownload(
	asset,
	outFormat = "png",
	outDir = "./laf_downloads"
) {
	try {
		asset.forEach(async a => {
			let uuid = Object.keys(a);
			let fileName = Object.values(a);
			var buffer;
			try {
				buffer = await lingo.downloadAsset(uuid, outFormat.toUpperCase());
				await fs.outputFile(
					`${outDir}/${fileName}.${outFormat.toLowerCase()}`,
					buffer,
					"binary"
				);
			} catch (err) {
				log(`Err: ${err}`);
			}
		});
	} catch (err) {
		log(`batchDownload(): ${err}`);
	}
}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

export default async function init(
	kitName = "Capswan - Mobile App - Style Guide",
	extractTarget = null,
	outputDirectory = "./laf_downloads",
	outputFormat = "PNG",
	spaceId = null,
	apiToken = null,
	kitVersion = 0
) {
	if (extractTarget == null) {
		throw Error("Extract Target is required");
	}
	let lsConfig = getLingoSetupVariables(spaceId, apiToken); //Allow overwriting of env variables
	lingo.setup(lsConfig[0], lsConfig[1]); //[0] => spaceId, [1] => apiToken
	//TODO: Move formatAssetContainers as a call into getAsssetUuids.
	//TODO: Flatten hellback
	await batchDownload(
		await getAssetUuids(
			formatAssetContainers(
				await getRelevantAssetContainers(
					await getKitId(kitName),
					extractTarget,
					kitVersion
				)
			)
		),
		outputFormat,
		outputDirectory
	);
}

init(
	"Capswan - Mobile App - Style Guide",
	config.capswan.targetOne,
	"./downloads/capswanOne",
	"PNG"
);
// init("Capswan - Mobile App - Style Guide", config.capswan.targetTwo, "./downloads/capswanTwo", "png");
// init("Test Me", config.testMe.targetOne, "./downloads/testMeOne", "PNG");
// init("Test Me", config.testMe.targetTwo, "./downloads/testMeTwo", "png");
