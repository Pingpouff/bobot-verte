const cheerio = require("cheerio");
const got = require("got");

class Cocotte {
  async getProducts() {
    try {
      const response = await got("http://unecocotteverte.com");
      // console.log(response.body);
      var $ = cheerio.load(response.body, {
        xmlMode: true
      });
      // console.log($.html());
      var data = [];
      $(".product_image").each(function(index) {
        data[index] = {
          title: $(this).attr("title"),
          url: $(this).attr("href")
        };
        //   console.log($(this));
        //   console.log($(this).attr("title"));
        console.log(data);
      });
    } catch (error) {
      console.log(error.response.body);
      //=> 'Internal server error ...'
    }
  }
}
module.exports = Cocotte;