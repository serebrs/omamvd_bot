const rssParser = require('rss-url-parser');

const rssUrl = 'https://xn--80axf.xn--b1aew.xn--p1ai/Press-sluzhba/Novosti/rss';

exports.latestNews = async function () {
    let str = '';
    try {
        const feed = await rssParser(rssUrl);
        let items = feed.slice(0, 3);
        items.reverse();
        for (let item of items) {
            let pubDate = getDate(new Date(item.pubDate));
            str += `<b>[${pubDate}] <a href="${item.link}">${item.title}</a></b>\n${item.summary || ''}\n\n`;
        }
        return str;
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
}

function getDate(date) {
    let day = ('0' + date.getDate()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
}