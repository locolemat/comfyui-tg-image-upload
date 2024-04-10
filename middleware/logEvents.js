const {format} = require('date-fns');

const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

exports.logEvent = async(message, fileName = 'logs.txt') => {
    const dateTime = `${format(new Date(), 'ddMMyyyy\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${message}\n`;

    try{
        if (!fs.existsSync(path.join(__dirname, '../logs'))){
            await fsp.mkdir(path.join(__dirname, '../logs'))
        }
        await fsp.appendFile(path.join(__dirname, '../logs', fileName), logItem)
    }
    catch (err){
        console.error(err);
    }
    
}