const sequelize = require('../config/connection');
const { User, Project } = require('../models');

const userData = require('./userData.json');
const cardioData = require('./cardioData.json');
const logData = require('./logData.json');
const weightTrainingData = require('./weightTrainingData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
