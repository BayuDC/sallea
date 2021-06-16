const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const favicon = require('serve-favicon');
const sharp = require('sharp');
const path = require('path');
const waifu = require('./utils/waifu');
const appLocals = require('./app.locals');
const { nsfw } = require('./config.json');
const app = express();
const port = process.env.PORT || 3000;

app.locals = { ...appLocals, nsfw: nsfw.enable };
app.set('view engine', 'ejs');
app.set('layout', 'layouts/default');
app.use(express.static('./public'));
app.use(expressLayouts);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/(:tag?)', async (req, res, next) => {
    res.locals.images = await waifu.getImg(req.params.tag);
    next();
});
app.get('/nsfw/(:tag?)', async (req, res, next) => {
    if (!nsfw.enable) {
        const msg = nsfw.msg;
        const type = req.query.type;
        res.status(404);
        if (type && type == 'json') return res.json({ msg });
        return res.render('error', { msg });
    }
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
app.listen(port, () => console.log(`Listening at port ${port}`));
