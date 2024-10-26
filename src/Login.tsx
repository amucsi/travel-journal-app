import "./Login.less"
import { LoginAuthForm } from "./LoginAuthForm"
import { LoginImageGrid } from "./LoginImageGrid"

export function Login({logInCheck} : {logInCheck : (b:boolean)=>void}) {
    return <div class="Login">
        <LoginAuthForm logInCheck={logInCheck}/>
        <LoginImageGrid />
    </div>
}