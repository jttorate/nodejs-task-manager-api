const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

/** Execute Before Tests */
beforeEach(setupDatabase);

/** Create User */
test('Should signup a new user', async () => {
	const response = await request(app)
		.post('/users')
		.send({
			name: 'SnuBluise',
			email: 'snubluise@gmail.com',
			password: 'hello123!',
		})
		.expect(201);

	const user = await User.findById(response.body.user._id);
	expect(user).not.toBeNull();

	/** Assertions about the response */
	expect(response.body).toMatchObject({
		user: {
			name: 'SnuBluise',
			email: 'snubluise@gmail.com',
		},
		token: user.tokens[0].token,
	});
	expect(user.password).not.toBe('hello123!');
});

/** Login User */
test('Should login existing user', async () => {
	const response = await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: userOne.password,
		})
		.expect(200);

	const user = await User.findById(userOneId);
	expect(response.body.token).toBe(user.tokens[1].token);
});

/** Invalid Login User */
test('Should not login nonexistent user', async () => {
	await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: 'invalidpassword',
		})
		.expect(400);
});

/** Read User Profile */
test('Should get profile for user', async () => {
	await request(app).get('/users/me').set('Authorization', `Bearer ${userOne.tokens[0].token}`).send().expect(200);
});

/** Unauthenticated Read Profile */
test('Should get profile for user', async () => {
	await request(app).get('/users/me').send().expect(401);
});

/** Delete User Profile */
test('Should delete account for user', async () => {
	await request(app).delete('/users/me').set('Authorization', `Bearer ${userOne.tokens[0].token}`).send().expect(200);

	const user = await User.findById(userOneId);
	expect(user).toBeNull();
});

/** Unauthenticated Delete User Profile */
test('Should not delete account for unauthenticated user', async () => {
	await request(app).delete('/users/me').send().expect(401);
});

/** Upload User Avatar */
test('Should upload avatar image', async () => {
	await request(app).post('/users/me/avatar').set('Authorization', `Bearer ${userOne.tokens[0].token}`).attach('avatar', 'tests/fixtures/profile-pic.jpg').expect(200);
	const user = await User.findById(userOneId);
	expect(user.avatar).toEqual(expect.any(Buffer));
});

/** Update User Profile with Valid Fields */
test('Should update valid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			name: 'Jun',
		})
		.expect(200);
	const user = await User.findById(userOneId);
	expect(user.name).toEqual('Jun');
});

/** Update User Profile with Invalid Fields */
test('Should not update invalid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			location: 'Philippines',
		})
		.expect(400);
});
