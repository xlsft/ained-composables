/**
 * ## useClipboard
 * @param {string} data The text data to be copied to the clipboard.
 * 
 * This function is intended to copy the provided text data to the clipboard, using the modern 
 * `navigator.clipboard` API if available, or falling back to a deprecated method if not. 
 * Useful for implementing clipboard functionality in web applications.
 *
 * ```ts
 * useClipboard('Hello, world!'); // Copies "Hello, world!" to clipboard.
 * ```
 * 
 * @return {void} This function does not return a value.
 */
export const useClipboard = (data: string) => {
    const debug = useDebug('useClipboard')
    debug.init('Clipboard action initialized')
    if (navigator.clipboard) navigator.clipboard.writeText(data).then(() => debug.ok('Successfully copied text:', data)).catch((e) => debug.error('Failed to copy text:', data, e));
    else {
        debug.info('Can`t use navigator, using deprecated fallback')
        const temp = document.createElement('input')
        temp.value = data
        document.body.appendChild(temp)
        temp.select()
        try { document.execCommand('copy'); debug.ok('Successfully copied text:', data) } catch (e) { debug.error('Failed to copy text:', data, e) }
        document.body.removeChild(temp)
    }
}