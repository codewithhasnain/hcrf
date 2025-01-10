const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('defaultdb', 'avnadmin', 'AVNS_f9fjsOaNRKY6S-BNsRj', {
    host: 'mysql-2b175d8d-kumailnaqvi382-5c70.c.aivencloud.com',
    port: 22768,
    dialect: 'mysql',
    ssl: {
      rejectUnauthorized: true,
    },
    dialectOptions: {
      connectTimeout: 60000, // Set timeout to 60 seconds
    },
  });
  
// Test the connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to MySQL has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to MySQL:', error);
    }
})();

module.exports = sequelize;
