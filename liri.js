require("dotenv").config();
const keys = require("./keys.js");
let inquirer = require("inquirer");
let moment = require("moment")
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
  .then(function (res) {
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
    }
    
    
  }) 