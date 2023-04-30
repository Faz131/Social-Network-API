const { Schema, model, Types } = require('mongoose');


const userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
    },

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
    ],

},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const Users = model('Users', userSchema);

module.exports = Users;