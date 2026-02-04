const { translation } = require("../core/translation/languages/en.json");

const keys = Object.keys(translation);
let generatedTranslation = {};

const toCamelCase = (input = "") => {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

for (let layer1 of keys) {
  let temporaryObject = {};
  const layer1Keys = Object.keys(translation[layer1]);
  for (let layer2 of layer1Keys) {
    temporaryObject = {
      ...temporaryObject,
      [toCamelCase(layer2)]: `${layer1}.${layer2}`,
    };
  }
  generatedTranslation = {
    ...generatedTranslation,
    [toCamelCase(layer1)]: temporaryObject,
  };
}

const fs = require("fs");
const path = require("path");
const root = process.cwd();
const folder = path.join(root, "constants");
const fileName = path.join(folder, "translation.ts");
const translationContent = `export const translation = ${JSON.stringify(
  generatedTranslation,
  null,
  2
)} as const`;

fs.writeFile(fileName, translationContent, (error = "") => {
  if (error) {
    console.log(error);
  }
});
