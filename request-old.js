const request = require("request");

const options = {
  url:
    "https://chat.phedre.fr/api/v1/channels.history?roomId=25T5Eif6QMF4j6pHo",
  headers: {
    "User-Agent": "request",
    "X-User-Id": "nkwMExQG7moyvbYva",
    "X-Auth-Token": "NpO5ZJ9t7VIn3AIya5Uim-u7xvJkfy5YM_2y8DFgVyI"
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    const messages = JSON.parse(body).messages;
    // console.log(messages);
    // console.log(messages.length);
    for (var i = 0; i < messages.length; i++) {
      var message = messages[i];
      // console.log(messages[i]);
      var author = message.u.name;
      var content = message.msg;
      console.log(author+' say: '+content);ls
    }
  }
}

request(options, callback);
