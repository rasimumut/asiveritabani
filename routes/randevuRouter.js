const express = require('express')
const router = express.Router();
const { poolPromise } = require('../db.js')






router.get('', async function (req, res) {
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('SELECT * FROM randevu')
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





router.get(`/asibilgi/:id`, async function (req, res) {
    try {

        const pool = await poolPromise
        const queryResult = await pool.request()
            .query(' select sum(birimStok.adet) as adet, birimStok.birimID, birimStok.asiID,asiStok.marka\n' +
                ' from asiStok, birimStok\n' +
                ' where asiStok.asiID = birimStok.asiID and birimID ='+ req.params.id+ '\n' +
                ' group by birimStok.asiID, birimID,birimStok.asiID,asiStok.marka' )
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
            .query('SELECT * FROM randevu WHERE saglikBirimID =' +req.params.id)
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







router.get(`/randevuonay/:id`, async function (req, res) {
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('SELECT * FROM randevuonay WHERE tc   =' +req.params.id)
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
            .query('SELECT * FROM randevu WHERE randevuID =' +req.params.id)
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

router.get(`/gunkontrol/:id`, async function (req, res) {
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('select randevu.randevuTarihi, GETDATE() now, \n' +
                'DATEDIFF(day,randevu.randevuTarihi,GETDATE()) AS gun\n' +
                'from randevu where tc = ' +req.params.id)
        if (queryResult.recordset.length > 0) {
            res.send(JSON.stringify({ gun: queryResult.recordset}));
        } else {
            res.send(JSON.stringify({ success: false, message: "Empty" }));
        }
    }
    catch (err) {
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});







router.get(`/bilgi/:id`, async function (req, res) {
    try {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('SELECT * FROM randevu WHERE tc =' +req.params.id)
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





router.post('/randevuonay',async (req, res) => {
    try{

        const pool = await poolPromise
        const randevu = new Object(req.body)
        const queryResult = await pool.request()
            .query('INSERT INTO randevuonay (doktorID,asiID,doz,fullname,tc,yasAralik,randevuTarihi,saglikBirimID,tel) VALUES ('+randevu.doktorID+","+randevu.asiID+","+randevu.doz+"," +"'"+randevu.fullname+ "'" +","+"'"+randevu.tc+"'"+","+"'"+randevu.yasAralik+"'"+","+"'"+randevu.randevuTarihi+"'"+","+randevu.saglikBirimID+","+"'"+randevu.tel+"'"+")")
        res.send(JSON.stringify({ success: true, randevu:randevu ,result: queryResult.recordset }));
    }catch (err){
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});




router.post('',async (req, res) => {
    try{

        const pool = await poolPromise
        const randevu = new Object(req.body)
        const queryResult = await pool.request()
            .query('INSERT INTO randevu (doktorID,asiID,doz,fullname,tc,yasAralik,randevuTarihi,saglikBirimID,tel) VALUES ('+randevu.doktorID+","+randevu.asi+","+randevu.doz+"," +"'"+randevu.fullname+ "'" +","+"'"+randevu.tc+"'"+","+"'"+randevu.yasAralik+"'"+","+"'"+randevu.randevuTarihi+"'"+","+randevu.saglikBirimID+","+"'"+randevu.tel+"'"+")")
        res.send(JSON.stringify({ success: true, randevu:randevu ,result: queryResult.recordset}));
    }catch (err){
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});

router.post('/doz1',async (req, res) => {
    try{

        const pool = await poolPromise
        const randevu = new Object(req.body)
        const queryResult = await pool.request()
            .query('INSERT INTO doz1     (doktorID,asiID,doz,fullname,tc,yasAralik,randevuTarihi,saglikBirimID,tel) VALUES ('+randevu.doktorID+","+randevu.asi+","+randevu.doz+"," +"'"+randevu.fullname+ "'" +","+"'"+randevu.tc+"'"+","+"'"+randevu.yasAralik+"'"+","+"'"+randevu.randevuTarihi+"'"+","+randevu.saglikBirimID+","+"'"+randevu.tel+"'"+")")
        res.send(JSON.stringify({ success: true, randevu:randevu ,result: queryResult.recordset}));
    }catch (err){
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});

router.post('/doz2',async (req, res) => {
    try{

        const pool = await poolPromise
        const randevu = new Object(req.body)
        const queryResult = await pool.request()
            .query('INSERT INTO doz2 (doktorID,asiID,doz,fullname,tc,yasAralik,randevuTarihi,saglikBirimID,tel) VALUES ('+randevu.doktorID+","+randevu.asi+","+randevu.doz+"," +"'"+randevu.fullname+ "'" +","+"'"+randevu.tc+"'"+","+"'"+randevu.yasAralik+"'"+","+"'"+randevu.randevuTarihi+"'"+","+randevu.saglikBirimID+","+"'"+randevu.tel+"'"+")")
        res.send(JSON.stringify({ success: true, randevu:randevu ,result: queryResult.recordset}));
    }catch (err){
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


router.delete('/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('DELETE FROM randevu WHERE randevuID='+ req.params.id )

        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));

    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});




router.delete('/randevuonay/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query('DELETE FROM randevuonay WHERE randevuID='+ req.params.id )

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
            .query('UPDATE randevu SET '+req.params.name+"="+req.params.value+' WHERE randevuID='+req.params.id)
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));

    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});



//update doz1

router.patch('/doz1update/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query("UPDATE randevu SET doz1 ='ok' WHERE randevuID="+req.params.id)
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));

    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});

//update doz2
router.patch('/doz2update/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query("UPDATE randevu SET doz2 ='ok' WHERE randevuID="+req.params.id)
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));

    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});

//update durum
router.patch('/durum/:id',async (req, res) => {
    try{
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query("UPDATE randevu SET durum ='ok' WHERE randevuID="+req.params.id)
        res.send(JSON.stringify({ success: true, result: queryResult.recordset}));

    }catch (err){
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
    }
});


module.exports = router;
