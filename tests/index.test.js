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
import config from "../src/index.config";

const kitName = "Test Me";
const kitNameAccessor = "testMe";

test.before(t => {
	let lsConfig = getLingoSetupVariables(
		process.env.SPACE_ID,
		process.env.API_TOKEN
	);
	lingo.setup(lsConfig[0], lsConfig[1]); //[0] => spaceId, [1] => apiToken
});
//TODO: Store results of each async call in global variables to avoid hitting API rate limit
//TODO: Change tests to be more concrete than snapshots

test(`getKitId :: ${kitName}`, async t => {
	t.snapshot(await getKitId(kitName));
	// log(`id: ${id}`);
});
test(`getRelevantAssetContainers :: ${kitName} - Target One`, async t => {
	t.snapshot(
		await getRelevantAssetContainers(
			await getKitId(kitName),
			config[kitNameAccessor]["targetOne"]
		)
	);
});
test(`getRelevantAssetContainers :: ${kitName} - Target Two`, async t => {
	t.snapshot(
		await getRelevantAssetContainers(
			await getKitId(kitName),
			config[kitNameAccessor]["targetTwo"]
		)
	);
});
test(`getAssetUuids :: ${kitName} - Target One`, async t => {
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
test(`getAssetUuids :: ${kitName} - Target Two`, async t => {
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

test(`batchDownloads:: ${kitName} - Target One`, async t => {
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
test(`batchDownloads :: ${kitName} - Target Two`, async t => {
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
