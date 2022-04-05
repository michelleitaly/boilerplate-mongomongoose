require("dotenv").config();
const mongoose = require("mongoose");

// const uri = mongodb+srv://michelle:036796Lm@fcc.jqljb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let francesca = new Person({
    name: "francesca",
    age: 26,
    favoriteFoods: "sushi",
  });
  francesca.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });
};

let arrayOfPeople = [
  {
    name: "Bob",
    age: 16,
    favoriteFoods: ["fish & chips", "burger", "coca cola"],
  },
  { name: "Nicola", age: 35, favoriteFoods: ["Thai food", "Laksa"] },
  { name: "Lisa", age: 42, favoriteFoods: ["Pokè", "Dominos"] },
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });
  // done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (error, arrayOfResult) => {
    if (error) {
      console.log(error);
    } else {
      done(null, arrayOfResult);
    }
  });
};
/*Person.findOne({ favoriteFoods:{$all: [ "sushi"] }}, (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data)
    
  }
});*/
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: { $all: [food] } }, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      done(null, result);
    }
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      done(null, result);
    }
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (error, result) => {
    if(error){
      console.log(error)
    }else {
      result.favoriteFoods.push(foodToAdd)
      result.save((error, updatedResult)=>{
      if (error) {
        console.log(error);
      } else {
        
        done(null, updatedResult);
      }})
    }
  })

  //done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName },{age: ageToSet}, {new: true}, (error, updatedResult) => {
    if (error) {
      console.log(error);
    } else {
      done(null,updatedResult )
    }
  });

  //done(null /*, data*/);
};

const removeById = (personId, done) => {
 Person.findByIdAndRemove(personId, (error, resultRemoved)=>{
    if(error){
      console.log(error)
    }else{
      done(null, resultRemoved)
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, (error, jsonStatus)=>{
    if(error){
      console.log(error)
    }else{
      done(null, jsonStatus)
    }
  })
 //done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
