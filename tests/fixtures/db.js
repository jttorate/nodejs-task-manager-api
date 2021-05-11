const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
	_id: userOneId,
	name: 'Nelo',
	email: 'hypenelo@gmail.com',
	password: 'hello123!',
	tokens: [
		{
			token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
		},
	],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
	_id: userTwoId,
	name: 'Junnel',
	email: 'junnel@example.com',
	password: 'hello123!',
	tokens: [
		{
			token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
		},
	],
};

const taskOne = {
	_id: new mongoose.Types.ObjectId(),
	description: 'First Task',
	completed: false,
	owner: userOne._id,
};

const taskTwo = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Second Task',
	completed: true,
	owner: userOne._id,
};

const taskThree = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Third Task',
	completed: true,
	owner: userTwo._id,
};

const setupDatabase = async () => {
	/** User */
	await User.deleteMany();
	await new User(userOne).save();
	await new User(userTwo).save();
	/** Task */
	await Task.deleteMany();
	await new Task(taskOne).save();
	await new Task(taskTwo).save();
	await new Task(taskThree).save();
};

module.exports = {
	setupDatabase,
	userOneId,
	userOne,
	userTwoId,
	userTwo,
	taskOne,
	taskTwo,
	taskThree,
};
