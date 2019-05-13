module.exports.appendMovie = function(){
  fs.appendFile("log.txt", `\n ${result.movie}`, function (err) {

    // If an error was experienced we will log it.
    if (err) {
      console.log(err);
    }

    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    else {
      console.log("Content Added!");
    }

  });
}


// module.exports = appendMovie;
    
