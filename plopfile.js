module.exports = function (plop) {
  // create your generators here
  plop.setGenerator("component", {
    description: "this is a skeleton plop-file",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Name of Component",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{name}}.tsx",
        templateFile: "plop-templates/Component.hbs",
      },
    ],
  });
  plop.setGenerator("level", {
    description: "this is a skeleton plop-file",
    prompts: [
      {
        type: "input",
        name: "lvl",
        message: "Number of level",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/game/engine/levels/getLevel{{lvl}}.ts",
        templateFile: "plop-templates/Level.hbs",
      },
    ],
  });
};
