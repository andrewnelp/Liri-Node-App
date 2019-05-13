let spotifyTrack = function (){
  
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

    module.exports = spotifyTrack;
    
