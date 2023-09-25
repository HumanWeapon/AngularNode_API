"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('postgresql://postgres:DWrLaS9kGMhf8KEyQhkU@containers-us-west-35.railway.app:6413/railway'); // Example for postgres
exports.default = sequelize;
