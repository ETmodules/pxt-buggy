//% color="#EEAA00" icon="\uf1b9"
//% block="ET: Buggy"
//% block.loc.nl="ET: Buggy"
namespace EtEdrive {

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

    let EVENT_ISRUNNING = "isrunning"
    let EventStarted: EtCommon.eventHandler
    let EventStopped: EtCommon.eventHandler

    export function onEventStarted(id: string) {
        if (EventStarted) {
            EventStarted(id)
        }
    }

    export function onEventStopped(id: string) {
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

    //% block="module %id is playing"
    //% block.loc.nl="module %id speelt af"
    //% id.defl="EtBuggy"
    export function isPlaying(id: string): boolean {
        return EtCommon.events.testEvent(MODULE, EVENT_ISRUNNING, "true")
    }

    //% block="when playing stopped at %id"
    //% block.loc.nl="wanneer het afspelen op %id stopt"
    //% id.defl="EtBuggy"
    export function onStopped(id: string, programmableCode: () => void): void {
        EtCommon.events.register(MODULE, EVENT_ISRUNNING, "false", onEventStopped)
        EventStopped = programmableCode
    }

    //% block="when playing started at %id"
    //% block.loc.nl="wanneer het afspelen op %id begint"
    //% id.defl="EtBuggy"
    export function onStarted(id: string, programmableCode: () => void): void {
        EtCommon.events.register(MODULE, EVENT_ISRUNNING, "true", onEventStarted)
        EventStarted = programmableCode
    }

    //% block="move %id %dir"
    //% block.loc.nl="rijd met %id %dir"
    //% id.defl="EtBuggy"
    export function setDirection(id: string, dir: Direction) {
        if (dir == Direction.Forward)
            EtCommon.setValue(id, "forward", "")
        else
            EtCommon.setValue(id, "reverse", "")
    }

    //% block="turn %id %degr to the %turn"
    //% block.loc.nl="draai %id %degr graden naar %turn"
    //% id.defl="EtBuggy"
    export function setTurning(id: string, degr: number, turn: Turning) {
        if (turn == Turning.Left)
            EtCommon.setValue(id, "left", degr.toString())
        else
            EtCommon.setValue(id, "right", degr.toString())
    }

    //% block="move %id straight"
    //% block.loc.nl="rijd %id rechtdoor"
    //% id.defl="EtBuggy"
    export function setStraight(id: string) {
        EtCommon.setValue(id, "straight", "")
    }

    //% block="stop %id"
    //% block.loc.nl="stop %id"
    //% id.defl="EtBuggy"
    export function stop(id: string) {
        EtCommon.setValue(id, "stop", "")
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

    //% block="move %id at %speed m/s"
    //% block.loc.nl="rijd %id met snelheid %speed m/s"
    //% id.defl="EtBuggy"
    //% speed.min=0 speed.max=2 speed.defl=1
    export function setSpeedMps(id: string, speed: number) {
        EtCommon.setValue(id, "mps", speed.toString())
    }

    //% block="move %id at %speed km/hr"
    //% block.loc.nl="rijd %id met snelheid %speed km/uur"
    //% id.defl="EtBuggy"
    //% speed.min=0 speed.max=7 speed.defl=4
    export function setSpeedKph(id: string, speed: number) {
        EtCommon.setValue(id, "kph", speed.toString())
    }

    //% block="move %id at %speed \\%"
    //% block.loc.nl="rijd %id met snelheid %speed \\%"
    //% id.defl="EtBuggy"
    //% speed.min=0 speed.max=100 speed.defl=50
    export function setSpeedPerc(id: string, speed: number) {
        EtCommon.setValue(id, "perc", speed.toString())
    }
}
