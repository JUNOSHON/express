import mongoose from 'mongoose';

const connect = () => {
  if(process.env.NODE_ENV !== 'production'){
    mongoose.set('debug',true);
  }
  mongoose.connect('mongodb://junoshon:thswnsgh0317@localhost:27017/admin',{
    dbName: 'nodejs2',
    useNewUrlParser: true,
  }, (error) => {
    if(error){
      console.log('몽고디비 연결 실패',error);
    }
    else{
      console.log('몽고디비 연결 성공');
    }
  });
};

mongoose.connection.on('error',(error)=>{
  console.log(('몽고디비 연결 에러'),error);
});
mongoose.connection.on('disconnected',()=>{
  console.error('몽고디비 연결 끊김, 재시도');
  connect();
});

export default connect;