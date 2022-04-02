const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const sequelize = require('./config/connection');
const models = require('./models');
const routes = require('./routes');


app.use([
    express.urlencoded({ extended: true }),
    express.json()
])

if (process.env.NODE.ENV === "production") {
    app.use(express.static("client/build"));

}
app.use(routes);

sequelize
    .sync({force: false, logging: false })
    .then(()=> {
        app.listen(PORT, () => {
            console.log("Server now on port", PORT);

        });
    })
    .catch(err=> console.error(err));