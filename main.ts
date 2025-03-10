//% color="#EEAA00" icon="\uf1b9"
//% block="ET: Buggy"
//% block.loc.nl="ET: Buggy"
namespace EtBuggy {

    let MODULE: string = "EtBuggy"

    let EXLEFTRIGHT = false
    let EXFORWREV = false

    export enum Calibration {
        //% block="driving 1 meter"
        //% block.loc.nl="1 meter rijden"
        Distance,
        //% block="1 turn of the wheel"
        //% block.loc.nl="1 rondje van het wiel"
        Rotation,
        //% block="45° steering"
        //% block.loc.nl="45° bijsturen"
        Steering
    }

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

    //% block="calibrate %calib for %id"
    //% block.loc.nl="kalibreer %calib voor %id"
    //% id.defl="EtBuggy"
    export function calibrate(calib: Calibration, id: string) {
        if (calib == Calibration.Distance)
            EtCommon.sendSignal(id, "caldististance", "")
        else
            if (calib == Calibration.Rotation)
                EtCommon.sendSignal(id, "calrotation", "")
            else
                EtCommon.sendSignal(id, "calstering", "")
    }

    //% block="exchange left and right with %id"
    //% block.loc.nl="verwissel links en rechts bij %id"
    //% id.defl="EtBuggy"
    export function exchLeftRight(id: string) {
        EXLEFTRIGHT = true;
    }

    //% block="exchange forward and reverse with %id"
    //% block.loc.nl="verwissel vooruit en achteruit bij %id"
    //% id.defl="EtBuggy"
    export function exchForwRev(id: string) {
        EXFORWREV = true;
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

    //% block="steer %id %degr ° to the %turn"
    //% block.loc.nl="stuur %id %degr ° naar %turn"
    //% id.defl="EtBuggy"
    export function setTurning(id: string, degr: number, turn: Turning) {
        if (turn == Turning.Left)
            EtCommon.sendSignal(id, (EXLEFTRIGHT ? "right" :"left"), degr.toString())
        else
            EtCommon.sendSignal(id, (EXLEFTRIGHT ? "left" : "right"), degr.toString())
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

    //% block="move %id %dir at %speed m/s"
    //% block.loc.nl="rijd %id %dir met %speed m/s"
    //% id.defl="EtBuggy"
    //% speed.min=0 speed.max=2 speed.defl=1
    export function setSpeedMps(id: string, dir: Direction, speed: number) {
        if (dir == Direction.Forward)
            EtCommon.sendSignal(id, (EXFORWREV ? "rmps" : "fmps"), speed.toString())
        else
            EtCommon.sendSignal(id, (EXFORWREV ? "fmps" : "rmps"), speed.toString())
    }

    //% block="move %id %dir at %speed km/hr"
    //% block.loc.nl="rijd %id %dir met %speed km/uur"
    //% id.defl="EtBuggy"
    //% speed.min=0 speed.max=7 speed.defl=4
    export function setSpeedKph(id: string, dir: Direction, speed: number) {
        if (dir == Direction.Forward)
            EtCommon.sendSignal(id, (EXFORWREV ? "rkph" : "fkph"), speed.toString())
        else
            EtCommon.sendSignal(id, (EXFORWREV ? "fkph" : "rkph"), speed.toString())
    }

    //% block="move %id %dir at %speed \\% of speed"
    //% block.loc.nl="rijd %id %dir met %speed \\% snelheid"
    //% id.defl="EtBuggy"
    //% speed.min=0 speed.max=100 speed.defl=50
    export function setSpeedPerc(id: string, dir: Direction, speed: number) {
        if (dir == Direction.Forward)
            EtCommon.sendSignal(id, (EXFORWREV ? "rperc" : "fperc"), speed.toString())
        else
            EtCommon.sendSignal(id, (EXFORWREV ? "fperc" : "rperc"), speed.toString())
    }
}
