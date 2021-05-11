// CRUD - Create, Read, Update, Delete

const { MongoClient, ObjectID, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectID();

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }

    const db = client.db(databaseName);

    /** Promises - START */

    /** Users - Update */
    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectID("6091fa1a136a0a3a4c91ce9d"),
    //     },
    //     {
    //       $set: {
    //         name: "Mike",
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    /** Users - Increment Value */
    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectId("6091fa1a136a0a3a4c91ce9d"),
    //     },
    //     {
    //       $inc: {
    //         age: 1,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    /** Users - Update Many */
    // db.collection("tasks")
    //   .updateMany(
    //     {
    //       completed: false,
    //     },
    //     {
    //       $set: {
    //         completed: true,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result.modifiedCount);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    /** Users - Delete Many */
    // db.collection("users")
    //   .deleteMany({
    //     name: "Nelo",
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    /** Tasks - Delete */
    // db.collection("tasks")
    //   .deleteOne({
    //     description: "My Deliverables",
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    /** Promises - END */

    /** Callbacks - START */

    /** Users - Create */
    // db.collection("users").insertOne(
    //   {
    //     _id: id,
    //     name: "Mark",
    //     age: 28,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user.");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    /** Users - Read */
    // db.collection("users").findOne({ name: "Nelo" }, (error, user) => {
    //   if (error) {
    //     return console.log("Unable to fetch user.");
    //   }

    //   console.log(user);
    // });

    // db.collection("users")
    //   .find({ age: 28 })
    //   .toArray((error, users) => {
    //     if (error) {
    //       return console.log("Unable to fetch users.");
    //     }

    //     console.log(users);
    //   });

    /** Tasks - Read */
    // db.collection("tasks").findOne(
    //   { _id: new ObjectID("6091fe342cf1733910b30d0e") },
    //   (error, task) => {
    //     console.log(task);
    //   }
    // );

    /** Callbacks - END */
  }
);
