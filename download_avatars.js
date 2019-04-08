var request = require('request');
var token = require('./secrets');
var fs = require('fs');
var input = process.argv.slice(2)
var owner = input[0];
var repo = input[1]

console.log('Welcome to the GitHub Avatar Downloader!');

function downloadImageByURL(url, filePath) {
  // console.log("Downloading images hold your horses");

    request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
        // console.log('Downloading....')
        // console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
}

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

    cb(err, result)

  });
}

if(input.length < 2){
  throw new Error('Expected two parameters\n','try again');
} else {
  getRepoContributors(owner, repo, function(err, result) {
    console.log("Errors:", err);
     for (var i = 0,l = result.length; i < l; i++) {
        // console.log(result[i].login);
        var file_path = 'avatars/'+result[i].login+'.jpg';
        var image_url = result[i].avatar_url;
        downloadImageByURL(image_url,file_path)
      }

  });
}
console.log(input)


