const fs = require("fs");
const path = require("path");

const DATABASE_DIR = "database";
const METADATA_FILE = "metadata.txt";
const TABLE_FILE = "table.txt";

function createTable(query) {
  const columns = query.split("(")[1].split(")")[0].split(",");
  const metadata = columns.map((col) => col.trim()).join(",");

  // Save metadata to metadata file
  fs.writeFileSync(path.join(DATABASE_DIR, METADATA_FILE), metadata);

  // Create an empty table file
  fs.closeSync(fs.openSync(path.join(DATABASE_DIR, TABLE_FILE), "w"));
}

function insertIntoTable(query) {
  const values = query.split("(")[1].split(")")[0].split(",");
  const row = values.map((val) => val.trim()).join(",");

  // Append values to table file
  fs.appendFileSync(path.join(DATABASE_DIR, TABLE_FILE), row + "\n");
}

function processQuery(query) {
  if (query.startsWith("CREATE TABLE")) {
    createTable(query);
  } else if (query.startsWith("INSERT INTO")) {
    insertIntoTable(query);
  } else {
    console.log("Invalid query!");
  }
}

// Create the database directory if it doesn't exist
if (!fs.existsSync(DATABASE_DIR)) {
  fs.mkdirSync(DATABASE_DIR);
}

// Process example queries
const queries = [
  "CREATE TABLE MyTable (col1 INTEGER, col2 STRING)",
  'INSERT INTO MyTable VALUES (1, "Hello")',
  'INSERT INTO MyTable VALUES (2, "World")',
  'INSERT INTO MyTable VALUES (3, "I am Vivek Sharma")',
];

queries.forEach((query) => {
  processQuery(query);
});
