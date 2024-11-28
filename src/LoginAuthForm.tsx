import { useEffect, useRef, useState } from "preact/hooks"
import "./LoginAuthForm.less"
import { TextInput } from "./TextInput"
import { IconButton } from "./IconButton"

export function LoginAuthForm({ logInCheck }: { logInCheck: (b: boolean) => void }) {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [username, setUsername] = useState("")
    let [register, setRegister] = useState(false)

    let usernameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (usernameRef.current) {
            usernameRef.current.focus();
        }
    }, [register]);

    function registerAccount() {
        let users: { [username: string]: { email: string; password: string } } = JSON.parse(localStorage.getItem('users') || '{}');

        if (register) { //registering
            if (username && email && password) {
                let emailExists = Object.values(users).some(u => u.email === email);
                if (users[username]) {
                    alert("Username already exists!");
                }
                else if (emailExists) {
                    alert("Email already exists!");
                }
                else {
                    users[username] = { email, password };
                    localStorage.setItem('users', JSON.stringify(users));
                    alert("Successful registration!"); //TODO valami jobb kene
                    setRegister(false);
                }
            }
            else {
                alert("Fill in all the fields!"); //valami jobb?
            }
        }
        else { //logging in
            if (username && password) {
                if (users[username] && users[username].password == password) {
                    sessionStorage.setItem('loggedInUser', username);
                    alert("Successful log in!"); //valami jobbbbb
                    logInCheck(true);
                }
                else { //helytelen infok
                    alert("Incorrect username or password");
                }
            }
            else { //uresen hagyott mezo
                alert("Please fill in all the fields!");
            }
        }
    }

    return <div class="LoginAuthForm">
        <span class="logoText">Travel Journal</span>
        <TextInput type="text" placeholder="Username" value={username} onChange={setUsername} ref={usernameRef} />
        {register && <TextInput type="email" placeholder="Email" value={email} onChange={setEmail} />}
        <TextInput type="password" placeholder="Password" value={password} onChange={setPassword} onEnter={registerAccount} />
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