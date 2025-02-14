const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/test");
}

// creating a schema for collections
const student = new mongoose.Schema({
    firstName: {
        type: String,
        required: true, // validation
        unique: true, // index
    },
    faveFoods: [{type: String}],
    info: {
        school: {
            type: String,
        },
        shoeSize: {
            type: Number,
            min: 1,
            max: 12
        },
    }
}, {timestamps: true});

// Convert the schema to a mongo model
const Student = mongoose.model('student', student)

// Connect to the database
// Create a new student document
connect()
    .then(async connection => {
        const student = await Student.create({ firstName: 'John' });
        const found = await Student.find({firstName: "Home"});
        const foundById = await Student.findById(student._id);
        const updated = await Student.findByIdAndUpdate(student._id, {firstName: "Jane"});
    })
    .catch(e => console.error(e))