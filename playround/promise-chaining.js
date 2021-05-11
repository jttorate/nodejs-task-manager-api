require("../src/db/mongoose");
const User = require("../src/models/user");

/** Promise Chaining */
// User.findByIdAndUpdate("6093acfebac58246b8b4ed79", {
//   age: 1,
// })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

/** Async/Await */
const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("6093acfebac58246b8b4ed79", 2)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
