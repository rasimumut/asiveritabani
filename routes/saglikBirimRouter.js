const express = require('express')
const router = express.Router();
const { poolPromise, sql } = require('../db.js')

router.get('', async function (req, res) {
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('select sum(adet) as toplamStok,saglikBirimID, saglikBirimAdi,saglikBirimTip, saglikBirim.sehir from birimStok, saglikBirim\n' +
                'where\tsaglikBirim.saglikBirimID = birimStok.birimID\n' +
                'group by birimID , saglikBirimTip,saglikBirimAdi ,saglikBirimID,sehir')
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
            .query('SELECT * FROM saglikBirim WHERE saglikBirimID =' +req.params.id)
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
        // console.log("geldi")
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('SELECT * FROM saglikBirim WHERE sehirID =' +req.params.id)
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
        const birim = new Object(req.body)
        const queryResult = await pool.request()
            .query('INSERT INTO saglikBirim (saglikBirimTip,saglikBirimAdi) VALUES '+ "("+"'"+birim.saglikBirimTip+"'"+","+"'"+birim.saglikBirimAdi+"'"+")")
            res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


router.delete('/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('DELETE FROM saglikBirim WHERE saglikBirimID='+ req.params.id )
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
            .query('UPDATE saglikBirim SET '+req.params.name+"="+req.params.value+' WHERE saglikBirimID='+req.params.id)

        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});



module.exports = router;
