require("dotenv").config();
const log = console.log;
import fs from "fs-extra";
import lingo from "lingo-sdk";

// import config from "./lingo.config"; // For init tests
// import { DateTime } from "luxon"; // For fs.outputFile

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

/**
 * getRelevantAssetContainer
 * @param {*} kitId
 * @param {*} extractTarget
 * @param {*} kitVersion
 */
export async function getRelevantAssetContainer(
  kitId,
  extractTarget,
  kitVersion = 0
) {
  //getRelevantAssetContainer
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
  return assetContainer.flat();
}

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

export async function getAssetUuids(
  container,
  version = 0,
  page = 1,
  limit = 2000
) {
  try {
    var assetUuids = [];
    for (let c of container) {
      for (const [sectionUuid, header] of Object.entries(c)) {
        let headerUuid = header.uuid;
        if (headerUuid === null || headerUuid === undefined) {
          // http://developer.lingoapp.com/lingojs/#sections
          var section = await lingo.fetchSection(
            sectionUuid,
            version,
            page,
            limit
          );
          // fs.outputFileSync(
          //   `./src/payloads/${DateTime.local().toISODate()}/section.json`,
          //   JSON.stringify(section, null, 2)
          // );
          for (let item of section.items) {
            // log(`item: ${item}`); // ?
            if (item.asset_uuid !== null) {
              if (item.asset.hasOwnProperty("keywords")) {
                var fileName = buildFileName(
                  item.asset.name,
                  item.asset.keywords
                );
              } else {
                fileName = item.asset.name;
              }
              assetUuids.push(
                Object.assign({}, { [item.asset_uuid]: fileName })
              );
              assetUuids;
            }
          }
        } else {
          // http://developer.lingoapp.com/lingojs/#heading-contents
          var headerAssets = await lingo.fetchAssetsForHeading(
            sectionUuid,
            headerUuid
          );
          // fs.outputFileSync(
          //   `./src/payloads/${DateTime.local().toISODate()}/headerAssets.json`,
          //   JSON.stringify(headerAssets, null, 2)
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
        fs.outputFileSync(
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

/**
 *
 * @param {string} kitName
 * @param {object} extractTarget
 * @param {string} outputDirectory
 * @param {string} outputFormat
 * @param {string} spaceId
 * @param {string} apiToken
 * @param {int} kitVersion
 */
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
  let lsConfig = getLingoSetupVariables(spaceId, apiToken); //Allow overwriting of env variables from init function
  lingo.setup(lsConfig[0], lsConfig[1]); //[0] => spaceId, [1] => apiToken
  try {
    await batchDownload(
      await getAssetUuids(
        await getRelevantAssetContainer(
          await getKitId(kitName),
          extractTarget,
          kitVersion
        )
      ),
      outputFormat,
      outputDirectory
    );
    return true;
  } catch (err) {
    log(`init() ${err}`);
    return false;
  }
}

/////////////////////////////////////
// * Capswan
/////////////////////////////////////

// init(
// 	"Capswan - Mobile App - Style Guide",
// 	config.capswan.targetOne,
// 	"./downloads/capswan/One",
// 	"PNG"
// );
// init(
// 	"Capswan - Mobile App - Style Guide",
// 	config.capswan.targetTwo,
// 	"./downloads/capswan/Two",
// 	"png"
// );

/////////////////////////////////////
// * TestMe
/////////////////////////////////////
// ? The reason this was failing before was because "Illustrated" was capitalized in config, but "illustrated" was lowercase in Lingo
// init("Test Me", config.testMe.targetOne, "./downloads/testMe/One", "PNG");
// init("Test Me", config.testMe.targetTwo, "./downloads/testMe/Two", "png");
