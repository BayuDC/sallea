const fetch = require('node-fetch');
const { host, port, waifuPics } = require('../config.json');

const getName = url => {
    return url.slice(waifuPics.img.length);
};
const modUrl = url => {
    return `${host}:${port}/img/${getName(url)}`;
};
const getImgStream = async name => {
    const res = await fetch(waifuPics.img + name);
    if (res.status == 200) return res.body;
    return false;
};

module.exports = {
    modUrl,
    getImgStream,
};
