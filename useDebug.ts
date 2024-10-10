/**
 *  ## useDebug
 * @param {string} name The name of the debug context.
 * 
 * This function is intended to create a debugging utility that logs messages to the console 
 * based on the runtime configuration. It provides various log levels (info, warning, error, etc.) 
 * and supports grouping console output for better organization. Useful for debugging 
 * applications during development.
 *
 * ```ts
 *  const debug = useDebug('MyComponent');
 * 
 * debug.start(); // Starts a new debug group.
 * debug.log('This is a log message.'); // Logs a standard message.
 * debug.ok('Operation completed successfully.'); // Logs a success message.
 * debug.warn('This is a warning message.'); // Logs a warning message.
 * debug.error('An error occurred.'); // Logs an error message.
 * debug.critical('Critical failure!'); // Logs a critical error message.
 * debug.info('Informational message.'); // Logs an informational message.
 * debug.table([{ column1: 'value1', column2: 'value2' }]); // Logs a table.
 * debug.loading('Loading data...'); // Logs a loading message.
 * debug.init('Initialization complete.'); // Logs an initialization message.
 * debug.end(); // Ends the current debug group.
 * ```
 * 
 * @return {{ start: (collapsed?: boolean) => void, log: (...message: any[]) => void, ok: (...message: any[]) => void, warn: (...message: any[]) => void, error: (...message: any[]) => void, critical: (...message: any[]) => void, info: (...message: any[]) => void, table: (message: any) => void, loading: (...message: any[]) => void, init: (...message: any[]) => void, end: () => void }} An object containing various logging methods.
 */ 
export const useDebug = (name: string) => { 
    const debug = useRuntimeConfig().public.debugger
    const log = (message: (string | string[])[], color: string = '#7F8C8D', logger = console.log) => debug === 'true' ? logger(`%c ${message[0]} %c\n\n`, `background: ${color}; padding: 2px; border-radius: 4px;color: white; font-weight: bold;`, 'color: white; font-weight: normal;', ...message[1]) : undefined
    const template = (prefix: string, ...message: string[]) => [`${prefix}(${new Date().toLocaleTimeString()}) | [${name}]`, [...message]]

    return {
        start: (collapsed: boolean = false) => {
            console.groupEnd()
            debug === 'true' ? collapsed ? console.groupCollapsed : console.group(`%c 📝 GROUP | ${name}${collapsed ? ` (Expand for more debug info)` : ''} `, `background: #7F8C8D48; padding: 2px; border-radius: 4px;color: white; font-weight: bold;`) : undefined
        },
        log: (...message: any[]) => log(template('📜 ', ...message)),
        ok: (...message: any[]) => log(template('✅ OK | ', ...message), '#37C02B'),
        warn: (...message: any[]) => log(template('⚠️ WARN | ', ...message), '#C0762B', console.warn),
        error: (...message: any[]) => log(template('🚨 ERROR | ', ...message), '#C0392B', console.error),
        critical: (...message: any[]) => log(template('👿 CRITICAL | ', ...message), '#C02BA0', console.error),
        info: (...message: any[]) => log(template('ℹ️ INFO | ', ...message), '#5F7B93', console.info),
        table: (message: any) => debug === 'true' ? console.table(message) : undefined,
        loading: (...message: any[]) => log(template('⏳ LOADING | ', ...message), '#7F8C8D'),
        init: (...message: any[]) => log(template('📦 INIT | ', ...message), '#AB7558'),
        end: () => console.groupEnd()
    }
}