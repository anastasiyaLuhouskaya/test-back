import fs from "fs/promises";

(async () => {
  const [csvPath, columnNumber, query] = process.argv.slice(2);

  const lowercasedFindQuery = query ? query.toLowerCase() : "";

  const csvString = await fs.readFile(csvPath, { encoding: "utf-8" });

  const csvMatrix = csvString.split("\n").map((row) => {
    const splittedRow = row.split(",");
    const sanitizedLastQueryInRow = splittedRow[splittedRow.length - 1].replace(
      "\r",
      ""
    );

    splittedRow[splittedRow.length - 1] = sanitizedLastQueryInRow;

    return splittedRow;
  });

  if (!csvMatrix) {
    throw new Error("");
  }

  const [findedRow] = csvMatrix.filter((row) => {
    const lowercasedQueryInRow = row[columnNumber].toLowerCase();

    if (lowercasedQueryInRow === lowercasedFindQuery) {
      return row;
    }
  });

  if (!findedRow) {
    return console.log(csvMatrix);
  }

  return console.log(findedRow.join(","));
})();
