const User = require('../models/userModel.js');

const createUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};

const getUserById = async (userId) => {
    return await User.findById(userId);
};

const getUsers = async () => {
    return await User.find({ isActive: true });
};

const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

const softDeleteUser = async (userId) => {
    return await User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
};

module.exports = {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    softDeleteUser
};
