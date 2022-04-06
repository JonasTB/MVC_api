const User = require('../model/user');

module.exports = {
    create: async(req,res) => {
        if(await User.findOne({ email: req.body.email })) return res.users.error({ 'myerror': 'email already registered' });
        await User.create(req.body).then((user) => {
            return res.users.create(user);
        }).catch(res.users.error);
    },

    getMany: async(req, res) => {
        await User.find().then((many) => {
            return res.users.getMany(many);
        }).catch(res.users.error);
    },

    getOne: async(req, res) => {
        await User.findById(req.params.id).then((one) => {
            if(!one) return res.users.error({ 'myerror': 'account not found' });
            res.users.getOne(one);
        }).catch(res.users.error);
    },

    update: async(req, res) => {
        await User.findById({ _id: req.params.id }, { password: req.body.password }, { new: true }).then((updated) => {
            if(!update) return res.users.error({ 'myerror': 'account not found' });
            return res.users.upated(updated);
        }).catch(res.users.error);
    },

    delete: async(req, res) => {
        await User.findByIdAndDelete(req.params.id).then((deleted) => {
            if(!deleted) return res.users.error({ 'myerror': 'account not found' });
            return res.users.deleted(deleted);
        }).catch(res.users.error);
    }
}