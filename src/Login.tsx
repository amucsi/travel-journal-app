import "./Login.less"
import { LoginAuthForm } from "./LoginAuthForm"
import { LoginImageGrid } from "./LoginImageGrid"

export function Login() {
    return <div class="Login">
        <LoginAuthForm />
        <LoginImageGrid />
    </div>
}