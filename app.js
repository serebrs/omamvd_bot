require('dotenv').config();
const { Telegraf, session, Scenes: { BaseScene, Stage } } = require('telegraf');
const cron = require('node-schedule');
const { startInlineKeyboard, step1InlineKeyboard, step5InlineKeyboard, step7InlineKeyboard, backInlineKeyboard } = require('./markups');
const { messages } = require('./messages');
const { latestNews } = require('./news');
const { updateLog } = require('./dbpool');

let newsText;

const startScene = new BaseScene('START_SCENE');

startScene.on('my_chat_member', ctx => {
    console.log('my_chat_member из сцены');
    return;
});

startScene.enter(async (ctx) => {
    ctx.session.myData = {};
    ctx.session.myData.prevMessage = undefined;
    await ctx.replyWithPhoto( {source: './img/omamvd.jpg'}, { caption: '<b>Привет, ' + ctx.chat.first_name + '!</b>\n' + messages.mainMenu, parse_mode: 'HTML', reply_markup: startInlineKeyboard.reply_markup } )
        .then((res) => { ctx.session.myData.prevMessage = res.message_id });
    ctx.deleteMessage().catch((err) => console.log(err));
});

startScene.action('1. ABOUT', async (ctx) => {
    await ctx.replyWithPhoto( {source: './img/omamvd2.jpg'}, { caption: messages.aboutInfo, parse_mode: 'HTML', reply_markup: step1InlineKeyboard.reply_markup } )
        .then((res) => { ctx.session.myData.prevMessage = res.message_id });    
    ctx.deleteMessage().catch((err) => console.log(err));
});

startScene.action('2. CONTACTS', async (ctx) => {
    await ctx.replyWithHTML(messages.contactsInfo, backInlineKeyboard)
        .then((res) => { ctx.session.myData.prevMessage = res.message_id });
    ctx.deleteMessage().catch((err) => console.log(err));
});

startScene.action('5. ABITUR', async (ctx) => {
    await ctx.replyWithPhoto( {source: './img/abit1.jpg'}, { caption: messages.abiturInfo, parse_mode: 'HTML', reply_markup: step5InlineKeyboard.reply_markup } )
        .then((res) => { ctx.session.myData.prevMessage = res.message_id });
    ctx.deleteMessage().catch((err) => console.log(err));
});

startScene.action('6. NEWS', async (ctx) => {
    await ctx.replyWithHTML(messages.newsInfo + (newsText || 'Не могу загрузить новости. Попробуйте позже.'), backInlineKeyboard)
        .then((res) => { ctx.session.myData.prevMessage = res.message_id });
    ctx.deleteMessage().catch((err) => console.log(err));
});

startScene.action('7. 100LET', async (ctx) => {
    await ctx.replyWithPhoto( {source: './img/100let.jpg'}, { caption: messages.ubileyInfo, parse_mode: 'HTML', reply_markup: step7InlineKeyboard.reply_markup } )
        .then((res) => { ctx.session.myData.prevMessage = res.message_id });
    ctx.deleteMessage().catch((err) => console.log(err));
});

startScene.action('BACK', (ctx) => {
    return ctx.scene.enter('START_SCENE');
});

startScene.hears('/start', async (ctx) => {
    console.log('scene: ' + ctx.chat.id + ': ' + ctx.chat.first_name);
    updateLog(ctx.chat.id, ctx.chat.first_name, ctx.chat.last_name);
    if(ctx.session.myData.prevMessage) await ctx.deleteMessage(ctx.session.myData.prevMessage).catch((err) => console.log(err));
    return ctx.scene.enter('START_SCENE');
});

startScene.use((ctx) => {
    ctx.deleteMessage().catch((err) => console.log(err));
});

//---------------------------

const stage = new Stage([startScene]);

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session(), stage.middleware());

bot.on('my_chat_member', ctx => {
    console.log('my_chat_member из бота');
    return;
});

bot.command('/start', (ctx) => {
    console.log('bot: ' + ctx.chat.id + ': ' + ctx.chat.first_name);
    updateLog(ctx.chat.id, ctx.chat.first_name, ctx.chat.last_name);
    ctx.scene.enter('START_SCENE');
});

bot.launch();

const job = cron.scheduleJob('*/20 * * * *', _ => { 
    latestNews().then(res => { newsText = res || newsText });
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));