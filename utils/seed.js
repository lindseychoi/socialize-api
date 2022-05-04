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
        username: "ClarkF",
        email: "clarkf@gmail.com",
      },
      {
        username: "HazelF",
        email: "hazelf@gmail.com",
      },
      {
        username: "BenC",
        email: "benc@gmail.com",
      },
      {
        username: "SherryD",
        email: "sherrygirl@gmail.com",
      },
      {
        username: "DavidD",
        email: "davidd@gmail.com",
      },
  ];

  const seedThoughts = [
      {
        thoughtText: "Today it is raining",
        username: "ClarkF",
      },
      {
        thoughtText:"Tomorrow it will be sunny",
        username: "HazelF",
      },
      {
        thoughtText: "No more snow",
        username: "BenC",
      },
      {
        thoughtText: "This summer we will go paddleboarding",
        username: "SherryD",
      },
      {
        thoughtText: "It's a nice day to take a bike ride",
        username: "DavidD"
      },
  ];

  //enter the users data into the socializeDB
  await User.collection.insertMany(seedUsers);

  //enter the thoughts data into the socializeDB
  await Thought.collection.insertMany(seedThoughts);

  console.info('Seeding complete! 🌱');
  process.exit(0);

});
