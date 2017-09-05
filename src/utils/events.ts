class EventsUtils {
    /**
     * Cross Browser helper to addEventListener.
     *
     * @param {HTMLElement} obj The Element to attach event to.
     * @param {string} evt The event that will trigger the binded function.
     * @param {function(event)} fnc The function to bind to the element. 
     * @return {boolean} true if it was successfuly binded.
     */
    bind(obj: HTMLElement, evt: string, fnc: EventListenerOrEventListenerObject): boolean {
        obj.addEventListener(evt, fnc, false);
        return true;
    };

};

const Events = new EventsUtils();
export { Events };
