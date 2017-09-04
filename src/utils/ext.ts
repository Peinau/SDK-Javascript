/**
 * @param {string}  text - Text to trim
 * @return {string} trimmed text
 */
export function trim(text: String) {
    // Make sure we trim BOM and NBSP
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    return text.toString().replace(rtrim, '');
}

export default {}