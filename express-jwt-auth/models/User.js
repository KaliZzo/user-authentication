const mongoose = require('mongoose');
const { isEmail } = require('validator');   
const bcrypt =require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an Email'],
        unique: true,
        lowercase: true,
        validate:[isEmail, 'Please enter an Valid Email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an Password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
});

//Example of fire a function after doc saved to db:

// userSchema.post('save', function(doc, next){
//     console.log('New user was created & saved', doc)
//     next();
// })

// //Example fire function before doc saved to db:
// userSchema.pre('save',function(next){
//     console.log('user about to be created & saved', this);
//     next();
// })

//Example fire function before doc saved to db:
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
