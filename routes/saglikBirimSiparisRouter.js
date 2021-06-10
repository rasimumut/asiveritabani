const express = require('express')
const router = express.Router();
const { poolPromise, sql } = require('../db.js')

router.get('', async function (req, res) {
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('select DISTINCT siparisID,birimID,saglikBirimSiparis.adet,saglikBirimSiparis.asiID,marka,etkiYuzdesi,saglikBirim.saglikBirimAdi,saglikBirimID,saglikBirimTip,saglikBirimSiparis.tarih\n' +
                'from  saglikBirimSiparis,asiStok,saglikBirim\n' +
                'where saglikBirimSiparis.asiId = asiStok.asiID and saglikBirimSiparis.birimID= saglikBirim.saglikBirimID ')
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
            .query('SELECT * FROM saglikBirimSiparis WHERE siparisID =' +req.params.id)
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
            .query('INSERT INTO saglikBirimSiparis (birimID,tarih,asiId,adet) VALUES '+ "(" +siparis.birimID+ "," +"GETDATE()"+ "," +siparis.asiID+","+siparis.adet+")")
            res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }catch (err){
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


router.delete('/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('DELETE FROM saglikBirimSiparis WHERE siparisID='+ req.params.id )

            res.send(JSON.stringify({ success: true, result: queryResult.recordset}));

    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


// router.patch('/stokupdate',async (req, res) => {
//     try{
//         const pool = await poolPromise
//         const queryResult = await pool.request()
//             .query('UPDATE saglikBirimSiparis SET '+req.params.name+"="+req.params.value+' WHERE siparisID='+req.params.id)
//         res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
//
//     }catch (err){
//         res.status(500) //Internal Server Error
//         res.send(JSON.stringify({ success: false, message: err.message }));
//     }
// });

router.patch('/:id/:name/:value',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('UPDATE saglikBirimSiparis SET '+req.params.name+"="+req.params.value+' WHERE siparisID='+req.params.id)
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));

    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


module.exports = router;
