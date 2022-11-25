const fs = require('fs')
const path = require('path');

require('dotenv').config({ path: './.env.local' })

const compression = require('compression');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
const express = require('express');
const { jwtVerify } = require('jose');
const mongoose = require('mongoose');
const morgan = require('morgan');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

        server.use(cookieParser());
        server.use('/api', (req, res, next) => {
            const token = req.headers['x-auth-token']
            if (!token) return next()
            else jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
                .then(({ payload: decoded }) => {
                    res.cookie('user', decoded.user)
                    return next()
                })
                .catch(err => next(err));
        })
        server.use(compression());
        server.use(morgan('combined', { stream: accessLogStream }));

        server.use(express.static(path.join(__dirname, 'public')));
        server.use('/images', express.static(path.join(__dirname, 'images')));

        server.use(flash());

        mongoose.connect(process.env.MONGODB_URI)
            .then(() => {
                server.all('*', (req, res) => handle(req, res))
                server.listen(port, (err) => {
                    if (err) throw err
                    console.log(`> Ready on http://${hostname}:${port}`)
                })
            }).catch(error => console.log(error.message))
    })