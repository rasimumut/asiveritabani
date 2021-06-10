const express = require('express')
const router = express.Router();
const { poolPromise } = require('../db.js')


router.get('', async function (req, res) {
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('select * from asiYapildi,kisiler where  asiYapildi.tc = kisiler.tc')
        if (queryResult.recordset.length > 0) {
            res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Empty" }));
        }
    }catch (err) {
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});

router.get(`/:id`, async function (req, res) {
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('select * from asiYapildi,kisiler where  asiYapildi.tc = kisiler.tc   and doktorID = '+ req.params.id)
        if (queryResult.recordset.length > 0) {
            res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
        } else {
            res.send(JSON.stringify({ success: false, message: "Empty" }));
        }
    }
    catch (err) {
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});

router.get(`/randevu/:id`, async function (req, res) {
    try {
        console.log('geldi')
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('select asiYapildi.doz,asiYapildi.tarih,asiYapildi.tc,randevu.fullname,randevu.tel,asiStok.marka,randevu.randevuTarihi\n' +
                'from asiStok, asiYapildi,randevu \n' +
                'where asiStok.asiID= randevu.asiID and asiYapildi.tc=randevu.tc  and asiYapildi.tc = ' +req.params.id)
        if (queryResult.recordset.length > 0) {
            res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
        } else {
            res.send(JSON.stringify({ success: false, message: "Empty" }));
        }
    }
    catch (err) {
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});



router.get(`/yap/randevu/:id`, async function (req, res) {
    try {
        console.log('geldi')
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('select*from asiYapildi where tc = ' +req.params.id)
        if (queryResult.recordset.length > 0) {
            res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
        } else {
            res.send(JSON.stringify({ success: false, message: "Empty" }));
        }
    }
    catch (err) {
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});







router.get(`/birim/:id`, async function (req, res) {
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('select asiYapildi.doz,asiYapildi.tarih,asiYapildi.tc,randevu.fullname,randevu.tel,asiStok.marka,randevu.randevuTarihi\n' +
                'from asiStok, asiYapildi,randevu \n' +
                'where asiStok.asiID= randevu.asiID and asiYapildi.tc=randevu.tc  and asiYapildi.birimID = ' +req.params.id)
        if (queryResult.recordset.length > 0) {
            res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
        } else {
            res.send(JSON.stringify({ success: false, message: "Empty" }));
        }
    }
    catch (err) {
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});









router.post('',async (req, res) => {
    try{
        const pool = await poolPromise

        const asi = new Object(req.body)
        console.log(asi[1])
        const queryResult = await pool.request()
            .query('INSERT INTO asiYapildi (tarih,doz,birimID,tc,marka,doktorID,randevuID) VALUES '+ "( GETDATE(), "+ 1+","+asi[1]+",'"+asi[0].tc+"','"+asi[0].marka+"'," +asi[1]+","+asi[0].randevuID + ")")
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }catch (err){

        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


router.delete('/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('DELETE FROM asiYapildi WHERE id='+ req.params.id )

        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));

    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


router.patch('/:id/:name/:value',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('UPDATE asiYapildi SET '+req.params.name+"="+req.params.value+' WHERE id='+req.params.id)
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));

    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


module.exports = router;
