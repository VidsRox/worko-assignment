const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if(!user) {
            throw new Error();
        }

        req.user= user
        req.token = token
        next();

    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
};

const generateAuthToken = async (user) => {
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

module.exports = { auth, generateAuthToken };