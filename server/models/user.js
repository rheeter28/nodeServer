module.exports = function(sequelize, DataTypes) {
          //1       //2
  return sequelize.define('user', {
    username: DataTypes.STRING, //3
    passwordhash: DataTypes.STRING //3
});

};