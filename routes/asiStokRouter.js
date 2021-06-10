const express = require('express')
const router = express.Router();
const { poolPromise, sql } = require('../db.js')

router.get(``, async function (req, res) {
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('SELECT * FROM asiStok')
        if (queryResult.recordset.length > 0) {
            res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Empty" }));
        }
    }
    catch (err) {
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


router.get(`/:id`, async function (req, res) {
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('SELECT * FROM asiStok WHERE asiID =' +req.params.id)
        if (queryResult.recordset.length > 0) {
            res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
        } else {
            res.send(JSON.stringify({ success: false, message: "Empty" }));
        }
    }
    catch (err) {
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});



router.post('',async (req, res) => {
    try{
        const pool = await poolPromise
        const asi = new Object(req.body)
        const queryResult = await pool.request()
            .query('INSERT INTO asiStok (adet,etkiYuzdesi,marka,uretimtarihi,birimfiyat,mensei) VALUES '+"("+asi.adet+","+asi.etkiYuzdesi+","+"'"+asi.marka+"'"+","+"'"+asi.uretimtarihi +"'" +","+ asi.birimfiyat+","+"'"+asi.mensei+"'" + ")")
            res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }catch (err){
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


router.delete('/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('DELETE FROM asiStok WHERE asiID='+ req.params.id )

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
            .query('UPDATE asiStok SET '+"adet ="+(asi.stokadedi - asi.adet)+'WHERE asiID='+req.params.id)
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
    }catch (err){
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});

router.patch('/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const asi = new Object(req.body)
        const queryResult = await pool.request()
            .query('UPDATE asiStok SET '+"mensei="+"'"+asi.mensei+"'"+"," + "adet ="+asi.adet+","+ "birimfiyat ="+asi.birimfiyat+"," +"marka ="+"'"+ asi.marka+"'"+ "," + "etkiYuzdesi =" + asi.etkiYuzdesi+","+"uretimtarihi =" +"'"+asi.uretimtarihi+"'"+ 'WHERE asiID='+req.params.id)
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));
        // (adet,etkiYuzdesi,marka,uretimtarihi)
    }catch (err){
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


module.exports = router;
