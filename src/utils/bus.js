class Bus {
    constructor () {
        this.events = {}
    }
    $emit (eventType, arg) {
        this.events[eventType].forEach(val => {
            val(arg)
        })
    }
    $on (eventType, cbk) {
        if (!this.events[eventType]) {
            this.events[eventType] = [cbk]
        } else {
            this.events[eventType].push(cbk)
        }
    }
}
export default Bus;
