import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const SiteStats = sequelize.define('SiteStats', {
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  timestamps: true,
});

export default SiteStats;
