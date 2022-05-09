import { Row } from "../batches/models/batch-api-pieces";

export interface csvFileParts {
  headingsRow: string[];
  fileValueRows: string[];
}

/**
 *
 * @param fileAsString the file as a string
 * @returns
 */
export const getCsvParts = (fileAsString: string): csvFileParts => {
  const fileRows = fileAsString.split("\r\n");
  const titleRows = fileAsString
    .slice(0, fileAsString.indexOf("\n"))
    .split(",")
    .map((x) => toCamelCase(x));

  const result: csvFileParts = {
    headingsRow: titleRows,
    fileValueRows: fileRows.filter((val, index) => index !== 0)
  };
  return result;
};

/**
 *
 * @param headingsRow the headings in string array
 * @param fileValueRows the values in string array. each member is a row not yet separated
 * example: `["val1,val2,val3", "val1a,val2a,val3a"]`
 * @returns
 */
export const getArraysFromCsvParts = (
  headingsRow: string[],
  fileValueRows: string[]
): Row[] => {
  let result: Row[] = [];

  fileValueRows.forEach((row) => {
    let rowCol: string[] = row.split(",");
    // console.log(rowCol, "rowCol from serv");

    let cell = {};
    for (let i = 0; i < headingsRow.length; i++) {
      // console.log(cell, "emptycell from serv");
      // Each row is an object, its label is in the headings row
      Object.defineProperty(cell, `${headingsRow[i]}`, {
        value: rowCol[i],
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
    result.push(cell as Row);
  });
  return result as Row[];
};

export const toCamelCase = (text: string) => {
  if (text == undefined) {
    return ""
  }
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (leftTrim, index) =>
      index === 0 ? leftTrim.toLowerCase() : leftTrim.toUpperCase()
    )
    .replace(/\s+/g, "");
};
