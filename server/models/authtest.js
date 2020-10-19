module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authtestdata', {
    authtestdata: DataTypes.STRING, //think of authtestdata as a string like "testdata"
    owner: DataTypes.INTEGER // the "owner" is a number, a foreign key, that will point to a specific user on the users table
  });
};