import "./BottomBar.less"

/**
 * The bar at the bottom of the page which contains quick links
 *
 * @export
 * @return Footer element
 */
export function BottomBar() {
    return <footer class="BottomBar">
        <a href="#contact">Contact</a>
        <a href="#bug-report">Bug Report</a>
    </footer>
}