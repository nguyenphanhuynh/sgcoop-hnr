require("dotenv").config();

module.exports = {
  configDB: {
    user: process.env.APP_DB_USER || "sgcoop",
    host: process.env.DB_HOST || "postgresdb",
    database: process.env.APP_DB_NAME || "sgcoop",
    password: process.env.APP_DB_PASS || "sgcoop123",
    port: 5432
  }
};

// module.exports = {
//   configDB: {
//     user: "sgcoop",
//     host: "postgresdb",
//     database: "sgcoop",
//     password: "sgcoop123",
//     port: 5432
//   }
// };
