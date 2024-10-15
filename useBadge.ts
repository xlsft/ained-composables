import { useColor } from "./useColor"

/**
 * ## useBadge
 * @param {string} color The hex color string to convert (default is black).
 * 
 * This function is intended to provide color manipulation and conversion methods, returning the 
 * computed foreground color, background color, and border color based on the provided hex value.
 *
 * ```ts
 * const style = useBadge('ff5733'); // Returns color, background, and borderColor based on the input.
 * ```
 * 
 * @return {{ color: string, background: string, borderColor: string }} An object containing the computed colors.
 */
export const useBadge = (hex: string, constants: { white?: string, black?: string } = { white: '#ffffff', black: '#1f2937' }): {
    color: string,
    background: string,
    borderColor: string,
    stroke: string,
} => {
    const color = useColor()
    const { l } = color.convert.hex.hsl(hex)
    const calc = {
        background: (): string => l > 99 ? constants.white || '#ffffff' : `#${hex.replace('#', '')}`,
        foreground: (): string => (l > 75 || color.param.contrast(constants.white || '#ffffff', calc.background()) < 1.5) ? constants.black || '#1f2937' : constants.white || '#ffffff',
        border: (): string => {
            const background = calc.background()
            if (calc.foreground() !== constants.black || '#1f2937') return background
            let { h, s, l } = color.convert.hex.hsl(background)
            l = l - 10; l = l < 0 ? 0 : l
            return color.convert.hsl.hex({ h, s, l })
        }
    }

    return {
        color: calc.foreground(),
        background:  calc.background(),
        borderColor: calc.border(),
        stroke: calc.foreground(),
    }
}
