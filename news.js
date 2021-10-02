const rssParser = require('rss-parser');

const rssUrl = 'https://xn--80axf.xn--b1aew.xn--p1ai/Press-sluzhba/Novosti/rss';

exports.latestNews = async function () {
    let str = '';
    try {
        const parser = new rssParser({ timeout: 1000 });
        const feed = await parser.parseURL(rssUrl);
        let items = feed.items.slice(0, 3);
        items.reverse();
        items.forEach(item => {
            let pubDate = getDate(new Date(item.pubDate));
            str += `<b>[${pubDate}] <a href="${item.link}">${item.title}</a></b>\n${item.content}\n\n`;
        });
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