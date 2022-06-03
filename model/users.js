var csv = require("csvtojson");
const { enable } = require("express/lib/application");
var jsonQuery = require('json-query')
var filePath = "./data.csv";

// const jsonArray = async () =>
// {
//     return await csv().fromFile(filePath);
// };

let jsonArray = csv().fromFile(filePath);

module.exports = {

    
    getUserById: async function(id){
        console.log(`getUserById called with id: ${id}`);

        // Add implementation here
        let m = await jsonArray;
        return jsonQuery(['[Id=?]', id], {data: m}).value ;
    },

    getUsersByAge: async function(age) {
        console.log(`getUsersByAge called with age: ${age}`);
        
        // console.log(`josn array: ${jsonArray[1]}`);
        // Add implementation here
        
        //
        // console.log(jsonArray);
        //
        // // return [];
        // return jsonArray;
        // return jsonQuery('people[**]', {
        //     jsonArray
        //   }).value ;

        // var data = {
        //     people: [
        //       {name: 'Matt', country: 'NZ'},
        //       {name: 'Pete', country: 'AU'},
        //       {name: 'Mikey', country: 'NZ'}
        //     ]
        //   }
           
        // return jsonQuery('people[ountry=NZ]', {
        //     data: data
        //   }).value ; 

        // const jsonArray= await csv().fromFile(filePath);


        //  return jsonQuery('[*Country=AE]', {data: jsonArray}).value ;

        // var datetime = new Date().toLocaleDateString();

        // const jsonArray= await csv().fromFile(filePath);
        const upperBound = new Date().setFullYear(new Date().getFullYear() - age);
        const lowerBound = new Date().setFullYear(new Date().getFullYear() - age - 1);

    
        return jsonQuery('[*:ageRange]', {data: jsonArray, 
         locals: {
            ageRange: function (item) {

                var Dateofage = new Date(item.DOB);

                return (Dateofage <= upperBound) && (Dateofage > lowerBound); 
              }
         }}).value ; 

    },

    getUsersByCountry: async function(country) {
        console.log(`getUsersByCountry called with country: ${country}`);
        
        // Add implementation here
        const jsonArray= await csv().fromFile(filePath);
         return jsonQuery(['[*Country=?]', country], {data: jsonArray}).value ;
    },

    getUsersByName: async function(name) {
        console.log(`searchUsersByName called with name: ${name}`);
        
        // Add implementation here
        const jsonArray= await csv().fromFile(filePath);
        let partial = name.slice(0,3)
        return jsonQuery('[*Name~/' + name +'/i|Name~/^' + partial +'/i|Name~/ ' + partial +'/i]',
        {data: jsonArray, allowRegexp:enable}).value ;
    },

    deleteUser: async function(id) {
        console.log(`deleteUser called with id: ${id}`);
        // Add implementation here

        const jsonArray= await csv().fromFile(filePath);

        index = jsonQuery(['[Id=?]', id], {data: jsonArray}).key; 
        jsonArray.splice(index, 1); 

        return [];
    }
}

// async function great(id){
//     console.log(`getUserById called with id: ${id}`);

//     // let jsonArray= await csv().fromFile(filePath);
//     // Add implementation here
//     // return jsonQuery(['[Id=?]', id], {data: jsonArray}).value ;
//     jsonArray = await csv().fromFile(filePath);;
//     console.log(jsonArray); 
//     return X;
// }

// great(12); 