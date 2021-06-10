const express = require('express')
const router = express.Router();
const { poolPromise } = require('../db.js')
const jwt = require('jsonwebtoken');






router.post('',async (req, res) => {
    try{
        const pool = await poolPromise
        const kullanici = new Object(req.body)
        const queryResult = await pool.request()
            .query('select kullaniciAdi,kullaniciSifre,rol,rolID,fullname,personelId from kullanicilar where kullaniciAdi=' +"'"+ kullanici.kullaniciAdi+"'"+" and kullaniciSifre ="+ "'" +kullanici.kullaniciSifre+"'" )
        if (queryResult.recordset.length > 0) {
            const obj = queryResult.recordset[0]
            const token = jwt.sign({
                kullaniciAdi:obj.kullaniciAdi,
                kullaniciSifre:obj.kullaniciSifre,
                rol:obj.rol,
                rolID:obj.rolID,
                fullname:obj.fullname,
                personelId:obj.personelId
            },'123456')
            // const sonuc  = jwt.verify(token,'123456')
            // console.log(sonuc)
            res.json({
                succes:true,
                token
            });
        }else {
            res.json({
                succes:false,
                message:"Kullanıcı adı veya şifre hatalı"});
        }
    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


router.post('/randevu',async (req, res) => {
    try{

        const pool = await poolPromise
        const kisi = new Object(req.body)
        const queryResult = await pool.request()
            .query('select tc,kullaniciSifre,fullname,tel,sehir,yasAralik,sehirID from kisiler where tc=' + kisi.tc+" and kullaniciSifre ="+ "'" +kisi.kullaniciSifre+"'" )
        if (queryResult.recordset.length > 0) {
            const obj = queryResult.recordset[0]
            const token = jwt.sign({
                tc:obj.tc,
                kullaniciSifre:obj.kullaniciSifre,
                fullname:obj.fullname,
                tel:obj.tel,
                sehir:obj.sehir,
                yasAralik:obj.yasAralik,
                sehirID:obj.sehirID
            },'123456')

            // const sonuc  = jwt.verify(token,'123456')
            // console.log(sonuc)
            res.json({
                succes:true,
                token
            });
        }else {
            res.json({
                succes:false,
                message:"Kullanıcı adı veya şifre hatalı"});
        }
    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


module.exports = router;
