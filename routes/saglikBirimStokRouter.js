const express = require('express')
const router = express.Router();
const { poolPromise, sql } = require('../db.js')






router.get('', async function (req, res) {
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('select sum(adet) as toplamStok,saglikBirimID, saglikBirimAdi,saglikBirimTip from birimStok, saglikBirim\n' +
                'where\tsaglikBirim.saglikBirimID = birimStok.birimID    \n' +
                'group by birimID , saglikBirimTip,saglikBirimAdi ,saglikBirimID')
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

router.get(`/birim/:id`, async function (req, res) {
    try {
        console.log("geldi")
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('select * from asiStok,birimStok where asiStok.asiID = birimStok.asiID and birimID =  ' +req.params.id)
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


router.get(`/:id`, async function (req, res) {
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('select sum(adet) as toplamStok,saglikBirimID, saglikBirimAdi,saglikBirimTip from birimStok, saglikBirim\n' +
                'where\tsaglikBirim.saglikBirimID = birimStok.birimID and birimID= ' + req.params.id      + '   \n' +
                'group by birimID , saglikBirimTip,saglikBirimAdi ,saglikBirimID')
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
            .query('INSERT INTO birimStok (adet,asiID,birimID) VALUES '+ "("+birim.adet+","+birim.asiID+","+birim.birimID+")" )
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }catch (err){
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});








router.delete('/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('DELETE FROM birimStok WHERE stokID='+ req.params.id )
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
            .query('UPDATE birimStok SET '+req.params.name+"="+req.params.value+' WHERE stokID='+req.params.id)

        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});







router.patch('/doktor/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('UPDATE birimStok SET '+req.params.name+"="+req.params.value+' WHERE stokID='+req.params.id)

        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});




router.patch('/asiyapildi/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const data = new Object(req.body)
        console.log(data)
        const queryResult = await pool.request()
            .query('UPDATE birimStok SET adet = adet-1  WHERE  asiID='+req.params.id + 'and birimID = ' + data.saglikBirimID )

        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


module.exports = router;
