const session = require('express-session');
const express = require('express');
const path    = require('path');

/**
 * @param {import('express').Application} app
 */
const registerMiddleware = (app) => {

    app.use(express.static(path.join(__dirname, 'public')));

    app.use(express.urlencoded({ extended: true }));

    app.use(
        session({
            secret: 'asammlambung',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false, 
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 2,
            },
        })
    );
};

module.exports = { registerMiddleware };
