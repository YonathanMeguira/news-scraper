/**
 * Created by if_found_call_0586288454 on 10/07/2017 ap. J.-C..
 */
var cheerio = require('cheerio');
var request = require('request');

function getNews() {
    const newsUrl = 'http://www.technewsworld.com/perl/section/cyber-security/';
    return new Promise((resolve, reject) => {
        request(newsUrl, function (error, response, body) {
            if (error) {
                return reject(error)
            } else {
                if (response.statusCode === 200) {
                    var articlesArr = [];
                    var baseUrl = 'http://www.technewsworld.com';
                    var $ = cheerio.load(body);
                    var articles = $('.section-table');
                    articles.map(function () {
                        var article = $(this).find('.shadow');
                        var articleObj = {
                            title: article.find('a').text(),
                            date: article.find('span').att,
                            url: baseUrl + article.find('a').attr('href'),
                            description: article.find('div').text().replace(/(?:\\[rnt]|[\r\n\t]+)+/g, ""),
                            image: baseUrl + article.find('img').attr('src')
                        }
                        articlesArr.push(articleObj);
                    }).get();
                    resolve(articlesArr);
                }
            }
        })
    })
}

module.exports = {getNews}