input.onButtonPressed(Button.A, function () {
    RocketLink.ignitersjekk()
})
basic.forever(function () {
    let igniterStatus = 0
    if (igniterStatus) {
        basic.showNumber(1)
    } else {
        basic.showNumber(0)
    }
})
