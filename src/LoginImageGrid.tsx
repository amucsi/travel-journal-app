import "./LoginImageGrid.less"

export function LoginImageGrid() {
    return <div class="LoginImageGrid">
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
        <div class="image-item">
            <img src="https://via.placeholder.com/150" alt="Image 4" />
            <label>Share your journeys!</label>
        </div>
    </div>
}