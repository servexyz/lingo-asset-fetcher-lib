//TODO: Create uGenerateEnvBoilerplate
//TODO: Update emptyBoilerplate & interactiveBoilerplate with new Env generator
export function uGenerateLAFBoilerplate(configName = ".laf.json", kitNames) {
  let kits = kitNames.map(kit => {
    log(`kit.name: ${kit.name}`);
    return {
      name: kit.name,
      sections: [
        {
          name: "",
          headers: [""]
        }
      ]
    };
  });
  return {
    name: configName,
    value: {
      kits
    }
  };
}
