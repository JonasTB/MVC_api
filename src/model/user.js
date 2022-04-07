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
        return this.password = hash;
    }
    next();
});

UserSchema.pre("findOneAndUpdate", async function(next){
    if(this._update.password){
        this._update.password = await bcrypt.hash(this._update.password, 10)
    }
    next();
})

module.exports = mongoose.model('User', UserSchema);