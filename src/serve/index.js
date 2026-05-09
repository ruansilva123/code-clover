import express from 'express';
import livrosRouter from './livrosRoutes.js';
import autoresRouter from './autoresRotes.js';

const router = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));

    app.use(express.json(), livrosRouter, autoresRouter);
};

export default router;
