const fetch = require('node-fetch');
const { host, port, waifuPics } = require('../config.json');

const getName = url => {
    return url.slice(waifuPics.img.length);
};
const modUrl = url => {
    return `${host}:${port}/img/${getName(url)}`;
};
const getUrl = async () => {
    const res = await fetch(waifuPics.api + 'sfw/waifu');
    if (res.status == 200) {
        const body = await res.json();
        return modUrl(body.url);
    }
    return false;
};
const getUrlMany = async (tag, type = 'sfw') => {
    const uri = `${waifuPics.api}many/${type}/${tag || 'waifu'}`;
    const res = await fetch(uri, {
        method: 'post',
        body: JSON.stringify({ exclude: [] }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (res.status == 200) {
        const body = await res.json();
        return body.files.map(url => modUrl(url));
    }
    return false;
};
const getImgStream = async name => {
    const res = await fetch(waifuPics.img + name);
    if (res.status == 200) return res.body;
    return false;
};

module.exports = {
    getUrl,
    getUrlMany,
    getImgStream,
};
