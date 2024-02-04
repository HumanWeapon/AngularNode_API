import { Sequelize } from "sequelize";
const dataBase = new Sequelize('postgresql://postgres:1Fd145Gdd24g1daGfccFdeaCFEdbFDDc@viaduct.proxy.rlwy.net:47331/railway')
//const dataBase = new Sequelize('postgresql://postgres:DWrLaS9kGMhf8KEyQhkU@containers-us-west-35.railway.app:6413/railway') // Conexión vieja

/*try {
    dataBase.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }*/

export default dataBase;