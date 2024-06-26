const userService = require('../services/userService');
const userDto = require('../dto/userDto.js');

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body)
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.userId);
        if(!user) return res.status(404).json({ message: 'User not found' })
           res.status(200).json(userDto(user)); 
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users.map(userDto))
    } catch (error) {
        res.status(500).json({ message: err.message })   
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.userId, req.body);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(userDto(user));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const softDeleteUser = async (req, res) => {
    try {
        const user = await userService.softDeleteUser(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(userDto(user));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    softDeleteUser
};

