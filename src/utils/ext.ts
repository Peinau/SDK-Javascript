class ExtUtils {
    /**
     * @param {string}  text - Text to trim
     * @return {string} trimmed text
     */
    trim(text: String): string {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        return text.toString().replace(rtrim, '');
    }
}
const Ext = new ExtUtils();
export { Ext };