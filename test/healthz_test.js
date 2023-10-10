// const app = require('../index.js').app;
// const { describe, it } = require('mocha');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const { dbconnect } = require('../connection');

// const { expect } = chai;

// chai.use(chaiHttp);

// describe("CI Testing for GET/healthz", () => {
//   it("Successfully check the Db connection", async function() {
//     this.timeout(5000); // Set a longer timeout (e.g., 5000ms) for this test

//     let dbstatus = true;

//     try {
//       dbconnect();
//       const response = await chai.request(app).get("/healthz");
//       expect(response).to.have.status(200);
//     } catch (error) {
//       console.error("Test Error:", error);
//       dbstatus = false;
//       expect(dbstatus, "Database connection failed").to.be.true;
//     } finally {
//       setTimeout(() => {
//         process.exit(0); 
//       }, 3000); // 
//     }
//   });
// });

const server = require("../connection.js").dbconnect;
const { describe } = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index.js").app; // Adjust the path to your app's entry point

const { expect } = chai;

chai.use(chaiHttp);

describe("CI Testing for GET/healthz", () => {
  it("Successfully check the Db connection", async () => {
    // let dbstatus = true;
    server()
    try {
      const response = await chai.request(app).get("/healthz");
      expect(response).to.have.status(200);
    } catch (error) {
      console.error("Test Error:", error);

      dbstatus = false;

      expect(dbstatus, "Database connection failed").to.be.true;
    } 
    finally {
      setTimeout(() => {
        process.exit(0);
      }, 2000); //
    }
  });
  // setTimeout(() => {
  //   process.exit(0);
  // }, 5000); //
});



// const server = require("../connection.js").conn;
// const { describe, it } = require("mocha");
// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const app = require("../index.js").app;

// const { expect } = chai;

// chai.use(chaiHttp);

// describe("CI Testing for GET/healthz", () => {
//   it("Successfully check the Db connection", async function() {
//     // Set a longer timeout for this specific test
//     this.timeout(10000); // Adjust the timeout as needed

//     let dbstatus = true;

//     try {
//       await server(); // Wait for the dbconnect to complete
//       const response = await chai.request(app).get("/healthz");
//       expect(response).to.have.status(200);
//     } catch (error) {
//       console.error("Test Error:", error);
//       dbstatus = false;
//       expect(dbstatus, "Database connection failed").to.be.true;
//     }
//   });
// });
