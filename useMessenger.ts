export const useMessenger = () => {
    const debug = useDebug(`useMessenger`)
    const widget = useState<string>('widget')
    const tenant = useState<string>('tenant')
    return {
        send: (event: string, message?: string) => {
            if (!window.top) { debug.warn('Not iframe context, aborting...'); return }
            const body = { tenant: tenant.value, widget: widget.value, event, message }
            window.top?.postMessage(body, '*')
            debug.ok('Message sent:', body)
        }
    }
}