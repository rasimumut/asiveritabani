const express = require('express')
const router = express.Router();
const { poolPromise, sql } = require('../db.js')


router.get('', async function (req, res) {
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('SELECT * FROM saglikBakanlikSiparis')
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
            .query('SELECT * FROM saglikBakanlikSiparis WHERE siparisID =' +req.params.id)
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
    const siparis = new Object(req.body)
    const queryResult = await pool.request()
        .query('INSERT INTO saglikBakanlikSiparis (birimID,asiID,adet) VALUES '+ "("+siparis.birimID+","+siparis.tarih+"," +siparis.asiID+","+siparis.adet+")")
    if (queryResult.recordset.length > 0) {
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }else {
        res.send(JSON.stringify({ success: false, message: "Empty" }));
    }
}catch (err){
    res.status(500) //Internal Server Error
    res.send(JSON.stringify({ success: false, message: err.message }));
}
});


router.delete('/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('DELETE FROM saglikBakanlikSiparis WHERE siparisID='+ req.params.id )
        if (queryResult.recordset.length > 0) {
            res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
        }else {
            res.send(JSON.stringify({ success: false, message: "Empty" }));
        }
    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


router.patch('/:id/:name/:value',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
       // UPDATE saglikBakanlikSiparis SET  AND dyeri='Kırıkkale' WHERE ID=42
            .query('UPDATE saglikBakanlikSiparis SET '+req.params.name+"="+req.params.value+' WHERE siparisID='+req.params.id)

            res.send(JSON.stringify({ success: true, result: queryResult.recordset}));

    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});




module.exports = router;
