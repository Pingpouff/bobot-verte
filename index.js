const cocotte = new (require("./Cocotte"))();
const rocket = new (require("./RocketChat"))();

// "channels.history?roomId=25T5Eif6QMF4j6pHo&oldest=2010-05-30T13:42:25.304Z"
const channelCocoteSandBox = "25T5Eif6QMF4j6pHo";
rocket.history(channelCocoteSandBox, "2010-05-30T13:42:25.304Z");

// cocotte.getProducts();
