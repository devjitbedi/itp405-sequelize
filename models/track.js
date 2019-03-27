const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('track', {
  id: {
    field: 'TrackId',
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    field: 'Name',
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Name is required'
      }
    }
  }, 
  milliseconds: {
    field: 'Milliseconds',
    type: Sequelize.STRING,
    validate: {
      isNumeric: {
        args: true,
        msg: 'Milliseconds needs to be a number'
      }
    }
  }, 
  unitPrice: {
    field: 'UnitPrice',
    type: Sequelize.STRING,
    validate: {
      isNumeric: {
        args: true,
        msg: 'Unit price needs to be a number'
      }
    }
  }
}, 
{
  timestamps: false
});
