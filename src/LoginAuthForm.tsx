import { useState } from "preact/hooks"
import "./LoginAuthForm.less"
import { TextInput } from "./TextInput"
import { IconButton } from "./IconButton"

export function LoginAuthForm() {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [username, setUsername] = useState("")
    let [register, setRegister] = useState(false)

    function registerAccount() {
        // if (register)

        // else

    }

    return <div class="LoginAuthForm">
        <span class="logoText">Travel Journal</span>
        {register && <TextInput type="text" placeholder="Username" value={username} onChange={setUsername} />}
        <TextInput type="email" placeholder="Email" value={email} onChange={setEmail} />
        <TextInput type="password" placeholder="Password" value={password} onChange={setPassword} />
        <IconButton name={register ? "person_add" : "login"} text={register ? "Register" : "Login"} onClick={registerAccount} />
        <p class="link"> {register ? "Already have an account? " : "Don't have an account? "}
            <a href="" onClick={e => {
                e.preventDefault();
                setRegister(!register)
            }}>
                {register ? "Login" : "Register"}
            </a>
        </p>
    </div>
}