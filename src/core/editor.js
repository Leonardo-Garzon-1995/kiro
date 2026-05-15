const logger = require('../utils/logger')

const { enableRawMode, onKeyPress } = require('../terminal/input')
const { clearScreen, moveTerminalCursor } = require('../terminal/ansi')
const { refreshScreen } = require('../terminal/screen')
const { insertCharacter, deleteCharacter, insertNewLine } = require('../commands/editingCommands')
const { moveEditorCursor } = require('../commands/cursorCommands')
const { openFile, saveFile } = require('../commands/fileCommands')
const EditorState = require('./state')

const state = new EditorState()

process.on('uncaughtException', (error) => {

    logger.error(error.stack)

    process.stdin.setRawMode(false)
    process.stdin.pause()

    process.exit(1)
})

function quitEditor() {
    process.stdin.setRawMode(false)
    process.stdin.pause()

    process.stdout.write('\x1b[2J')
    process.stdout.write('\x1b[H')

    logger.info("Editor exited")
    process.exit(0)
}

function startEditor() {
    try {
        enableRawMode()
        logger.info("Editor estarted")

        const filename = process.argv[2]
        if (filename) {
            openFile(state, filename)
        }

        refreshScreen(state)

        onKeyPress((key) => {
            try {
                logger.debug(`key: ${JSON.stringify(key)}`)
                if (key === '\u0003') {
                    quitEditor()
                } else if (
                    key === '\u001b[A' ||
                    key === '\u001b[B' ||
                    key === '\u001b[C' ||
                    key === '\u001b[D'
                ) {
                    moveEditorCursor(key, state)
                } else if (key === '\u007f') {
                    deleteCharacter(state)
                } else if (key === '\r') {
                    insertNewLine(state)
                } else if (key.length === 1 && key >= ' ') {
                    insertCharacter(key, state)
                } else if (key === '\u0013') {
                    saveFile(state)
                }

                refreshScreen(state)
            } catch (error) {
                logger.error(error.stack)
                quitEditor()
            }
        })
    } catch (error) {
        logger.error(error.stack)
        quitEditor()
    }
}


module.exports = {
    startEditor
}