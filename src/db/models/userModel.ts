import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
    },

    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },

    watchList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
        },
    ],
    avatar: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        default: 0
    },
    
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
