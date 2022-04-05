const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        select: false,
        required: true,
    },

    passwordResetToken: {
        type: String,
        select: false,
    },

    passwordResetExpires: {
        type: Date,
        select: false,
    },
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
    if(this.password) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    }
    next();
});

UserSchema.pre('updateOne', async function(next) {
    let user = this._update;
    if(admin.password) {
        const hash = await bcrypt.hash(this.password, 10);
        user.password = hash;
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);