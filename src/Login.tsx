import "./Login.less"
import { LoginAuthForm } from "./LoginAuthForm"
import { LoginImageGrid } from "./LoginImageGrid"

/**
 * The Login screen contains the login authentication form and the image grid
 *
 * @export
 * @param {{logInCheck : (b: boolean) => void}} {logInCheck}
 * @return TSX element with login form and images
 */
export function Login({logInCheck}: {logInCheck: (b: boolean) => void}) {
    return <div class="Login">
        <LoginAuthForm logInCheck={logInCheck}/>
        <LoginImageGrid />
    </div>
}