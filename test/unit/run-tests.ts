import Mocha from "mocha";
import fs from "fs";
import path from "path";

const mocha = new Mocha();

fs.readdirSync("test")
  .filter(function (file) {
    return file.substr(-8) === ".test.ts";
  })
  .forEach(function (file) {
    mocha.addFile(path.join("test", file));
  });

mocha.run(function (failures) {
  process.exitCode = failures ? 1 : 0;
});
