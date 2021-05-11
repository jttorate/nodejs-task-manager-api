require("../src/db/mongoose");
const Task = require("../src/models/task");

/** Promise Chaining */
// Task.findByIdAndDelete("6093966f1c801a0d0cbc6df2")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

/** Async/Await */
const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("6093b87bde87bc1d6090c6bc")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
