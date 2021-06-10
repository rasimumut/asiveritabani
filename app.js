'use strict'
const jwt = require('jsonwebtoken');
const cors = require('cors');
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const routes = require('./routes/index.js')
const publicDir = (__dirname + '/public');



app.use(cors())
app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.get('/',(req, res) => {
    res.status(200).json({'mesaj':'Veritabanındasın'});
})

//ROUTER req
const saglikBirimRouter = require('./routes/saglikBirimRouter')
const saglikBirimSiparisRouter = require('./routes/saglikBirimSiparisRouter')
const saglikBirimStokRouter = require('./routes/saglikBirimStokRouter')
const saglikBakanligiSiparisRouter = require('./routes/saglikBakanligiSiparisRouter')
const saglikBakanligiStokRouter = require('./routes/saglikBakanligiStokRouter')
const kisilerRouter = require('./routes/kisilerRouter')
const asiStokRouter = require('./routes/asiStokRouter')
const randevuRouter = require('./routes/randevuRouter')
const doktorRouter = require('./routes/doktorRouter')
const asiSiparisRouter = require('./routes/asiSiparisRouter')
const asiYapildiRouter = require('./routes/asiYapildiRouter')
const loginRouter = require('./routes/login')
const sehirlerRouter = require('./routes/sehirler')

//AŞI
app.use('/api/asistok',asiStokRouter)
app.use('/api/asisiparis',asiSiparisRouter)
app.use('/api/asiyapildi',asiYapildiRouter)

//BAKANLIK
app.use('/api/saglikbakanligisiparis',saglikBakanligiSiparisRouter)
app.use('/api/saglikbakanligistok',saglikBakanligiStokRouter)


//HASTALAR
app.use('/api/kisiler',kisilerRouter)


//RANDEVU
app.use('/api/randevu',randevuRouter)


//DOKTORLAR
app.use('/api/doktor',doktorRouter)

//Birimler
app.use('/api/saglikbirim',saglikBirimRouter)
app.use('/api/saglikbirimsiparis',saglikBirimSiparisRouter)
app.use('/api/saglikbirimstok',saglikBirimStokRouter)

// KULLANICILAR
app.use('/api/login',loginRouter)

app.use('/api/sehirler',sehirlerRouter)
// function test (){
//     const token = jwt.sign({
//         kullaniciAdi:"umut",
//         kullaniciSifre:"123456",
//         rol:"admin"
//     },'123456')
//     console.log(token)
//     const sonuc  = jwt.verify(token,'123456')
//     console.log(sonuc)
// }
//  test()
app.listen(3000, () => { console.log("server ayakta") });
