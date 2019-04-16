const got = require("got");
const config = require("./rocket.config.private.json");
const client = got.extend({
  baseUrl: config.baseUrl,
  headers: {
    "X-User-Id": config.userId,
    "X-Auth-Token": config.authToken
  }
});
const MessageClient = require("./api/Message.client");

class RocketChat {
  constructor() {
    this.messages = new MessageClient(client);
  }
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
      // console.log(JSON.parse(body));
      const messages = JSON.parse(body).messages;
      // console.log(messages);
      // console.log(messages.length);
      for (var i = 0; i < messages.length; i++) {
        var message = messages[i];
        // console.log(messages[i]);
        var author = message.u.name;
        var content = message.msg;
        console.log(message.reactions);
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

  async sendMessage(roomId, text) {
    try {
      const response = await client.post(`chat.sendMessage`, {
        body: JSON.stringify({
          message: {
            rid: roomId,
            msg: text,
            alias: "bobotverte",
            // avatar: "https://cdn.dribbble.com/users/8842/screenshots/226319/robotchicken.png",
            // avatar:"https://cdn.dribbble.com/users/178723/screenshots/2856202/robotchicken2.png",
            avatar: "http://unecocotteverte.com/img/favicon.ico?1536335416" // TODO should be out of here
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
