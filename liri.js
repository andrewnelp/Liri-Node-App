require("dotenv").config();
const keys = require("./keys.js");
let inquirer = require("inquirer");
let moment = require("moment");
let fs = require("fs");
moment().format();
let axios = require("axios");
var Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);


//calling the name of the user
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
      choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
      name: "choice"
    },
  ])
  //concert this
  .then(function (res) {
    if (res.choice === "concert-this") {
      console.log("\n=================");
      console.log("\nWelcome " + res.username);
      console.log("\n=================");
      //asking about an artist
      inquirer
        .prompt([
          {
            type: "input",
            message: "What artist are you interested?",
            name: "artist"
          }
        ]).then(function (result) {
          let artist = result.artist;
          //calling Bands in Town api
          let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
          //getting results from API
          axios.get(queryUrl).then(
            function (response) {
              //looping through resonse data info
              for (let i = 0; i < response.data.length; i++) {
                //converting date with moment()
                let date = moment(response.data[i].datetime).format('MM/DD/YYYY')
                console.log("\n=================");
                console.log("Venue name: " + response.data[i].venue.name);
                console.log("Country: " + response.data[i].venue.country);
                console.log("Date: " + date);
                console.log("=================");
              }
            })
        })
    } else if (res.choice === "spotify-this-song") {
      console.log("\n=================");
      console.log("\nWelcome " + res.username);
      console.log("\n=================");
      //asking about Spotify
      inquirer
        .prompt([
          {
            type: "input",
            message: "What track are you interested?",
            name: "track"
          }
        ])
        .then(function (result) {
          spotify
            .search({ type: 'track', query: result.track })
            .then(function (response) {
              console.log("\n=================");
              for (let i = 0; i < response.tracks.items.length; i++) {
                console.log("\n=================");
                console.log("Song: " + response.tracks.items[i].name);
                console.log("Artist: " + response.tracks.items[i].album.artists[0].name);
                console.log("Spotify Preview: " + response.tracks.items[i].album.external_urls.spotify);
                console.log("Album: " + response.tracks.items[i].album.name);
                console.log("Release Year: " + response.tracks.items[i].album.release_date);
                console.log("Preview: " + response.tracks.items[i].preview_url);
                console.log("\n=================");
              }

            })
            .catch(function (err) {
              console.log(err);
            });
        })
      //Do what it says
    } else if (res.choice === "do-what-it-says") {
      fs.readFile("random.txt", "utf8", function (error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        spotify
          .search({ type: 'track', query: data })
          .then(function (response) {
            console.log("\n=================");
            for (let i = 0; i < response.tracks.items.length; i++) {
              console.log("\n=================");
              console.log("Song: " + response.tracks.items[i].name);
              console.log("Artist: " + response.tracks.items[i].album.artists[0].name);
              console.log("Spotify Preview: " + response.tracks.items[i].album.external_urls.spotify);
              console.log("Album: " + response.tracks.items[i].album.name);
              console.log("Release Year: " + response.tracks.items[i].album.release_date);
              console.log("Preview: " + response.tracks.items[i].preview_url);
              console.log("\n=================");
            }
          })
      })
    }
    // OMDB movie-this
    else if (res.choice === "movie-this") {
      console.log("\n=================");
      console.log("\nWelcome " + res.username);
      console.log("\n=================");
      //asking about movie
      inquirer
        .prompt([
          {
            type: "input",
            message: "What movie are you interested?",
            name: "movie"
          }
        ]).then(function (result) {
          //if a user enters nothing then Mr Nobody
          if (result.movie == "") {
            // result.movie = "Mr.Nobody";
            // console.log(result.movie);
            // ombdMovie();
            axios.get("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy").then(
              function (response) {
                console.log("\n=================");
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMBD Rating: " + response.data.imdbRating);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Actors: " + response.data.Actors);
                console.log("Plot: " + response.data.Plot);
                console.log("\n=================");
              })
          }
          else {
            let ombdMovie = function () {
              axios.get("http://www.omdbapi.com/?t=" + result.movie + "&y=&plot=short&apikey=trilogy").then(
                function (response) {
                  // if Error
                  if (response.data.Error) {
                    console.log('Movie not found!');
                  }
                  //if movie found
                  else if (result.movie) {
                    console.log("\n=================");
                    console.log("Title: " + response.data.Title);
                    console.log("Year: " + response.data.Year);
                    console.log("IMBD Rating: " + response.data.imdbRating);
                    console.log("Country: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Actors: " + response.data.Actors);
                    console.log("Plot: " + response.data.Plot);
                    console.log("\n=================");
                  }
                })
            }
            ombdMovie();

          }

        })
    }
  })


