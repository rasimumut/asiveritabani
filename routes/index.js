const express = require('express')
const router = express.Router();
const { poolPromise, sql } = require('../db.js')
const request = new sql.Request();

module.exports = router;
