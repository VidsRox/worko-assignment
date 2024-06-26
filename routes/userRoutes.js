const express = require('express');
const userController = require('../controllers/userController');
const { auth } = require('../middlewares/auth');
const { createUserSchema, updateUserSchema } = require('../validators/userValidator');
const validate = require('../middlewares/validate.js');

const router = new express.Router();

router.post('/worko/user', validate(createUserSchema), userController.createUser);
router.get('/worko/user', auth, userController.getUsers);
router.get('/worko/user/:userId', auth, userController.getUserById);
router.put('/worko/user/:userId', auth, validate(updateUserSchema), userController.updateUser);
router.patch('/worko/user/:userId', auth, validate(updateUserSchema), userController.updateUser);
router.delete('/worko/user/:userId', auth, userController.softDeleteUser);

module.exports = router;