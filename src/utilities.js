const log = console.log;
//TODO: Create uGenerateEnvBoilerplate
//TODO: Update emptyBoilerplate & interactiveBoilerplate with new Env generator
export function uGenerateLAFBoilerplate(configName = ".laf.json", kitNames) {
  if (kitNames.length > 0) {
    let kits = kitNames.map(name => {
      return {
        name,
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
  } else {
    return {
      name: configName,
      kits: [
        {
          name: "",
          sections: [
            {
              name: "",
              headers: [""]
            }
          ]
        }
      ]
    };
  }
}
