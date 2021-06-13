const path = require('path');
const fetch = require('node-fetch');
const { waifuPics } = require('../config.json');

const getName = url => {
    return url.slice(waifuPics.img.length);
};
const getType = name => {
    return path.extname(name).slice(1);
};
const getImg = async (tag, type = 'sfw') => {
    const uri = `${waifuPics.api}many/${type}/${tag || 'waifu'}`;
    const res = await fetch(uri, {
        method: 'post',
        body: JSON.stringify({ exclude: [] }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (res.status == 200) {
        const body = await res.json();
        return body.files.map(url => getName(url));
    }
    return false;
};
const getImgStream = async name => {
    const res = await fetch(waifuPics.img + name);
    if (res.status == 200) return res.body;
    return false;
};

module.exports = {
    getImg,
    getImgStream,
    getType,
};
