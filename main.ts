//% color="#EEAA00" icon="\uf1b9"
//% block="ET: Buggy"
//% block.loc.nl="ET: Buggy"
namespace EtBuggy {

    let MODULE: string = "EtBuggy"

    export enum Direction {
        //% block="forward"
        //% block.loc.nl="vooruit"
        Forward,
        //% block="reverse"
        //% block.loc.nl="achteruit"
        Reverse
    }

    export enum Turning {
        //% block="left"
        //% block.loc.nl="links"
        Left,
        //% block="right"
        //% block.loc.nl="rechts"
        Right
    }

    let EventStarted: EtCommon.eventHandler
    let EventStopped: EtCommon.eventHandler

    export function onEventStarted(id: string, value: string) {
        if (EventStarted) {
            EventStarted(id)
        }
    }

    export function onEventStopped(id: string, value: string) {
        if (EventStopped) {
            EventStopped(id)
        }
    }

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

    //% block="when %id stops running"
    //% block.loc.nl="wanneer %id stil komt te staan"
    //% id.defl="EtBuggy"
    export function onStopped(id: string, programmableCode: () => void): void {
        EtCommon.events.register(MODULE, "stopped", onEventStopped)
        EventStopped = programmableCode
    }

    //% block="when %id starts running"
    //% block.loc.nl="wanneer %id begint te rijden"
    //% id.defl="EtBuggy"
    export function onStarted(id: string, programmableCode: () => void): void {
        EtCommon.events.register(MODULE, "started", onEventStarted)
        EventStarted = programmableCode
    }

    //% block="move %id %dir"
    //% block.loc.nl="rijd met %id %dir"
    //% id.defl="EtBuggy"
    export function setDirection(id: string, dir: Direction) {
        if (dir == Direction.Forward)
            EtCommon.sendSignal(id, "forward", "")
        else
            EtCommon.sendSignal(id, "reverse", "")
    }

    //% block="turn %id %degr to the %turn"
    //% block.loc.nl="draai %id %degr graden naar %turn"
    //% id.defl="EtBuggy"
    export function setTurning(id: string, degr: number, turn: Turning) {
        if (turn == Turning.Left)
            EtCommon.sendSignal(id, "left", degr.toString())
        else
            EtCommon.sendSignal(id, "right", degr.toString())
    }

    //% block="move %id straight"
    //% block.loc.nl="rijd %id rechtdoor"
    //% id.defl="EtBuggy"
    export function setStraight(id: string) {
        EtCommon.sendSignal(id, "straight", "")
    }

    //% block="stop %id"
    //% block.loc.nl="stop %id"
    //% id.defl="EtBuggy"
    export function stop(id: string) {
        EtCommon.sendSignal(id, "stop", "")
    }

    //% block="move %id at %speed m/s"
    //% block.loc.nl="rijd %id met snelheid %speed m/s"
    //% id.defl="EtBuggy"
    //% speed.min=0 speed.max=2 speed.defl=1
    export function setSpeedMps(id: string, speed: number) {
        EtCommon.sendSignal(id, "mps", speed.toString())
    }

    //% block="move %id at %speed km/hr"
    //% block.loc.nl="rijd %id met snelheid %speed km/uur"
    //% id.defl="EtBuggy"
    //% speed.min=0 speed.max=7 speed.defl=4
    export function setSpeedKph(id: string, speed: number) {
        EtCommon.sendSignal(id, "kph", speed.toString())
    }

    //% block="move %id at %speed \\%"
    //% block.loc.nl="rijd %id met snelheid %speed \\%"
    //% id.defl="EtBuggy"
    //% speed.min=0 speed.max=100 speed.defl=50
    export function setSpeedPerc(id: string, speed: number) {
        EtCommon.sendSignal(id, "perc", speed.toString())
    }
}
