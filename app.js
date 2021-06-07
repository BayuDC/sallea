const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const sharp = require('sharp');
const waifu = require('./utils/waifu');
const appLocals = require('./app.locals');
const { host, port } = require('./config.json');
const app = express();

app.locals = appLocals;
app.set('view engine', 'ejs');
app.set('layout', 'layouts/default');
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(expressLayouts);

app.get('/(:tag?)', async (req, res, next) => {
    res.locals.images = await waifu.getImgUrl(req.params.tag);
    next();
});
app.get('/nsfw/(:tag?)', async (req, res, next) => {
    res.locals.images = await waifu.getImgUrl(req.params.tag, 'nsfw');
    next();
});
app.get(['/(:tag?)', '/nsfw/(:tag?)'], (req, res) => {
    const images = res.locals.images;
    if (!images) return res.sendStatus(404);
    images.length = 1;
    res.render('index', { images });
});
app.get('/img/(:name)', async (req, res) => {
    const name = req.params.name;
    const width = parseInt(req.query.width);
    const img = await waifu.getImgStream(name);

    if (!img) return res.sendStatus(404);
    if (!width) return img.pipe(res);
    return img.pipe(sharp().resize({ width: width })).pipe(res);
});
app.listen(port, () => console.log(`Server is running at ${host}:${port}`));
