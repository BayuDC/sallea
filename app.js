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
    res.locals.images = await waifu.getImg(req.params.tag);
    next();
});
app.get('/nsfw/(:tag?)', async (req, res, next) => {
    res.locals.images = await waifu.getImg(req.params.tag, 'nsfw');
    next();
});
app.get(['/(:tag?)', '/nsfw/(:tag?)'], (req, res, next) => {
    const type = req.query.type;
    const images = res.locals.images;
    if (type && type == 'json') {
        if (!images) return res.sendStatus(404);
        return res.status(200).json(images);
    }
    if (!images) return next();
    res.status(200).render('index', { images });
});
app.get('/f/(:name)', async (req, res, next) => {
    const name = req.params.name;
    const img = await waifu.getImgStream(name);
    if (!img) return next();
    res.status(200).render('full', { img: name });
});

app.get('/[i|d]/(:name)', async (req, res, next) => {
    const name = req.params.name;
    const img = await waifu.getImgStream(name);

    if (!img) return res.sendStatus(404);
    res.locals = { img, name };
    next();
});
app.get('/i/(:name)', async (req, res) => {
    const { img, name } = res.locals;
    const width = parseInt(req.query.width);
    const type = waifu.getType(name);
    res.type(type);
    if (!width || type == 'gif') return img.pipe(res);
    return img.pipe(sharp().resize({ width: width })).pipe(res);
});

app.get('/d/(:name)', async (req, res) => {
    const { img, name } = res.locals;
    return img.pipe(res.attachment(name));
});
app.use((req, res) => {
    res.status(404).render('error');
});
app.listen(port, () => console.log(`Server is running at ${host}:${port}`));
