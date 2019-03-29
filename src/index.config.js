export default {
	testMe: {
		targetOne: {
			sections: [
				{
					name: "Illustrations"
				}
			]
		},
		targetTwo: {
			sections: [
				{
					name: "Illustrations",
					headers: ["Lined"]
				}
			]
		}
	},
	capswan: {
		targetOne: {
			sections: [
				{
					name: "Illustrations"
				},
				{
					name: "Icons",
					headers: ["Icons", "Components"]
				}
			]
		},
		targetTwo: {
			sections: [
				{
					name: "Icons"
				}
			]
		}
	}
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
