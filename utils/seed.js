const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected to socializeDB');
    
  // Drop existing users
    await User.deleteMany({});

  // Drop existing thoughts
    await Thought.deleteMany({});
  

  const seedUsers = [
      {
        userName: "ClarkF",
        email: "clarkf@gmail.com",
      },
      {
        userName: "HazelF",
        email: "hazelf@gmail.com",
      },
      {
        userName: "BenC",
        email: "benc@gmail.com",
      },
      {
        userName: "SherryD",
        email: "sherrygirl@gmail.com",
      },
      {
        userName: "DavidD",
        email: "davidd@gmail.com",
      },
  ];

  const seedThoughts = [
      {
        thoughtText: "Today it is raining",
        userName: "ClarkF",
      },
      {
        thoughtText:"Tomorrow it will be sunny",
        userName: "HazelF",
      },
      {
        thoughtText: "No more snow",
        userName: "BenC",
      },
      {
        thoughtText: "This summer we will go paddleboarding",
        userName: "SherryD",
      },
      {
        thoughtText: "It's a nice day to take a bike ride",
        userName: "DavidD",
      },
  ];

  //enter the users data into the socializeDB
  await User.collection.insertMany(seedUsers);

  //enter the thoughts data into the socializeDB
  await Thought.collection.insertMany(seedThoughts);

  console.info('Seeding complete! 🌱');
  process.exit(0);

});
