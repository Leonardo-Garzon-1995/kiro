function scroll(state) {
    // Vertical scrolling
    if (state.cursorY < state.rowOffset) {
        state.rowOffset = state.cursorY
    }

    if (state.cursorY >= state.rowOffset + state.screenRows - 1) {
        state.rowOffset = state.cursorY - state.screenRows + 2
    }

    // Horizontal scrolling
    if (state.cursorX < state.colOffset) {
        state.colOffset = state.cursorX
    }

    if (state.cursorX >= state.colOffset + state.screenCols) {
        state.colOffset =
            state.cursorX -
            state.screenCols +
            1
    }
}

module.exports = {
    scroll
}