require('dotenv').config()
const dB = require('./database/database');
const genericDAO = require('./database/genericDAO');
dB.get();
(async()=>{
    const resp = await genericDAO.createIndexUnique("moves","id");
    console.log(resp)
    process.exit();
})()
