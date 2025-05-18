let common = [
  "features/**/*.feature",
  "--require-module ts-node/register",
  "--require features/**/*.ts",
].join(" ");

module.exports = {
  default: common,
};
