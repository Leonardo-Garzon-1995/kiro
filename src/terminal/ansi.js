function clearScreen() {
    process.stdout.write('\x1b[2J')
    process.stdout.write('\x1b[H')
}

function moveTerminalCursor(x, y) {
    process.stdout.write(`\x1b[${y};${x}H`)
}

function hideCursor() {
    process.stdout.write('\x1b[?25l')
}
function showCursor() {
    process.stdout.write('\x1b[?25h')
}

function clearLine() {
    process.stdout.write('\x1b[2K')
}

function clearScreenDown() {
    process.stdout.write('\x1b[J')
}

module.exports = {
    clearScreen,
    moveTerminalCursor,
    hideCursor,
    showCursor,
    clearLine,
    clearScreenDown
}