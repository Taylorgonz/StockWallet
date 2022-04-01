const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Sell extends Model {};

Sell.init (
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        symbol: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        bought_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        sold_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamp: true,
        underscored:true,
        modelName: 'sell'
    }
);

module.exports = Sell;