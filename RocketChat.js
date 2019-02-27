const got = require("got");
const client = got.extend({
  baseUrl: "https://chat.phedre.fr/api/v1/",
  headers: {
    "X-User-Id": "**",
    "X-Auth-Token": "**"
  }
});

class RocketChat {
  async history() {
    try {
      // const searchParams = new URLSearchParams([['roomId', "25T5Eif6QMF4j6pHo"]]);
      const response = await client.get(
        "channels.history?roomId=25T5Eif6QMF4j6pHo&oldest=2010-05-30T13:42:25.304Z"
      );
      const body = response.body;
      const messages = JSON.parse(body).messages;
      // console.log(messages);
      // console.log(messages.length);
      for (var i = 0; i < messages.length; i++) {
        var message = messages[i];
        // console.log(messages[i]);
        var author = message.u.name;
        var content = message.msg;
        console.log(author + " say: " + content);
      }
    } catch (error) {
      console.log(error);
      //=> 'Internal server error ...'
    }
  }
}

module.exports = RocketChat;
