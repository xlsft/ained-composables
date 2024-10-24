import { onMounted, onUnmounted, ref } from "vue";
/**
 * ## usePureClick
 * Handles mouse events to ensure a "pure" click without drag movement, triggering the provided click handler only when there is minimal movement between `mousedown` and `mouseup`.
 *
 * This utility is useful for distinguishing between clicks and drag actions, where a slight movement is ignored to ensure it's a true click.
 *
 * ```ts
 * usePureClick(container, (event) => {
 *     console.log('Pure click detected');
 * });
 * ```
 *
 * @param container The HTML element that will listen for the `mousedown`, `mouseup`, and `click` events.
 * @param click The callback function that is triggered on a pure click (minimal movement between `mousedown` and `mouseup`).
 *
 * @return void
 */
export const usePureClick = (container: HTMLElement, click: (event: MouseEvent) => void): void => {
    const dragging = ref(false);
    let x = 0;
    let y = 0;
    let timer: ReturnType<typeof setTimeout> | null = null
    const controller = new AbortController()

    const mouse = {
        down: (event: MouseEvent) => {
            dragging.value = false
            x = event.clientX
            y = event.clientY
            timer = setTimeout(() => dragging.value = true, 200)
        },
        up: (event: MouseEvent) => {
            if (timer) clearTimeout(timer)
            const delta_x = Math.abs(event.clientX - x)
            const delta_y = Math.abs(event.clientY - y)
            dragging.value = delta_x > 10 || delta_y > 10
        },
        click: (event: MouseEvent) => { 
            if (dragging.value) return
            click(event) 
        }
    };

    onMounted(() => {
        container.addEventListener('mousedown', mouse.down, { signal: controller.signal})
        container.addEventListener('mouseup', mouse.up, { signal: controller.signal})
        container.addEventListener('click', mouse.click, { signal: controller.signal})
    })
    onUnmounted(controller.abort)
}