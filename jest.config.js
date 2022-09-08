const { defaults } = require("jest-config");

const config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts", "cts"],
};

module.exports = config;
