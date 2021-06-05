const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('layout', 'layouts/default');
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(expressLayouts);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => console.log('Server is running...'));
