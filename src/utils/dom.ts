/**
* DOM Traversal (Sizzle)
*
* @param {string} selector Selector to find 
* @return {HTMLElement} return the finded DOM element
*/
export default function findBySelector(selector) {
    return document.querySelector(selector);
};

/**
 * DOM Traversal (Sizzle)
 *
 * @param {string} selector Selector to find 
 * @return {HTMLElement} return the collection of DOM elements
 */
export function findAllBySelector(selector) {
    return document.querySelectorAll(selector);
};

/**
 * DOM Traversal (Sizzle)
 *
 * @param {HTMLElement} elm Element to search in his parent's
 * @param {string} selector Selector to find 
 * @return {HTMLElement} return the finded DOM element
 */
export function findParent(elm, selector) {
    return elm.closest(selector);
};

/**
 * DOM Traversal (Sizzle)
 *
 * @param {string} id id element to find 
 * @return {HTMLElement} return the finded DOM element
 */
export function findById(id) {
    return document.getElementById(id);
};

/**
 * Add class to an element
 *
 * @param {HTMLElement} elm Element to add the classname
 * @param {string} classNameToAdd Class Name to Add
 */
export function addClass(elm, classNameToAdd) {
    elm.className += ' ' + classNameToAdd;
}

/**
 * Remove class to an element
 *
 * @param {HTMLElement} elm Element to remove the classname
 * @param {string} classNameToAdd Class Name to Remove
 */
export function removeClass(elm, classNameToRemove) {
    var elClass = ' ' + elm.className + ' ';
    while (elClass.indexOf(' ' + classNameToRemove + ' ') !== -1) {
        elClass = elClass.replace(' ' + classNameToRemove + ' ', '');
    }
    elm.className = elClass;
}

