import * as chai from "chai";
import chaiHttp = require("chai-http");
import * as spies from "chai-spies";
import * as dotenv from "dotenv";

import App from "@/App";
import { ERRORS } from "@/constants";
import Database from "@/Database";
import getModels from "@/models";

dotenv.config();
chai.should();
chai.use(chaiHttp);
chai.use(spies);
// TODO: db config 따로 가져가야합니다.
new Database({
  host: process.env.DB_HOST,
  name: process.env.DB_NAME,
  port: process.env.DB_HOST,
}).connect();
(global as any).app = new App().app;
(global as any).errors = ERRORS;
(global as any).models = getModels();
(global as any).assertError = (error, compareObj) => {
  const errorObj = JSON.parse(error);
  errorObj.message.should.to.equal(compareObj.en);
  errorObj.type.should.to.equal("error");
};
