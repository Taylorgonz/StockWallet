const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Buy extends Model {};

Buy.init (
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
        exchange: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },

        amount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        total: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        }
    
    },
    {
        sequelize,
        timestamp: true,
        underscored:true,
        modelName: 'buy'
    }
);

module.exports = Buy;