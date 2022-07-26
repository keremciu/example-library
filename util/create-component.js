require("colors");
const fs = require("fs");
const templates = require("./templates");

const componentName = process.argv[2];

if (!componentName) {
  console.error("Please supply a valid component name".red);
  process.exit(1);
}

console.log("Creating Component Templates with name: " + componentName);

const componentDirectory = `./src/${componentName}`;

if (fs.existsSync(componentDirectory)) {
  console.error(`Component ${componentName} already exists.`.red);
  process.exit(1);
}

fs.mkdirSync(componentDirectory);

const generatedTemplates = templates.map((template) => template(componentName));

generatedTemplates.forEach((template) => {
  let cssModuleExtension = ''
  if (template.extension === '.scss') {
    cssModuleExtension = '.module'
  }

  fs.writeFileSync(
    `${componentDirectory}/${componentName}${cssModuleExtension}${template.extension}`,
    template.content
  );
});

// create index file
fs.writeFileSync(
  `${componentDirectory}/index${generatedTemplates[0].extension}`,
  `export { default } from "./${componentName}";`
);

console.log(
  "Successfully created component under: " + componentDirectory.green
);
