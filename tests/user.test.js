const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/userModel');
const { connectDB, disconnectDB } = require('../config/db');

// Connect to the database before running the tests
beforeAll(async () => {
    await connectDB();
});

// Disconnect from the database after all tests are done
afterAll(async () => {
    await disconnectDB();
});

// Clear the database before each test
beforeEach(async () => {
    await User.deleteMany();
});

describe('User API', () => {
    describe('POST /api/worko/user', () => {
        it('should create a new user', async () => {
            const userData = {
                email: 'test@example.com',
                name: 'Test User',
                age: 25,
                city: 'Test City',
                zipCode: '12345'
            };

            const response = await request(app)
                .post('/api/worko/user')
                .send(userData)
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.email).toBe(userData.email);
        });

        it('should return 400 on invalid user data', async () => {
            const invalidUserData = {
                email: 'invalidemail', // Invalid email format
                name: 'Test User',
                age: 25,
                city: 'Test City',
                zipCode: '12345'
            };

            await request(app)
                .post('/api/worko/user')
                .send(invalidUserData)
                .expect(400);
        });
    });

    describe('GET /api/worko/user', () => {
        it('should get a list of users', async () => {
            await User.create({
                email: 'test1@example.com',
                name: 'User One',
                age: 30,
                city: 'City One',
                zipCode: '11111'
            });

            await User.create({
                email: 'test2@example.com',
                name: 'User Two',
                age: 35,
                city: 'City Two',
                zipCode: '22222'
            });

            const response = await request(app)
                .get('/api/worko/user')
                .expect(200);

            expect(response.body.length).toBe(2);
            expect(response.body[0].email).toBe('test1@example.com');
            expect(response.body[1].email).toBe('test2@example.com');
        });
    });

    describe('GET /api/worko/user/:userId', () => {
        it('should get a user by ID', async () => {
            const newUser = await User.create({
                email: 'test@example.com',
                name: 'Test User',
                age: 25,
                city: 'Test City',
                zipCode: '12345'
            });

            const response = await request(app)
                .get(`/api/worko/user/${newUser._id}`)
                .expect(200);

            expect(response.body.email).toBe(newUser.email);
        });

        it('should return 404 if user ID not found', async () => {
            const invalidUserId = mongoose.Types.ObjectId();

            await request(app)
                .get(`/api/worko/user/${invalidUserId}`)
                .expect(404);
        });
    });

    describe('PUT /api/worko/user/:userId', () => {
        it('should update a user by ID', async () => {
            const newUser = await User.create({
                email: 'test@example.com',
                name: 'Test User',
                age: 25,
                city: 'Test City',
                zipCode: '12345'
            });

            const updatedUserData = {
                name: 'Updated Name',
                age: 30,
                city: 'Updated City'
            };

            const response = await request(app)
                .put(`/api/worko/user/${newUser._id}`)
                .send(updatedUserData)
                .expect(200);

            expect(response.body.name).toBe(updatedUserData.name);
            expect(response.body.age).toBe(updatedUserData.age);
            expect(response.body.city).toBe(updatedUserData.city);
        });

        it('should return 404 if user ID not found', async () => {
            const invalidUserId = mongoose.Types.ObjectId();

            await request(app)
                .put(`/api/worko/user/${invalidUserId}`)
                .send({
                    name: 'Updated Name'
                })
                .expect(404);
        });
    });

    describe('PATCH /api/worko/user/:userId', () => {
        it('should partially update a user by ID', async () => {
            const newUser = await User.create({
                email: 'test@example.com',
                name: 'Test User',
                age: 25,
                city: 'Test City',
                zipCode: '12345'
            });

            const updatedUserData = {
                name: 'Updated Name'
            };

            const response = await request(app)
                .patch(`/api/worko/user/${newUser._id}`)
                .send(updatedUserData)
                .expect(200);

            expect(response.body.name).toBe(updatedUserData.name);
            expect(response.body.email).toBe(newUser.email); // Check that other fields are not modified
        });

        it('should return 404 if user ID not found', async () => {
            const invalidUserId = mongoose.Types.ObjectId();

            await request(app)
                .patch(`/api/worko/user/${invalidUserId}`)
                .send({
                    name: 'Updated Name'
                })
                .expect(404);
        });
    });

    describe('DELETE /api/worko/user/:userId', () => {
        it('should soft delete a user by ID', async () => {
            const newUser = await User.create({
                email: 'test@example.com',
                name: 'Test User',
                age: 25,
                city: 'Test City',
                zipCode: '12345'
            });

            await request(app)
                .delete(`/api/worko/user/${newUser._id}`)
                .expect(200);

            const deletedUser = await User.findById(newUser._id);
            expect(deletedUser.isActive).toBe(false);
        });

        it('should return 404 if user ID not found', async () => {
            const invalidUserId = mongoose.Types.ObjectId();

            await request(app)
                .delete(`/api/worko/user/${invalidUserId}`)
                .expect(404);
        });
    });
});
