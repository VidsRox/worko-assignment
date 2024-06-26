const userDao = require('../daos/userDao');

const createUser = async (userData) => {
    return await userDao.createUser(userData);
};

const getUserById = async (userId) => {
    return await userDao.getUserById(userId);
};

const getUsers = async () => {
    return await userDao.getUsers();
};

const updateUser = async (userId, updateData) => {
    return await userDao.updateUser(userId, updateData);
};

const softDeleteUser = async (userId) => {
    return await userDao.softDeleteUser(userId);
};

module.exports = {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    softDeleteUser
};
