require("dotenv").config();
const log = console.log;
const lingo = require("Lingojs");

/**
 * @param {int} spaceId :: Lingo Space ID (6 digits)
 * @param {int} apiToken :: Account root API
 */
function getLingoSetupVariables(spaceId, apiToken) {
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

async function getKitId(kitName = "Capswan - Mobile App - Style Guide") {
	//TODO: Add test for accounts which only have single kit
	//? Not sure whether this is going to be an issue given that the data
	//? structure would change based on how many kits are returned
	let kitUuid;
	try {
		let kits = await lingo.fetchKits();
		for (const [k, v] of Object.entries(kits)) {
			// log(`k: ${JSON.stringify(k, null, 2)}\nv:${JSON.stringify(v, null, 2)}`);
			if (v.name === kitName) {
				kitUuid = v.kit_uuid;
			}
			// log(`kitUuid: ${kitUuid}`);
			return kitUuid;
		}
	} catch (err) {
		log(`getKitId() ${err}`);
	}
}

async function getRelevantAssetContainers(
	kitId,
	extractTarget,
	kitVersion = 0
) {
	try {
		let uuids = { sections: [] };
		let outline = await lingo.fetchKitOutline(kitId, kitVersion);
		//TODO: Make this work with capswanExampleTargetTwo (ie. Single section per kit)
		extractTarget.sections.forEach(targetSec => {
			// log(`targetSec:${JSON.stringify(targetSec, null, 2)}`);
			//TODO: Rename "originSec" to "outlineSec" for clarity
			for (const originSec of Object.values(outline)) {
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
			}
		});
		log(JSON.stringify(uuids, null, 2));
		return outline;
	} catch (err) {
		log(`getRelevantAssetContainers() ${err}`);
	}
}

let capswanSampleExtractTargetOne = {
	sections: [
		{
			name: "Illustrations"
		},
		{
			name: "Icons",
			headers: ["Icons", "Components"]
		}
	]
};
/* Sample output from capswanExampleExtractTargetOne =>
{
  "sections": [
    {
      "name": "Illustrations",
      "uuid": "EE0669EA-0FA8-451D-B911-F7299602458F",
      "headers": []
    },
    {
      "name": "Icons",
      "uuid": "9533C6B8-599E-4709-9120-9DA8E10A2922",
      "headers": [
        "32CACAE6-AD11-4FD6-B204-A16A17239D94",
        "51CA5C83-10FA-4420-B768-A68306EF7656"
      ]
    }
  ]
}
*/

let capswanSampleExtractTargetTwo = {
	sections: [
		{
			Icons: ["Icons"]
		}
	]
};

async function init(
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
	await getRelevantAssetContainers(await getKitId(), extractTarget, kitVersion);
}

//TODO: Change this to TargetTwo
init(capswanSampleExtractTargetOne);
