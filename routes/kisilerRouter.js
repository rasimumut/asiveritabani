const express = require('express')
const router = express.Router();
const { poolPromise, sql } = require('../db.js')

router.get('', async function (req, res) {
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('SELECT * FROM kisiler')
        if (queryResult.recordset.length > 0) {
            res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Empty" }));
        }
    }
    catch (err) {
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});

router.get(`/:id`, async function (req, res) {
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('SELECT * FROM kisiler WHERE kisiID =' +req.params.id)
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



router.post('/',async (req, res) => {
    try{
        const pool = await poolPromise
        const kisi = new Object(req.body)
        const sehirID = kisi.sehirID2.slice(0,2)
        const sehir = kisi.sehirID2.slice(3,-1)
        const queryResult = await pool.request()
            .query('INSERT INTO kisiler (sehir,tc,fullname,yasAralik,kullaniciSifre,sehirID,tel) VALUES '+ "("+"'"+sehir+"'" +","+"'"+kisi.tc2+"'"+","+"'"+kisi.fullname2+"'"+"," +"'"+kisi.yasAralik2+"'"+","+"'"+kisi.kullaniciSifre2+"'"+","+sehirID+","+"'"+kisi.tel2+"'"+")")
            res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }catch (err){
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


router.delete('/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('DELETE FROM kisiler WHERE kisiID='+ req.params.id )

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
            .query('UPDATE kisiler SET '+req.params.name+"="+req.params.value+' WHERE kisiID='+req.params.id)
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));


    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});



module.exports = router;
