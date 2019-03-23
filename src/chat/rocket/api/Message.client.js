class MessageClient {
  constructor(restClient) {
    console.log(restClient.defaults.options.baseUrl);
  }
}

module.exports = MessageClient;