require("dotenv").config();
const log = console.log;
import fs from "fs-extra";
import lingo from "Lingojs";
import config from "./lingo.config";

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
export async function getKitId(kitName = "Capswan - Mobile App - Style Guide") {
	let kitUuid;
	try {
		let kits = await lingo.fetchKits();
		kits.forEach(v => {
			if (v.name === kitName) {
				kitUuid = v.kit_uuid;
			}
		});
		return kitUuid;
	} catch (err) {
		log(`getKitId() ${err}`);
	}
}
//TODO: Experiment with functional style to try to solve scope issue
export async function getRelevantAssetContainers(
	kitId,
	extractTarget,
	kitVersion = 0
) {
	const uuids = { sections: [] };
	try {
		//? Might be failing because it's only checking headers and not sections
		// let headerUuids = [];
		let outline = await lingo.fetchKitOutline(kitId, kitVersion);
		// log(`gRAC outline: ${JSON.stringify(outline, null, 2)}`);
		extractTarget.sections.forEach(targetSec => {
			// log(`gRAC targetSec: ${JSON.stringify(targetSec, null, 2)}`);
			let headerUuids = [];
			Object.values(outline).forEach(originSec => {
				// log(`gRAC originSec: ${JSON.stringify(originSec, null, 2)}`);
				//TODO: Add a test for sections with duplicate names
				// let headerUuids = [];
				if (targetSec.name === originSec.name) {
					if (targetSec.hasOwnProperty("headers")) {
						log(`targetSec has headers property`);
						//TODO: Add a test for headers with duplicate names
						targetSec.headers.forEach(tsHeaderName => {
							originSec.headers.forEach(osHeader => {
								if (tsHeaderName === osHeader.name) {
									log(`this should be added: ${osHeader.uuid}`);
									headerUuids.push(osHeader.uuid);
								}
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
		log(`uuids 1: ${JSON.stringify(uuids, null, 2)}`);
	} catch (err) {
		log(`getRelevantAssetContainers() ${err}`);
	}
	log(`uuids 2: ${JSON.stringify(uuids, null, 2)}`);
	return uuids;
}

/**
 * getRelevantAssetContainer
 *  TODO: Rename getRAC to getRelevantAssetContainer after old is removed
 * @param {*} kitId
 * @param {*} extractTarget
 * @param {*} kitVersion
 */
export async function getRAC(kitId, extractTarget, kitVersion = 0) {
	//getRelevantAssetContainer
	//TODO: ATTN someone brave: refactor this.
	let outline = await lingo.fetchKitOutline(kitId, kitVersion);
	const { sections } = extractTarget;
	var assetContainer = Object.values(sections)
		.map((extract, xIdx) => {
			// log(`extract: ${JSON.stringify(extract, null, 2)}`);
			return Object.values(outline)
				.filter(origin => {
					return origin.name === extract.name;
				})
				.map(matchingOrigin => {
					const { uuid, headers } = matchingOrigin;
					return Object.assign({}, { [uuid]: headers });
				})
				.map(slimmedOrigin => {
					// log(`slimmedOrigin: ${JSON.stringify(slimmedOrigin, null, 2)}`);
					let sectionUuid = Object.keys(slimmedOrigin);
					if (extract.hasOwnProperty("headers") && extract.headers.length > 0) {
						return Object.values(extract.headers)
							.map(extractHeaderName => {
								// log(
								// 	`extractHeaderName: ${JSON.stringify(
								// 		extractHeaderName,
								// 		null,
								// 		2
								// 	)}`
								// );
								return extractHeaderName;
							})
							.map(xHeader => {
								let headers = Object.values(slimmedOrigin).flat();
								// log(`headers: ${JSON.stringify(headers, null, 2)}`);
								return headers.filter((oHeader, idx) => {
									// log(`oHeader: ${JSON.stringify(oHeader, null, 2)}`);
									const { name, uuid } = oHeader;
									// log(`nameee${idx}: ${name}`);
									// log(`uuuuid${idx}: ${uuid}`);
									// log(`xHeader${idx}: ${xHeader}`);
									// log(`insideeee headers`);
									if (name === xHeader) {
										// log(`insiiiiide nameXheader`);
										return Object.assign({}, { name, uuid });
									}
								});
							})
							.map(matchedOriginHeaders => {
								// log(
								// 	`matchedOriginHeaders: ${JSON.stringify(
								// 		matchedOriginHeaders,
								// 		null,
								// 		2
								// 	)}`
								// );
								const { name, uuid } = matchedOriginHeaders[0];
								// log(`name: ${name}`);
								// log(`uuid: ${uuid}`);
								return Object.assign({}, { [sectionUuid]: { name, uuid } });
							})
							.map(matchedUuidHeaderKV => {
								// log(
								// 	`matchedUuidHeaderKV: ${JSON.stringify(
								// 		matchedUuidHeaderKV,
								// 		null,
								// 		2
								// 	)}`
								// );
								return matchedUuidHeaderKV;
							});
					} else {
						return Object.assign({}, { [sectionUuid]: {} });
					}
				})
				.map(extracted => {
					// log(`extracted: ${JSON.stringify(extracted, null, 2)}`);
					return extracted;
				});
		})
		.map(x => {
			// log(`x: ${JSON.stringify(x, null, 2)}`);
			return Object.values(x.flat());
		});
	/* Output should look something like:
		containers: [
			{
				"EE0669EA-0FA8-451D-B911-F7299602458F": {}
			},
			{
				"9533C6B8-599E-4709-9120-9DA8E10A2922": {
					"name": "Icons",
					"uuid": "32CACAE6-AD11-4FD6-B204-A16A17239D94"
				}
			},
			{
				"9533C6B8-599E-4709-9120-9DA8E10A2922": {
					"name": "Components",
					"uuid": "51CA5C83-10FA-4420-B768-A68306EF7656"
				}
			}
		]
	*/
	return assetContainer.flat();
}

// export function formatAssetContainers({ sections } = assetContainers) {
// 	let singletonUuids = [];
// 	sections.forEach((section, idx) => {
// 		if (section.hasOwnProperty("headers") && section.headers.length === 0) {
// 			singletonUuids.push(Object.assign({}, { [section.uuid]: null }));
// 		} else {
// 			section.headers.forEach(header => {
// 				singletonUuids.push(Object.assign({}, { [section.uuid]: header }));
// 			});
// 		}
// 	});
// 	return singletonUuids;
// }

/**
 *
 * @param {string} assetName
 * @param {Array[string]} assetKeywords
 */
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
/**
 *
 * @param {array[{object:{string: {object}}}]} container
 * @param {integer} version
 * @param {integer} page
 * @param {integer} limit
 */

export function getAU(container, version = 0, page = 1, limit = 2000) {
	log(`container: ${JSON.stringify(container, null, 2)}`);
	let assetUuids = [];
	return Object.values(container).map(cSection => {
		return Object.entries(cSection).map(([secUuid, header]) => {
			if (
				Object.entries(header).length === 0 &&
				header.constructor === Object
			) {
				log(`section----------------------------`);
				log(`secUuid: ${secUuid}`);
				log(`header: ${JSON.stringify(header, null, 2)}`);
				// let sec = await lingo.fetchSection(secUuid, version, page, limit);
				let sec = lingo
					.fetchSection(secUuid, version, page, limit)
					.then(val => {
						log(`val: ${JSON.stringify(val, null, 2)}`);
						return val;
					})
					.catch(err => {
						return err;
					});
				log(`sec: ${JSON.stringify(sec, null, 2)}`);
				return sec;
			} else {
				log(`header----------------------------`);
				log(`secUuid: ${secUuid}`);
				log(`header: ${JSON.stringify(header, null, 2)}`);
				log(`header.uuid: ${header.uuid}`);
				let head = lingo
					.fetchAssetsForHeading(secUuid, header.uuid)
					.then(val => {
						log(`valhead: ${JSON.stringify(val, null, 2)}`);
						return val;
					})
					.catch(err => {
						return err;
					});
				log(`head: ${JSON.stringify(head, null, 2)}`);
				return head;
			}
		});
	});
}
export async function getAssetUuids(
	singletonUuids,
	version = 0,
	page = 1,
	limit = 2000
) {
	//TODO: Extract name from getAssetUuid (to name the file)
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
				//TODO: Check if possible to add version / page / limit
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

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param {object} asset
 * @param {string} outFormat
 * @param {string} outDir
 */
export async function batchDownload(
	asset,
	outFormat = "png",
	outDir = "./downloads"
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

export async function init(
	kitName = "Test Me",
	extractTarget = null,
	outputDirectory = "./downloads",
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
	try {
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
	} catch (err) {
		log(`init() ${err}`);
	}
}

// Working:
// init(
// 	"Capswan - Mobile App - Style Guide",
// 	config.capswan.targetOne,
// 	"./downloads/capswanOne",
// 	"PNG"
// );

// Spontaneously stopped working:
// init(
// 	"Capswan - Mobile App - Style Guide",
// 	config.capswan.targetTwo,
// 	"./downloads/capswanTwo",
// 	"png"
// );
// init("Test Me", config.testMe.targetOne, "./downloads/testMeOne", "PNG");
// init("Test Me", config.testMe.targetTwo, "./downloads/testMeTwo", "png");
