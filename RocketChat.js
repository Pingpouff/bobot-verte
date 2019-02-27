const got = require("got");
const config = require("./rocket.config.private.json");
const client = got.extend({
  baseUrl: config.baseUrl,
  headers: {
    "X-User-Id": config.userId,
    "X-Auth-Token": config.authToken
  }
});

class RocketChat {
  async info(roomName) {
    try {
      const response = await client.get(`channels.info?roomName=${roomName}`);
      const body = response.body;
      console.log(JSON.parse(body));
    } catch (error) {
      console.log(error);
      //=> 'Internal server error ...'
    }
  }

  async history(roomId, oldest) {
    try {
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

  async postMessage(roomId, channel, text) {
    try {
      const response = await client.post(`chat.postMessage`, {
        body: JSON.stringify({
          channel,
          roomId,
          text
        })
      });
    } catch (error) {
      console.log(error);
      //=> 'Internal server error ...'
    }
  }

  async sendMessage(roomId) {
    try {
      const response = await client.post(`chat.sendMessage`, {
        body: JSON.stringify({
          message: {
            // _id="test",
            rid: roomId,
            msg: "Sample message",
            alias: "Gruggy"
          }
        })
      });
    } catch (error) {
      console.log(error);
      //=> 'Internal server error ...'
    }
  }
}

module.exports = RocketChat;
