const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [ 3, 'Firstname must be at least 3 characters long' ],
        },
        lastName: {
            type: String,
            minlength: [ 3, 'Lastname must be at least 3 characters long' ],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ]
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },

    status : {
        type : String,
        enum : ['active', 'inactive'],
        default : 'inactive',
    },
    vehicle : {
        color : {
            type : String,
            required : true,
            minlength : [3, 'Color name must be at least 3 character long']
        }, 
        plate : {
            type : String,
            required : true,
            minlength : [8, 'Plate number must be at least 8 character long']
        }, 
        capacity : {
            type : Number, 
            required : true,
            minlength : [1, 'Capacity must be at least 1'] 
        },
        vehicleType : {
            type : String,
            required : true,
            enum : ['car', 'motercycle', 'auto'],
        }, 
    },
    location : {
        lat : {
            type : Number,
        },
        lng : {
            type : Number,
        }
    }
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
 
const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;
