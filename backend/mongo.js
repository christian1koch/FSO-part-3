// const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log(
//     "Please provide the password as an argument: node mongo.js <password>"
//   );
//   process.exit(1);
// }

// const password = process.argv[2];

// const url = `mongodb+srv://christian1koch:${password}@cluster0.tfwb1ad.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// });

// const Person = mongoose.model("Person", personSchema);

// mongoose
//   .connect(url)
//   .then((result) => {
//     console.log("connected");
//     if (process.argv.length > 3) {
//       const person = new Person({
//         name: process.argv[3],
//         number: process.argv[4],
//       });
//       return person.save().then(()=>{
//         console.log(`added number ${process.argv[4]} to phonebook`);
//         mongoose.connection.close();
//       });
      
//     }
//     Person.find({}).then((result) => {
//       console.log("phonebook: ");
//       result.forEach((person) => {
//         console.log(`${person.name} ${person.number}`);
//       });
//       return mongoose.connection.close();
//     });
//   })
//   .catch((err) => console.log(err));
