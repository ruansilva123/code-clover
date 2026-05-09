require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const routes = require('./routes');

const app = express();
app.use(express.json());
routes(app);

const PORT = process.env.PORT || 3000;

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor escutando na porta ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Falha ao sincronizar banco:', err);
        process.exit(1);
    });
