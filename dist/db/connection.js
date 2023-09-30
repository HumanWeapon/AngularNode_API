"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dataBase = new sequelize_1.Sequelize('postgresql://postgres:DWrLaS9kGMhf8KEyQhkU@containers-us-west-35.railway.app:6413/railway'); // Example for postgres
/*try {
    dataBase.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }*/
exports.default = dataBase;
