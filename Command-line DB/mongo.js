const mongoose = require('mongoose');

const password = process.argv[2];
const databaseUrl = `mongodb+srv://user0:${password}@cluster0.gpsrn.mongodb.net/phone-book?retryWrites=true&w=majority`;

const numberSchema = new mongoose.Schema({
    name: String, 
    number: String
}
);

numberSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret._v;
    }
})

// numberSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString();
//         delete returnedObject._id;
//         delete returnedObject._v;
//     }
// })

const Number = mongoose.model('number', numberSchema);


if (process.argv.length < 3)
{
    console.log('please enter the command as: node mongo.js <password>');
    process.exit(1);
}
else if(process.argv.length === 3)
{
    mongoose.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});
    

    
    Number.find({}).then(response=> {
        console.log(response);
        // console.log('phonebook:');
        //     response.forEach(number => {
        //         console.log(`${number.name}  ${number.number}`);
        //     })
            mongoose.connection.close();
    });
}
else if (process.argv.length > 3)
{
const name = process.argv[3];
const phoneNumber = process.argv[4];

const newNumber = new Number({
    name: name,
    number: phoneNumber
});


mongoose.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});



newNumber.save().then(response => {
    console.log(`added ${phoneNumber} as ${name} on phonebook`);
    mongoose.connection.close();
})
}