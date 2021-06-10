const express = require('express')
const router = express.Router();
const { poolPromise, sql } = require('../db.js')

router.get('', async function (req, res) {
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('Select sum(bakanlikStok.adet) as adet, stokID, asiStok.marka, asiStok.etkiYuzdesi,\n' +
                'bakanlikStok.asiID\n' +
                '        from bakanlikStok, asiStok\n' +
                '        where bakanlikStok.asiID = asiStok.asiID\n' +
                '        group by bakanlikStok.asiID, asiStok.marka,asiStok.etkiYuzdesi,bakanlikStok.stokID,\n' +
                '\t\tbakanlikStok.asiID;\n')
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
            .query('SELECT * FROM bakanlikStok WHERE stokID =' +req.params.id)
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
        const stok = new Object(req.body)
        const queryResult = await pool.request()
            .query('INSERT INTO bakanlikStok (asiID,adet) VALUES '+ "("+stok.asiID+","+stok.adet+")" )
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
            .query('DELETE FROM bakanlikStok WHERE stokID='+ req.params.id )
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }catch (err){
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});

router.patch('/asiupdate/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const asi = new Object(req.body)
        const queryResult = await pool.request()
            .query('UPDATE bakanlikStok SET  adet = adet +' + asi.adet +' WHERE asiID='+req.params.id )
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }catch (err){
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


router.patch('/stokonay/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const asi = new Object(req.body)
        const queryResult = await pool.request()
            .query('UPDATE bakanlikStok SET  adet = adet-' + asi.adet +' WHERE asiID='+req.params.id )
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }catch (err){
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


router.patch('/:id/:name/:value',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('UPDATE bakanlikStok SET '+req.params.name+"="+req.params.value+' WHERE stokID='+req.params.id)

        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});



module.exports = router;
