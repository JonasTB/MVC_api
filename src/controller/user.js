const User = require('../model/user');

module.exports = {
    create: async(req,res) => {
        await User.create(req.body).then((user) => {
            return res.users.created(user);
        }).catch((err) => {
            res.users.error(err);
        })
    }
}