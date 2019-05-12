require("dotenv").config();
const keys = require("./keys.js");
let inquirer = require("inquirer");
let moment = require("moment");
let axios = require("axios");
// let spotify = new Spotify(keys.spotify);


inquirer
  .prompt([
    {
      type: "input",
      message: "What is your name?",
      name: "username"
    },
    {
      type: "list",
      message: "What would you like to ask about: concerts, spotify songs, movies?",
      choices: ["concert-this", "spotify-this-song", "movie-this"],
      name: "choice"
    },
  ])
  .then(function(res) {
    if (res.choice === "concert-this" ){
      console.log("\n=================");
      console.log("\nWelcome " + res.username);
      console.log(res.choice);
      console.log("\n=================");
    } else if (res.choice === "spotify-this-song") {
      console.log("\n=================");
      console.log("\nWelcome " + res.username);
      console.log(res.choice);
      console.log("\n=================");
    } else if (res.choice === "movie-this") {
      console.log("\n=================");
      console.log("\nWelcome " + res.username);
      console.log(res.choice);
      console.log("\n=================");
      inquirer
        .prompt([
          {
            type: "input",
            message: "What movie are you interested?",
            name: "movie"
          }
        ]).then(function (result) {
          console.log(result.movie);
      axios.get("http://www.omdbapi.com/?t=" + result.movie + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
          if(result.movie) {
            console.log(response.data.Year);
          } else  if (undefined) {
            console.log("No such movie " + result.movie +" in our database! Try Again")
          }
          
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
      })  
  }
 })
    

  