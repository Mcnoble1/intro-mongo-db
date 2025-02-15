const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/test");
}

// creating a schema for collections
// const student = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true, // validation
//         unique: true, // index
//     },
//     faveFoods: [{type: String}],
//     info: {
//         school: {
//             type: String,
//         },
//         shoeSize: {
//             type: Number,
//             min: 1,
//             max: 12
//         },
//     },
//     school: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'school'
//     }
// }, {timestamps: true});

const school = new mongoose.Schema({
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'district'
    },
    name: {
        type: String,
        unique: false
    },
    openSince: Number,
    students: Number,
    isGreat: Boolean,
    staff: [{type: String}]
})

// compound index
school.index({
    district: 1,
    name: 1
}, {unique: true})

school.pre('save', function(next) {
    console.log("before save");
    next();
})

school.virtual('staffCount').get(function() {
    console.log("in virtual");
    return this.staff.length;
})



// Convert the schema to a mongo model
const School = mongoose.model('school', school)
// const Student = mongoose.model('student', student)

// Connect to the database
// Create a new student document
connect()
    .then(async connection => {
        // const student = await Student.create({ firstName: 'John' });
        // const found = await Student.find({firstName: "Home"});
        // const foundById = await Student.findById(student._id);
        // const updated = await Student.findByIdAndUpdate(student._id, {firstName: "Jane"});
        // const schoolConfig = {
        //     name: "Springfield Elementary",
        //     openSince: 2009,
        //     students: 1000,
        //     isGreat: true,
        //     staff: ['a', 'b', 'c']
        // }

        // const school2 = {
        //     name: "Springfield High",
        //     openSince: 1980,
        //     students: 600,
        //     isGreat: false,
        //     staff: ['v', 'b', 'g']
        // }

        // const schools = await School.create([schoolConfig, school2]);

        // const match = await School.find({
        //     // students: {$gt: 600, $lt: 800},
        //     // isGreat: true,
        //     staff: 'b'
        // }).exec();
        

        // const student = await Student.create({firstName: 'Bart', school: school._id});

        // const match = await Student.findById(student._id).populate('school').exec();
        // console.log(match);
        const mySchool = await School.create({
            name: 'my school',
            staff: ['v', 'f', 'fsa']
        })
        console.log(mySchool.staffCount);
    })
    .catch(e => console.error(e))