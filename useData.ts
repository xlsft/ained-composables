import ky, { HTTPError, type Options } from "ky"

/**
 * ## useData
 * @param {string} endpoint The API endpoint to fetch data from.
 * @param {Options} [options] Optional configuration options for the request.
 * 
 * This function is intended to make an HTTP request to the specified endpoint using the 
 * `ky` library, returning the fetched data along with any errors encountered during the process. 
 * Useful for handling data fetching in a structured way within web applications.
 *
 * ```ts
 * const result = await useData<ResponseType, ErrorType>('data'); // Fetches data from the specified endpoint.
 * ```
 * 
 * @return {{ data: ResultSuccess['data'], errors: ResultError | undefined }} An object containing the fetched data and any errors.
 */
export const useData = async <ResultSuccess extends { data: unknown } = { data: unknown }, ResultError = unknown>(
    endpoint: string,
    options?: Options
): Promise<{ data: ResultSuccess["data"]; errors: ResultError | undefined }> => {
    const debug = useDebug(`useData (${endpoint})`)
    const base = useRuntimeConfig().public.api
    const widget = useState<string>('widget')
    const tenant = useState<string>('tenant')
    let e: ResultError | undefined = undefined
    try {
        const response = await ky(endpoint, {
            ...options,
            prefixUrl: base,
            headers: {
                'Accept': 'application/json',
                'Widget-ID': widget.value || '-1',
                'X-Tenant': tenant.value || '-1',
                'Origin': useRequestURL().origin
            },
            hooks: {
                beforeError: [async (error: HTTPError<any>) => {
                    e = await error.response.json()
                    debug.error(e)
                    return error
                }]
            }
        }).json<ResultSuccess>()
        if ('data' in response)  return { ...response, errors: undefined }
        return { data: response as unknown as ResultSuccess["data"], errors: undefined }
    } catch (error) {
        return { data: null as unknown as ResultSuccess["data"], errors: e }
    }
}
