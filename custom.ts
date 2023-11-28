 
/**
* Bruk denne fila for å definere egne funksjoner og blokker.
* Les mer i https://makecode.microbit.org/blocks/custom
*/
let strip = neopixel.create(DigitalPin.P0, 24, NeoPixelMode.RGB)
let selfStatus = false
let linkStatus = false
let igniterStatus = false
let igniterStatusLP = false
let armStatus = false
let armStatusLP = false
let klar = false
/**
 * Custom blocks
 */
//% weight=100 color=#ff0000 icon="\uf135"
//% groups="['Status', 'Knapper']"
namespace RocketLink {

    //% block="Sett status på $velgVariabel til $status"
    //% velgVariabel.defl=selfStatus
    //% velgVariabel.shadow=variables_get
    //% group="Status"
    export function Statusoppdatering (velgVariabel?: boolean, status?: boolean): void {
        if (selfStatus) {
            selfStatus = false
        } else {
            selfStatus = true
        }
        if (selfStatus) {
            selfStatus = false
        } else {
            selfStatus = true
        }
    }
    //% block="Kjør sjekk av igniterStatus"
    //% group="Status"
    export function Ignitersjekk() {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        pins.digitalWritePin(DigitalPin.P14, 1)
        basic.pause(200)
        if (pins.digitalReadPin(DigitalPin.P2) == 1) {
            igniterStatus = true
            radio.sendNumber(21)
        } else {
            igniterStatus = false
            radio.sendNumber(22)
        }
        pins.digitalWritePin(DigitalPin.P14, 0)
    }

    //% block="Trykker på Statussjekk-knappen"
    //% group="Knapper"
    export function statusSjekk(): boolean {
        if (pins.digitalReadPin(DigitalPin.P5) == 0) {
            return true
        } else {
            return false
        }
    }

    //% block="Trykker på Launch-knappen"
    //% group="Knapper"
    export function launch(): boolean {
        if (pins.digitalReadPin(DigitalPin.P11) == 0) {
            return true
        } else {
            return false
        }
    }

    //% block="Armerer ControllerPAD"
    //% group="Knapper"
    export function armCP(): boolean {
        if (pins.digitalReadPin(DigitalPin.P1) == 0) {
            return true
        } else {
            return false
        }
    }

    //% block="Armerer LaunchPAD"
    //% group="Knapper"
    export function armLP(): boolean {
        if (pins.digitalReadPin(DigitalPin.P1) == 1) {
            return true
        } else {
            return false
        }
    }
}
