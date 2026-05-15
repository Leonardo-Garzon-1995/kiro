const { clearScreen, moveTerminalCursor, hideCursor, showCursor, clearLine } = require('./ansi')

function refreshScreen(state) {
    hideCursor()
    moveTerminalCursor(1, 1)
    drawRows(state)
    moveTerminalCursor(state.cursorX + 1, state.cursorY + 1)
    showCursor()
}

function drawRows(state) {
    for (let row = 0; row <= state.screenRows; row++) {
        moveTerminalCursor(1, row + 1)

        clearLine()

        const line = state.buffer.getLine(row)

        if (line !== undefined) {
            process.stdout.write(line.slice(0, state.screenCols))
        } else {
            process.stdout.write('~')
        }
    }
}

module.exports = {
    refreshScreen
}