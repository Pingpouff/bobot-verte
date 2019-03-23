const cheerio = require("cheerio");
const got = require("got");
const cocotteverteClient = got.extend({
  baseUrl: "http://unecocotteverte.com"
});

class Cocotte {
  async getProducts() {
    try {
      const response = await got();
      // console.log(response.body);
      var data = this.extractData(response);
    console.log(data);
    } catch (error) {
      console.log(error.response.body);
      //=> 'Internal server error ...'
    }
  }

  extractData(response) {
    var $ = cheerio.load(response.body, {
      xmlMode: true
    });
    // console.log($.html());
    var data = [];
    $(".product_image").each(function (index) {
      data[index] = {
        title: $(this).attr("title"),
        url: $(this).attr("href")
      };
      //   console.log($(this));
      //   console.log($(this).attr("title"));
    });
    return data;
  }

  async getDishes() {
    try {
      const response = await cocotteverteClient("10-dejeuner-au-bureau");
      // console.log(response.body);
      return this.extractData(response);
    } catch (error) {
      console.log(error.response.body);
      //=> 'Internal server error ...'
    }

  }

  async getDeserts() {
    try {
      const response = await cocotteverteClient("4-desserts");
      // console.log(response.body);
      var data = this.extractData(response);
    // console.log(data);
    return data;
    } catch (error) {
      console.log(error.response.body);
      //=> 'Internal server error ...'
    }
  }
}
module.exports = Cocotte;