const { Markup } = require("telegraf");

exports.startInlineKeyboard = Markup.inlineKeyboard([
    [
        Markup.button.callback('🏢 Об академии', '1. ABOUT'),
        Markup.button.callback('☎ Контакты', '2. CONTACTS')
    ],
    [ Markup.button.url('🗓 Расписание занятий (бот)', 'https://t.me/OmaRaspBot') ],
    [ Markup.button.url('📚 Образовательная среда (ЭИОС)', 'http://217.25.215.105/eios/my') ],
    [ Markup.button.callback('👫 Поступление в академию', '5. ABITUR') ],
    [ 
        Markup.button.callback('📰 Новости', '6. NEWS'),
        Markup.button.callback('💯 100 лет академии', '7. 100LET')
    ],
]);

exports.step1InlineKeyboard = Markup.inlineKeyboard([
    [ Markup.button.url('🌐 Сайт академии', 'https://xn--80axf.xn--b1aew.xn--p1ai/') ],
    [ Markup.button.url('🎡 Виртуальная экскурсия', 'https://www.omamvd.ru/pano/index.html') ],
    [ Markup.button.url('📖 Газета "Вести академии"', 'https://xn--80axf.xn--b1aew.xn--p1ai/Press-sluzhba/%D0%B2%D0%B5%D1%81%D1%82%D0%B8-%D0%B0%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D0%B8%D0%B8/archive') ],
    [ Markup.button.url('▶️ Youtube-канал академии', 'https://www.youtube.com/channel/UCIR4PdQwMt6rS2tn2n-Pkcw') ],
    [ Markup.button.callback('« Назад в главное меню', 'BACK') ],
]);

exports.step5InlineKeyboard = Markup.inlineKeyboard([
    [ Markup.button.url('👨‍👩‍👧‍👦 Дни открытых дерей', 'https://xn--80axf.xn--b1aew.xn--p1ai/Postuplenie/Dni_otkritih_dverej') ],
    [ 
        Markup.button.url('⁉️ Раздел на сайте', 'https://xn--80axf.xn--b1aew.xn--p1ai/Postuplenie'),
        Markup.button.url('🎥 Фильм', 'https://www.youtube.com/watch?v=Qy1UmqbsLi0') 
    ],
    [ Markup.button.callback('« Назад в главное меню', 'BACK') ],
]);

exports.step7InlineKeyboard = Markup.inlineKeyboard([
    [ Markup.button.url('💯 Празднование 100-летия академии', 'https://xn--80axf.xn--b1aew.xn--p1ai/folder/18932953') ],
    [ 
        Markup.button.url('📄 Буклет', 'https://media.mvd.ru/files/application/2184374'),
        Markup.button.url('📘 Книга', 'https://omamvd.ru/book/')
    ],
    [ Markup.button.callback('« Назад в главное меню', 'BACK') ],
]);

exports.backInlineKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('« Назад в главное меню', 'BACK'),
]);