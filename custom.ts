/**
 * RocketLink-M blokker
 */


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
    let sistSettAktiv = 0

    //% block="Sett $velgVariabel til $statusBool"
    //% subcategory="Status"
    //% group="Status - Felles"
    export function statusoppdatering(velgVariabel?: status, statusBool?: boolean): void {
        if (velgVariabel == status.selfStatus) {
            if (statusBool) {
                selfStatus = true
                basic.showNumber(1) 
            } else {
                selfStatus = false
                basic.showNumber(0)
            }
        } else if (velgVariabel == status.linkStatus) {
            if (statusBool) {
                linkStatus = true
                basic.showNumber(11)
            } else {
                linkStatus = false
                basic.showNumber(10)
            }
        } else if (velgVariabel == status.igniterStatus) {
            if (statusBool) {
                igniterStatus = true
                basic.showNumber(21)
            } else {
                igniterStatus = false
                basic.showNumber(20)
            }
        } else if (velgVariabel == status.igniterStatusLP) {
            if (statusBool) {
                igniterStatusLP = true
                basic.showNumber(31)
            } else {
                igniterStatusLP = false
                basic.showNumber(30)
            }
        } else if (velgVariabel == status.armStatus) {
            if (statusBool) {
                armStatus = true
                basic.showNumber(41)
            } else {
                armStatus = false
                basic.showNumber(40)
            }
        } else if (velgVariabel == status.armStatusLP) {
            if (statusBool) {
                armStatusLP = true
                basic.showNumber(51)
            } else {
                armStatusLP = false
                basic.showNumber(50)
            }
        } else if (velgVariabel == status.klar) {
            if (statusBool) {
                klar = true
                basic.showNumber(61)
            } else {
                klar = false
                basic.showNumber(60)
            }
        } else {
            return
        }
    }

    //% block="Kjør sjekk av igniterStatus"
    //% subcategory="Status"
    //% group="Status - LaunchPAD"
    export function ignitersjekk() {
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

    //% block="Armert ControllerPAD"
    //% subcategory=Knapper color=#d400d4
    //% group="Knapper - ControllerPAD"
    export function armCP(): boolean {
        if (pins.digitalReadPin(DigitalPin.P1) == 0) {
            return true
        } else {
            return false
        }
    }

    //% block="Armert LaunchPAD"
    //% subcategory=Knapper color=#d400d4
    //% group="Knapper - LaunchPAD"
    export function armLP(): boolean {
        if (pins.digitalReadPin(DigitalPin.P1) == 1) {
            return true
        } else {
            return false
        }
    }

    //% block="Sjekk om ControllerPAD er klar til oppskytning"
    //% subcategory=Status
    //% group="Status"
    export function oppskytningKlarCP(): void {
        if (selfStatus && linkStatus && igniterStatus) {
            klar = true
        } else {
            klar = false
        }
    }

    //% block="Sjekk linkStatus til ControllerPAD: | Send radionummer $linkRadioNumber"
    //% inlineInputMode=external
    //% subcategory=Radio
    //% group="Status - Radio"
    //% color=#e5478c
    export function linksjekk(linkRadioNumber: number) {
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
    //% block="$velgVariabel"
    //% subcategory=Status
    //% group="Status - Felles"
    export function statusVariabel(velgVariabel?: status): boolean {
        if (velgVariabel) {
            return true
        } else {
            return false
        }
    }
}