class DOMUtils {

    /**
    * DOM Traversal (Sizzle)
    *
    * @param {string} selector Selector to find 
    * @return {HTMLElement} return the finded DOM element
    */
    findBySelector(selector: string): any {
        return document.querySelector(selector);
    };

    /**
     * DOM Traversal (Sizzle)
     *
     * @param {string} selector Selector to find 
     * @return {HTMLElement} return the collection of DOM elements
     */
    findAllBySelector(selector: string) {
        return document.querySelectorAll(selector);
    };

    /**
     * DOM Traversal (Sizzle)
     *
     * @param {HTMLElement} elm Element to search in his parent's
     * @param {string} selector Selector to find 
     * @return {HTMLElement} return the finded DOM element
     */
    findParent(elm: HTMLElement, selector: string) {
        return elm.closest(selector);
    };

    /**
     * DOM Traversal (Sizzle)
         *
     * @param {string} id id element to find 
     * @return {HTMLElement} return the finded DOM element
     */
    findById(id: string) {
        return document.getElementById(id);
    };

    /**
     * Add class to an element
     *   
     * @param {HTMLElement} elm Element to add the classname
     * @param {string} classNameToAdd Class Name to Add
     */
    addClass(elm: HTMLElement, classNameToAdd: string) {
        elm.className += ' ' + classNameToAdd;
    }

    /**
     * Remove class to an element
     *
     * @param {HTMLElement} elm Element to remove the classname
     * @param {string} classNameToAdd Class Name to Remove
     */
    removeClass(elm: HTMLElement, classNameToRemove: string) {
        var elClass = ' ' + elm.className + ' ';
        while (elClass.indexOf(' ' + classNameToRemove + ' ') !== -1) {
            elClass = elClass.replace(' ' + classNameToRemove + ' ', '');
        }
        elm.className = elClass;
    }

};

const DOM = new DOMUtils();
export { DOM };