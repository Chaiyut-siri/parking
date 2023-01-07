module.exports = {
    HOST: process.env.MYSQL_HOST || "localhost",
    USER: process.env.MYSQL_USER || "root",
    PASSWORD: process.env.MYSQL_PASSWORD || "123456",
    PORT: process.env.MYSQL_PORT || "3306",
    DB: process.env.MYSQL_DATABASE || "parking",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};