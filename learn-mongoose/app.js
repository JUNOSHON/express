import express from 'express';
import path from 'path';
import morgan from 'morgan';
import nunjucks from 'nunjucks';

import connect from './schemas/index.js';

const app = express();
const __dirname = path.resolve();

app.set('port',process.env.PORT||3002);
app.set('view engine','html');
nunjucks.configure('views',{
    express : app,
    watch:true,
});
connect();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.use((req,res,next)=> {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err,req,res,next)=> {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err:{};
    res.status(err.status||500);
    res.render('error');
});
app.listen(app.get('port'), () => {
    console.log(app.get('port'),'번 포트에서 대기 중');
});