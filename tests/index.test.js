const log = console.log;
import test from "ava";
import lingo from "Lingojs";
import {
	getRelevantAssetContainers,
	getKitId,
	getLingoSetupVariables,
	getAssetUuids,
	formatAssetContainers,
	batchDownload
} from "../src/index";

import * as laf from "../build/main.js";
import config from "../src/index.config";

const kitName = "Test Me";
const kitNameAccessor = "testMe";

/*
 * **********************************
 * ./src/index.js
 * **********************************
 */
test.before(t => {
	let lsConfig = getLingoSetupVariables(
		process.env.SPACE_ID,
		process.env.API_TOKEN
	);
	lingo.setup(lsConfig[0], lsConfig[1]); //[0] => spaceId, [1] => apiToken
});

/*
TODO: Store results of each async call in global variables to avoid hitting API rate limit
* All of the skipped test *should* work. 
* They're skipped because each of the function calls is stacked. 
* Skipping prevents unnecssary API roundtrips and mitigates risk of hitting rate limit.
* Better solution would be to store return values of each stage globally and pass along.
*/
//TODO: Change tests to be more concrete than snapshots
test.skip(`getKitId :: ${kitName}`, async t => {
	t.snapshot(await getKitId(kitName));
	// log(`id: ${id}`);
});
test.skip(`getRelevantAssetContainers :: ${kitName} - Target One`, async t => {
	t.snapshot(
		await getRelevantAssetContainers(
			await getKitId(kitName),
			config[kitNameAccessor]["targetOne"]
		)
	);
});
test.skip(`getRelevantAssetContainers :: ${kitName} - Target Two`, async t => {
	t.snapshot(
		await getRelevantAssetContainers(
			await getKitId(kitName),
			config[kitNameAccessor]["targetTwo"]
		)
	);
});
test.skip(`getAssetUuids :: ${kitName} - Target One`, async t => {
	t.snapshot(
		await getAssetUuids(
			formatAssetContainers(
				await getRelevantAssetContainers(
					await getKitId(kitName),
					config[kitNameAccessor]["targetOne"]
				)
			)
		)
	);
});
test.skip(`getAssetUuids :: ${kitName} - Target Two`, async t => {
	t.snapshot(
		await getAssetUuids(
			formatAssetContainers(
				await getRelevantAssetContainers(
					await getKitId(kitName),
					config[kitNameAccessor]["targetTwo"]
				)
			)
		)
	);
});

test.skip(`batchDownloads:: ${kitName} - Target One`, async t => {
	t.snapshot(
		await batchDownload(
			await getAssetUuids(
				formatAssetContainers(
					await getRelevantAssetContainers(
						await getKitId(kitName),
						config[kitNameAccessor]["targetOne"]
					)
				)
			)
		)
	);
});
test.skip(`batchDownloads :: ${kitName} - Target Two`, async t => {
	t.snapshot(
		await batchDownload(
			await getAssetUuids(
				formatAssetContainers(
					await getRelevantAssetContainers(
						await getKitId(kitName),
						config[kitNameAccessor]["targetTwo"]
					)
				)
			)
		)
	);
});

/*
 * **********************************
 * ./build/main.js
 * **********************************
 */
test(`init :: ${kitName} - Target One`, async t => {
	t.truthy(
		laf.init(
			kitName,
			config[kitNameAccessor]["targetOne"],
			"./downloads/testMeOne",
			"PNG"
		)
	);
});

test(`init :: ${kitName} - Target Two`, async t => {
	t.truthy(
		laf.init(
			kitName,
			config[kitNameAccessor]["targetTwo"],
			"./downloads/testMeOne",
			"PNG"
		)
	);
});
