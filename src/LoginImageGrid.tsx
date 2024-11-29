import "./LoginImageGrid.less"

/**
 * THe LoginImageGrid element display the app's features in a grid
 *
 * @export
 * @return TSX grid element with media
 */
export function LoginImageGrid() {
    return <div class="LoginImageGrid">
        <div class="image-item">
            <img src="https://via.placeholder.com/150" alt="Image 4" />
            <label>Create your account!</label>
        </div>
        <div class="image-item">
            <img src="https://via.placeholder.com/150" alt="Image 1" />
            <label>Write journal entries!</label>
        </div>
        <div class="image-item">
            <img src="src/assets/waterfall_gif.gif" alt="Waterfall" />
            <label>Attach your videos!</label>
        </div>
        <div class="image-item">
            <img src="https://via.placeholder.com/150" alt="Image 3" />
            <label>Attach locations!</label>
        </div>
    </div>
}