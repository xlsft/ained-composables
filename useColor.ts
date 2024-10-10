/**
 * ## useColor
 * @param {string} color The hex color string to convert (default is black).
 * 
 * This function is intended to provide color manipulation and conversion methods, returning the 
 * computed foreground color, background color, and border color based on the provided hex value.
 *
 * ```ts
 * const style = useColor('ff5733'); // Returns color, background, and borderColor based on the input.
 * ```
 * 
 * @return {{ color: string, background: string, borderColor: string }} An object containing the computed colors.
 */
export const useColor = (base: string): {
    color: string,
    background: string,
    borderColor: string,
} => {

    const constants = {
        black: '#1F2937',
        white: '#ffffff',
        hex: 'undefined', 
        rgb: { r: 0, g: 0, b: 0 },
        hsl: { h: 0, s: 0, l: 0 },
    }

    const hex = (h?: string): string => { 
        if (!h) h = base
        return `#${h.replace('#', '')}`
    }; constants.hex = hex()

    const rgb = (h?: string): { r: number, g: number, b: number } => {
        if (!h) h = constants.hex
        let r = 0, g = 0, b = 0
        if (h.length === 4) { // #RGB
            r = parseInt(h[1] + h[1], 16)
            g = parseInt(h[2] + h[2], 16)
            b = parseInt(h[3] + h[3], 16)
        } else if (h.length === 7) { // #RRGGBB
            r = parseInt(h.slice(1,3), 16)
            g = parseInt(h.slice(3,5), 16)
            b = parseInt(h.slice(5,7), 16)
        }
        r /= 255; g /= 255; b /= 255
        return { r, g, b }
    }; constants.rgb = rgb()

    const hsl = (color?: { r: number, g: number, b: number }): { h: number, s: number, l: number } => {
        if (!color) color = rgb()
        const { r, g, b } = color
        const min = Math.min(r, g, b)
        const max = Math.max(r, g, b)
        const delta = max - min
        let h = 0, s = 0, l = (max + min) / 2
        if (delta !== 0) {
            if (max === r) h = ((g - b) / delta) % 6
            else if (max === g) h = (b - r) / delta + 2
            else h = (r - g) / delta + 4
            h = Math.round(h * 60)
            if (h < 0) h += 360
            s = delta / (1 - Math.abs(2 * l - 1))
        }
        s = +(s * 100).toFixed(1)
        l = +(l * 100).toFixed(1)
        return { h, s, l }
    }; constants.hsl = hsl()

    const luminance = (color: string): number => {
        const { r, g, b } = rgb(hex(color))
        const calc = (value: number): number => value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)
        return 0.2126 * calc(r) + 0.7152 * calc(g) + 0.0722 * calc(b)
    }

    const contrast = (f: string, b: string): number => {
        const [ lf, lb ] = [luminance(f), luminance(b)]
        return (Math.max(lf, lb) - 0.2) / (Math.min(lf, lb) + 0.1)
    }

    const get = {
        background: (): string => constants.hsl.l > 95 ? constants.white : constants.hex,
        foreground: (): string => { 
            const bg = get.background()
            const { l } = hsl(rgb())
            return (l > 75 || contrast(constants.white, bg) < 1.5) ? constants.black : constants.white
        },
        border: (): string => {
            const bg = get.background()
            if (get.foreground() !== constants.black) return bg
            const current = hsl(rgb(bg))
            let l = current.l - 10; l = l < 0 ? 0 : l
            return `hsl(${current.h} ${current.s} ${l})`
        }
    }

    return {
        color: `${get.foreground()}`,
        background: `${get.background()}`,
        borderColor: `${get.border()}`,
    }

}
