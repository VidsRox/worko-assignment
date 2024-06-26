module.exports = (user) => {
    return {
        id: user._id,
        email: user.email,
        name: user.name,
        age: user.age,
        city: user.city,
        zipCode: user.zipCode
    };
};
