var request = require('request');
var token = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token
    }
  };


  request(options, function(err, res, body) {
    var result = JSON.parse(body)
    var length = result.length;
    console.log(length);
    for (var i = 0; i < length; i++) {
      var avatar_URLS = result[i].avatar_url;
      cb(err, avatar_URLS);
    }




  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});