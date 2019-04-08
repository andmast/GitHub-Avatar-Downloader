var request = require('request');
var token = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + token.GITHUB_TOKEN
    }
  };


  request(options, function(err, res, body) {
    // console.log("body:",body);
    var result = JSON.parse(body)
    var length = result.length;
    console.log(length);
    var avatar_URLS = [];

    for (var i = 0; i < length; i++) {
      avatar_URLS.push(result[i].avatar_url);
    }
    console.log(avatar_URLS)

    cb(err, avatar_URLS)

  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  for (var i = 0, l = result.length ; i <l; i++) {
    var output = result[i] + "\n";
    console.log("Result:", output);
  }
});
