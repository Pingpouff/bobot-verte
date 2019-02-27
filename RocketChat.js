const got = require("got");
const config = require("./rocket.config.private.json");
const client = got.extend({
  baseUrl: config.baseUrl,
  headers: {
    "X-User-Id": config.userId,
    "X-Auth-Token": config.authToken,
  }
});

class RocketChat {
  async history(roomId, oldest) {
    try {
      // const searchParams = new URLSearchParams([['roomId', "25T5Eif6QMF4j6pHo"]]);
      const response = await client.get(
        `channels.history?roomId=${roomId}&oldest=${oldest}`
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
