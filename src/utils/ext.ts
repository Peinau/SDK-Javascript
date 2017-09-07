class ExtUtils {
    /**
     * @param {string}  text - Text to trim
     * @return {string} trimmed text
     */
    public trim(text: String): string {
        // Make sure we trim BOM and NBSP
        const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        return text.toString().replace(rtrim, '');
    }
}
const ext = new ExtUtils();
export { ext };