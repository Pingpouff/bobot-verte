const cocotte = new (require("./service/Cocotte"))();
const rocket = new (require("./chat/rocket/RocketChat"))();

// "channels.history?roomId=25T5Eif6QMF4j6pHo&oldest=2010-05-30T13:42:25.304Z"
// const channelCocoteSandBox = "25T5Eif6QMF4j6pHo"; // TODO move to external config file
const arianeFoodCocotte = "T8FpTnX4rFSCJh2QY";
const channelToPublishIn = arianeFoodCocotte;
// const channelToPublishIn = channelCocoteSandBox;

// rocket.info("cocote-sandbox");
// rocket.sendMessage(channelCocoteSandBox);
// rocket.history(channelCocoteSandBox, "2010-05-30T13:42:25.304Z");
async function printDishes() {
  // recup plats
  let dishes = await cocotte.getDishes();
  dishes.forEach(dish => {
    rocket.sendMessage(channelToPublishIn, `:spaghetti: Plat: ${dish.title}`);
  });
}
async function printDeserts() {
  // recup deserts
  let deserts = await cocotte.getDeserts();
  deserts.forEach(desert => {
    rocket.sendMessage(channelToPublishIn, ":cake: Dessert: " + desert.title);
  });
}
async function main() {
  await rocket.sendMessage(
    channelToPublishIn,
    "@here Qui commande une cocotte? Mettez un :+1: sur la ligne que vous voulez commander. Aujourd'hui il y a:"
  );
  //   await rocket.sendMessage(channelCocoteSandBox, "chez cocotte:");
  await printDishes(); // TODO add photo preview
  await printDeserts();
  // TODO recup les commandes pour résumé du nombre de chaque element
  // TODO recup les commandes par formule/personne
}
main();
