const fs = require("fs");
const ini = require("ini");
`
version="3.2.14"
name="Community Flavor Pack"
picture="thumbnail.png"
supported_version="1.12.*"
path="C:/Program Files (x86)/Steam/steamapps/workshop/content/1158310/2220098919"
remote_file_id="2220098919"
`;

export class Mod {
  constructor(filePath) {
    const data = fs.readFileSync(filePath, "utf-8");
    if (!data) {
      throw new Error("Error reading file");
    }

    const parsedData = ini.parse(data);
    this.version = parsedData.version || null;
    this.name = parsedData.name || null;
    this.picture = parsedData.picture || null;
    this.supported_version = parsedData.supported_version || null;
    this.path = parsedData.path || null;
    this.remote_file_id = parsedData.remote_file_id || null;
  }
}

export function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}

export function readFileJson(filePath) {
  try {
    const settingsData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(settingsData);
  } catch (error) {
    console.error("Error reading settings file:", error);
    return null;
  }
}

export function iterateFiles(dirPath, fileFunc, recursively = false) {
  console.log(`Iterating files in ${dirPath}`);

  try {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        fileFunc(dirPath, file, stats);
      } else if (recursively && stats.isDirectory()) {
        iterateFiles(filePath, fileFunc, recursively);
      }
    });
  } catch (err) {
    throw new Error("Unable to scan directory: " + err);
  }
}

export function parseMods(modsDir) {
  let mods = [];

  iterateFiles(modsDir, function(dirPath, filePath, stats) {
    const mod = new Mod(path.join(dirPath, filePath));
    console.log(mod);
    mods.push(mod);
  });

  return mods;
}
