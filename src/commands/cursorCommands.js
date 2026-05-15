const logger = require('../utils/logger')

function moveEditorCursor(key, state) {
    try {
        switch(key) {
            case '\u001b[A':
                if (state.cursorY > 0) {
                    state.cursorY--

                    const line = state.buffer.getLine(state.cursorY) || ''

                    state.cursorX = Math.min(state.cursorX, line.length)
                }
                break
            case '\u001b[B':
                if (state.cursorY < state.buffer.lines.length - 1) {
                    state.cursorY++

                    const line = state.buffer.getLine(state.cursorY) || ''
                
                    state.cursorX = Math.min(state.cursorX, line.length)
                }
                break
            case '\u001b[C':

            const line = state.buffer.getLine(state.cursorY) || ''
                if (state.cursorX < line.length) {
                    state.cursorX++
                }
                break
            case '\u001b[D':
                if (state.cursorX > 0) {
                    state.cursorX--
                }
                break
        }
        logger.debug(`Cursor: x-${state.cursorX}, y-${state.cursorY}`)
    } catch (error) {
        logger.error(error.stack)
        throw new Error(error)
        
    }
}

module.exports = {
    moveEditorCursor
}