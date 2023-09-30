import { Sequelize } from "sequelize";

const dataBase = new Sequelize('postgresql://postgres:DWrLaS9kGMhf8KEyQhkU@containers-us-west-35.railway.app:6413/railway') // Example for postgres

/*try {
    dataBase.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }*/

export default dataBase;