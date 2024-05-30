import * as fs from "fs";
import * as ini from "ini";
import * as path from "path";
import * as vscode from "vscode";

`
version="3.2.14"
name="Community Flavor Pack"
picture="thumbnail.png"
supported_version="1.12.*"
path="C:/Program Files (x86)/Steam/steamapps/workshop/content/1158310/2220098919"
remote_file_id="2220098919"
`;

export class Mod {

  public version: string;
  public name: string;
  public picture: string;
  public supported_version: string;
  public path: string;
  public remote_file_id: string;

  constructor(filePath: string) {
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

export function readFile(filePath: string) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}

export function readFileJson(filePath: string) {
  try {
    const settingsData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(settingsData);
  } catch (error) {
    console.error("Error reading settings file:", error);
    return null;
  }
}

export type FileCallback = (dirPath: string, file: string, stats: fs.Stats) => void;

export function iterateFiles(dirPath: string, fileCallback: FileCallback, recursively = false) {
  console.log(`Iterating files in ${dirPath}`);

  try {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        fileCallback(dirPath, file, stats);
      } else if (recursively && stats.isDirectory()) {
        iterateFiles(filePath, fileCallback, recursively);
      }
    });
  } catch (err) {
    throw new Error("Unable to scan directory: " + err);
  }
}

export function parseMods(modsDir: string) {
  let mods: Mod[] = [];

  iterateFiles(modsDir, function(dirPath: string, filePath: string, stats: fs.Stats) {
    const mod = new Mod(path.join(dirPath, filePath));
    console.log(mod);
    mods.push(mod);
  });

  return mods;
}

export function getWorkspacePath(context: vscode.ExtensionContext): string {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length > 0) {
    return workspaceFolders[0].uri.fsPath;
  } else {
    throw new Error("No workspace folder found");
  }
}
