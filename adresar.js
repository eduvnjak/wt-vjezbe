const Sequelize = require("sequelize");
const sequelize = require("./baza.js");

module.exports = function (sequelize, DataTypes) {
    const Adresar = sequelize.define('Adresar', {}, {
        freezeTableName: true
    });
    Kontakt = require('./imenik.js')(sequelize);
    Kontakt.belongsToMany(Kontakt, { as: 'poznanik', foreignKey: 'kontaktId', through: Adresar });
    return Adresar;
}
