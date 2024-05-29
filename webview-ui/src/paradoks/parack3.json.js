import { readFileJson } from "./mod";


export class Parack3Json {
  /** @type {string} */
  modDir;

  /**
   * @param {string} filePath
   */
  constructor(filePath) {
    const data = readFileJson(filePath);
    if (!data) {
      throw new Error("Error reading file");
    }

    this.modDir = data.modDir || null;
  }
}