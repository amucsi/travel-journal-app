import "./Main.less"

export function Main() {
    function logout() {
        sessionStorage.removeItem('loggedInUser');
        window.location.reload();
    }
    return <div class="Main">
        <button onClick={logout}>Logout</button>
    </div>
}