enum status
{
    //% block="selfStatus"
    selfStatus,
    //% block="linkStatus"
    linkStatus,
    //% block="igniterStatus"
    igniterStatus,
    //% block="igniterStatusLP"
    igniterStatusLP,
    //% block="armStatus"
    armStatus,
    //% block="armStatusLP"
    armStatusLP,
    //% block="klar"
    klar
}


/**
 * RocketLink-M blokker
 */

//% weight=80 color=#ff0000 icon="\uf135"
//% groups="['Status', 'Knapper - ControllerPAD', 'Knapper - LaunchPAD', 'Knapper - Felles']"

namespace RocketLink {

    let selfStatus = false
    let linkStatus = false
    let armStatus = false
    let armStatusLP = false
    let igniterStatus = false
    let igniterStatusLP = false
    let klar = false

    //% block="Sett $velgVariabel til $statusBool"
    //% subcategory=Status
    //% group="Status"
    export function Statusoppdatering(velgVariabel?: status, statusBool?: boolean): void {
        if (status.selfStatus && statusBool == true) {
            basic.showNumber(1)
        } else {
            basic.showNumber(0)
        }
        if (status.linkStatus && statusBool == true) {
            basic.showNumber(11)
        } else {
            basic.showNumber(10)
        }
    }
    //% block="Kjør sjekk av igniterStatus"
    //% subcategory=Status
    //% group="Status"
    export function ignitersjekk() {
        let igniterStatus = false
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
    //% subcategory=Knapper color=#d400d4
    //% group="Knapper - Felles"
    export function statusSjekk(): boolean {
        if (pins.digitalReadPin(DigitalPin.P5) == 0) {
            return true
        } else {
            return false
        }
    }

    //% block="Trykker på Launch-knappen"
    //% subcategory=Knapper color=#d400d4
    //% group="Knapper - ControllerPAD"
    export function launchButton(): boolean {
        if (pins.digitalReadPin(DigitalPin.P11) == 0) {
            return true
        } else {
            return false
        }
    }

    //% block="Armerer ControllerPAD"
    //% subcategory=Knapper color=#d400d4
    //% group="Knapper - ControllerPAD"
    export function armCP(): boolean {
        if (pins.digitalReadPin(DigitalPin.P1) == 0) {
            return true
        } else {
            return false
        }
    }

    //% block="Armerer LaunchPAD"
    //% subcategory=Knapper color=#d400d4
    //% group="Knapper - LaunchPAD"
    export function armLP(): boolean {
        if (pins.digitalReadPin(DigitalPin.P1) == 1) {
            return true
        } else {
            return false
        }
    }

    //% block="Sjekk linkStatus til ControllerPAD: | Send radionummer $linkRadioNumber"
    //% inlineInputMode=external
    //% subcategory=Radio
    //% group="Status - Radio"
    //% color=#e5478c
    export function linksjekk(linkRadioNumber: number) {
        let sistSettAktiv = 0
        while (true) {
            radio.sendNumber(linkRadioNumber)
            if (input.runningTime() - sistSettAktiv > 3 * 200) {
                linkStatus = false
                igniterStatusLP = false
                armStatusLP = false
            }
            basic.pause(200)
        }
    }
}