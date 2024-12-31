//% color="#EEAA00" icon="\u2699"
//% block="ET: Buggy"
//% block.loc.nl="ET: Buggy"
namespace EtEdrive {

    let MODULE: string = "EtBuggy"

    //% block="ID"
    //% block.loc.nl="ID"
    export function id(): string {
        return MODULE
    }

    //% block="set module id to %id"
    //% block.loc.nl="stel de module id in op %id"
    //% id.defl="EtBuggy"
    export function setModuleId(id: string) {
        MODULE = id
    }

    //% block="set speed of %id to %speed \\%"
    //% block.loc.nl="stel de snelheid van %id in op %speed \\%"
    //% id.defl="EtBuggy"
    //% speed.min=0 speed.max=100 speed.defl=50
    export function setSpeed(id: string, speed: number) {
        EtCommon.setValue(id, "speed", "20")
    }

    //% block="speed of %id"
    //% block.loc.nl="snelheid van %id"
    //% id.defl="EtBuggy"
    export function getSpeed(id: string): number {
        let speed: string = ""
        EtCommon.askValue(id, "speed")
        while (speed.isEmpty())
            speed = EtCommon.getValue(id, "A", "speed")
        return parseFloat(speed)
    }

}
