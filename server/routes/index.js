const userRoutes = require('./userRoutes');
const repositoryRoutes = require('./repositoryRoutes');
const commitRoutes = require('./commitRoutes');
const modifiesRoutes = require('./modifiesRoutes');

const routes = (app) => {
    app.get('/', (req, res) => res.status(200).json({ message: 'Code Clover API' }));
    app.use('/users', userRoutes);
    app.use('/repositories', repositoryRoutes);
    app.use('/commits', commitRoutes);
    app.use('/modifies', modifiesRoutes);
};

module.exports = routes;
