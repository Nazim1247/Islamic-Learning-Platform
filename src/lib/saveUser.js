import dbConnect, { collectionNameObj } from './dbConnect';

export const saveUserToDB = async (user) => {
  
  const usersCollection = dbConnect(collectionNameObj.userCollection);

  const existingUser = await usersCollection.findOne({ email: user.email });

  if (!existingUser) {
    const newUser = {
      name: user.name,
      email: user.email,
      image: user.image,
      role: "student",
      createdAt: new Date(),
    };
    await usersCollection.insertOne(newUser);
    console.log("✅ New user saved in MongoDB");
  } else {
    console.log("ℹ️ User already exists");
  }
};
