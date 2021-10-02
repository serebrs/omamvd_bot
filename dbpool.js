const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DB,
    acquireTimeout: 1000
});

exports.updateLog = function (user_id, user_name, user_lastname = '') {
    let conn;
    const last_datetime = new Date().getTime();

    pool.getConnection().then(conn => {
        conn.query(
            { namedPlaceholders: true, sql: "INSERT INTO omabot (user_id, user_name, user_lastname, last_datetime) VALUES (:id, :name, :lastname, :datetime) ON DUPLICATE KEY UPDATE user_name = :name, user_lastname = :lastname, last_datetime = :datetime" },
            { id: user_id, name: user_name, lastname: user_lastname, datetime: last_datetime }
        ).catch(err => console.log(err));
    }).catch(err => console.log(err));
}