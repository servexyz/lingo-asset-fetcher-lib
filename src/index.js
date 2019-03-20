require("dotenv").config();
const log = console.log;
const lingo = require("Lingojs");

// log(`SPACE_ID: ${process.env.SPACE_ID}`);
// log(`API_TOKEN: ${process.env.API_TOKEN}`);

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
		/*
			[
				{
					"date_added": "2019-03-12 22:48:16.431471+0000",
					"date_updated": "2019-03-12 22:48:16.431471+0000",
					"kit_uuid": "5889C55A-CDD4-48D7-9F6F-28B92635E5A6",
					"name": "Capswan - Mobile App - Style Guide",
					"space_id": 96871,
					"status": "active",
					"use_version": 0,
					"versions": []
				},
				{
					"date_added": "2019-03-20 00:26:43.541094+0000",
					"date_updated": "2019-03-20 00:26:43.541094+0000",
					"kit_uuid": "BAC26B71-CFC9-4439-95D0-8123BD15AD95",
					"name": "Fake Kit",
					"space_id": 96871,
					"status": "active",
					"use_version": 0,
					"versions": []
				}
			]
		*/
	} catch (err) {
		log(`getKitId() ${err}`);
	}
}

/*
{
	"display_order": 0,
	"headers": [
		{
			"display_order": -155,
			"name": "Icons",
			"uuid": "32CACAE6-AD11-4FD6-B204-A16A17239D94",
			"version": 0
		},
		{
			"display_order": -72,
			"name": "Components",
			"uuid": "51CA5C83-10FA-4420-B768-A68306EF7656",
			"version": 0
		},
			{
				"display_order": -43,
				"name": "Cards",
				"uuid": "30022795-1C54-47F8-A908-51822C4B5C61",
				"version": 0
			},
			{
				"display_order": -31,
				"name": "Images",
				"uuid": "858C4427-ACE3-4097-A406-64C40C08B81B",
				"version": 0
			},
			{
				"display_order": -26,
				"name": "Fonts",
				"uuid": "77241E88-EDC7-4786-B0F4-1755CFCE1DF1",
				"version": 0
			},
			{
				"display_order": -20,
				"name": "Color - Hexcodes",
				"uuid": "46791A96-E3B1-44D5-AB7A-E5752691846F",
				"version": 0
			},
			{
				"display_order": -6,
				"name": "Color - Swatches - 1",
				"uuid": "0B0EEB54-9138-4319-AB07-5ABE47071FF3",
				"version": 0
			},
			{
				"display_order": 250,
				"name": "Color - Swatches - 2",
				"uuid": "9FC7ADA2-6B75-49A6-A970-278D36FA5B30",
				"version": 0
			},
			{
				"display_order": 699,
				"name": "Color - Swatches - 3",
				"uuid": "15770C6C-CFB6-437F-AC39-B26542A015D3",
				"version": 0
			}
		],
		"name": "Icons",
		"uuid": "9533C6B8-599E-4709-9120-9DA8E10A2922",
		"version": 0
	}
	k:1
	v:{
		"display_order": 2,
		"headers": [
			{
				"display_order": -20,
				"name": "Color",
				"uuid": "6584BC14-E470-46B8-95DB-2F32D900190D",
				"version": 0
			}
		],
		"name": "Illustrations",
		"uuid": "EE0669EA-0FA8-451D-B911-F7299602458F",
		"version": 0
	}
	*/

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

let capswanSampleExtractTargetTwo = [
	{
		Icons: ["Icons"]
	}
];

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
