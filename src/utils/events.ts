class EventsUtils {
    /**
     * Cross Browser helper to addEventListener.
     *
     * @param {Element|Window} obj The Element to attach event to.
     * @param {string} evt The event that will trigger the binded function.
     * @param {function(event)} fnc The function to bind to the element.
     * @return {Function} dettach event listener
     */
    public bind(obj: Element | Window, evt: string, fnc: EventListenerOrEventListenerObject): Function {
        obj.addEventListener(evt, fnc, false);

        //Return a detach event function :P
        return () => {
            this.unbind(obj, evt, fnc);
        };
    }

    /**
     * Cross Browser helper to removeEventListener.
     *
     * @param {Element|Window} obj The Element to attach event to.
     * @param {string} evt The event that will trigger the binded function.
     * @param {function(event)} fnc The function to bind to the element.
     * @return {boolean} true if it was successfuly binded.
     */
    public unbind(obj: Element | Window, evt: string, fnc: EventListenerOrEventListenerObject): boolean {
        obj.removeEventListener(evt, fnc, false);
        return true;
    }

}

const events = new EventsUtils();
export { events };
