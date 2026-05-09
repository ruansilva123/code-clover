import express from 'express';

const router = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Olá mundo"));
};

export default router;
