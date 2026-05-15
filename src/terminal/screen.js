const { scroll } = require('../core/scroll')
const { 
    clearScreen, 
    moveTerminalCursor, 
    hideCursor, 
    showCursor, 
    clearLine, 
    clearScreenDown 
} = require('./ansi')


function refreshScreen(state) {
    hideCursor()
    moveTerminalCursor(1, 1)
    scroll(state)
    drawRows(state)
    clearScreenDown()
    drawStatusBar(state)

    const screenX = state.cursorX - state.colOffset
    const screenY = state.cursorY - state.rowOffset
    moveTerminalCursor(screenX + 1, screenY + 1)
    showCursor()
}

function drawRows(state) {
    for (let row = 0; row < state.screenRows - 1; row++) {
        moveTerminalCursor(1, row + 1)

        clearLine()
        
        const fileRow = row + state.rowOffset
        const line = state.buffer.getLine(fileRow) || ''

        if (row < state.buffer.lines.length) {
            process.stdout.write(
                line.slice(state.colOffset, state.colOffset + state.screenCols)
            )
        } else {
            process.stdout.write('~')
        }
    }
}

function drawStatusBar(state) {
    moveTerminalCursor(1, state.screenRows)

    clearLine()

    const filename = state.filename || '[No Name]'

    const modified = state.isDirty ? '(modified)' : ''

    const status = `${filename} ${modified}`

    process.stdout.write(status.padEnd(state.screenCols).slice(0, state.screenCols))
}

module.exports = {
    refreshScreen
}