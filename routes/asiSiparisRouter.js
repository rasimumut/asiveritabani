const express = require('express')
const router = express.Router();
const { poolPromise } = require('../db.js')


router.get('', async function (req, res) {
    // select asiSiparis.siparisID , asiSiparis.adet ,asiStok.marka, asiSiparis.tarih,asiSiparis.asiID from asiSiparis ,asiStok where asiSiparis.asiID = asiStok.asiID
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('select asiSiparis.siparisID , asiSiparis.adet ,asiStok.marka, asiSiparis.tarih,asiSiparis.asiID,asiStok.adet AS stokadedi from asiSiparis ,asiStok where asiSiparis.asiID = asiStok.asiID')
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
            .query('select asiSiparis.siparisID , asiSiparis.adet ,asiStok.marka, asiSiparis.tarih,asiSiparis.asiID,asiStok.adet AS stokadedi from asiSiparis ,asiStok where asiSiparis.asiID = asiStok.asiID and asiStok.asiID = '+req.params.id)
            res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }
    catch (err) {
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


router.post('',async (req, res) => {

    try{
        const pool = await poolPromise
        const siparis = new Object(req.body)
        const queryResult = await pool.request()
            .query('INSERT INTO asiSiparis (adet,asiID,tarih) VALUES '+ "("+siparis.adet+","+siparis.asiID+"," +"GETDATE()"+ ")")
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }catch (err){
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


router.delete('/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('DELETE FROM asiSiparis WHERE siparisID='+ req.params.id )
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


router.patch('/:id/:name/:value',async (req, res) => {
    try{
        const pool = await poolPromise
        const siparis = new Object(req.body)
        const queryResult = await pool.request()
            .query('UPDATE asiSiparis SET '+req.params.name+"="+req.params.value+' WHERE siparisID='+req.params.id)
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));

    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


module.exports = router;
