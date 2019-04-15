# Lingo Asset Fetcher - Library

> Automate fetching assets from your lingo workspace to your local project

![Travis CI](https://travis-ci.org/servexyz/lingo-asset-fetcher-lib.svg?branch=master)

---

## Installation

```
npm install laf-lib -D
```

## Usage

#### Core Experience

This is intended to be used with [laf](https://www.npmjs.com/package/laf)

#### Programmatic Usage

1. Create a configuration object, like so:

```json
{
  "sections": [
    {
      "name": "Illustrations"
    },
    {
      "name": "Icons",
      "headers": ["Icons", "Components"]
    }
  ]
}
```

These configurations are specific to my project, which currently looks like:

![lingo_kit_screenshot](./docs/capswan_lingo.png)

```js
init(
  "Capswan - Mobile App - Style Guide",
  config.capswan.targetOne,
  "./downloads/capswan/One",
  "PNG"
);
```
