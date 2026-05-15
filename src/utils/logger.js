const fs = require('fs')
const path = require('path')
const { fileURLToPath } = require('url')


const LOG_DIR = path.join(__dirname, '..', '..', 'logs')
const LOG_FILE = path.join(LOG_DIR, 'editor.log')

function ensureLogFile() {
    if (!fs.existsSync(LOG_DIR)) {
        fs.mkdirSync(LOG_DIR, { recursive: true })
    }

    if (!fs.existsSync(LOG_FILE)) {
        fs.writeFileSync(LOG_FILE, '')
    }
}

function getTimeStamp() {
    return new Date().toISOString()
}

function write(level, message) {
    ensureLogFile()

    const line =
    `[${getTimeStamp()}] [${level}] ${message}\n`

    fs.appendFileSync(LOG_FILE, line)
}

function info(message) {
    write('INFO', message)
}

function debug(message) {
    write('DEBUG', message)
} 

function error(message) {
    write('ERROR', message)
}
function warn(message) {
    write('WARN', message)
}

module.exports = {
    info,
    debug,
    warn,
    error
}