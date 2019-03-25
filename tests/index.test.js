const log = console.log;
import test from "ava";
import lingo from "Lingojs";
import {
	getRelevantAssetContainers,
	getKitId,
	getLingoSetupVariables
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
