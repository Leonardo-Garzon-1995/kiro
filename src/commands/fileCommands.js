const fs = require('fs')

const logger = require('../utils/logger')

function openFile(state, filename) {
    const content = fs.readFileSync(filename, 'utf-8')

    const normalize = content.replace(/^\uFEFF/, '').replace(/\r?\n/g, '\n')

    state.buffer.lines = normalize.split('\n')

    state.filename = filename

    state.isDirty = false

    logger.info(`Open file '${filename}'`)
}

function saveFile(state) {
    if (!state.filename) {
        return
    }

    const content = state.buffer.lines.join('\n')

    fs.writeFileSync(state.filename, content, 'utf8')

    state.isDirty = false
    state.statusMessage = 'File Saved'

    logger.info(`Saved file '${state.filename}'`)
}

module.exports = {
    openFile,
    saveFile
}