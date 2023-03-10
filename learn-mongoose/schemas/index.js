
const mongoose = require('mongoose');



const connect = () => {

    if(process.env.NODE_ENV !== 'production'){
        mongoose.set('debug',true);
    }

    mongoose.connect('mongodb://junoshon:thswnsgh0317@localhost:27017/admin',{
        dbName: 'nodejs',
        useNewUrlParser: true,
    }, (error) => {
        if(error){
            console.log('몽고디비 연결 에러',error);
        }else{
            console.log('몽고디빙 연결 성공');
        }
    });
};

mongoose.connection.on('error',(error) => {
    console.error('몽고디비 연결 에러',error);
});
mongoose.connection.on('disconnected',()=>{
    console.error('몽고디비 연결이 끊김. 연결 재시도.');
    connect();
});

module.exports = connect;