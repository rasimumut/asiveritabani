const sql = require('mssql/msnodesqlv8')
const waut = require('msnodesqlv8');
var config ={
    database: "umut",
    server: "DESKTOP-0F55LFS\\SQLEXPRESS",
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
}

const poolPromise = new sql.ConnectionPool(config)
.connect()
.then(pool => {
       console.log("veritabanına bağlandı")
    return pool
}).catch(err => {
        console.log(err)})



module.exports = {sql,poolPromise}


