import { useEffect, useRef, useState } from "preact/hooks"
import "./LoginAuthForm.less"
import { TextInput } from "./TextInput"
import { IconButton } from "./IconButton"

/**
 * The LoginAuthform returns a login authentication form where the user can login/register
 * It handles cases such as an already existing user, or leaving out required fields
 * The login works by entering a username and password
 * While registering, the user must also add their email address
 *
 * @export
 * @param {{ logInCheck: (b: boolean) => void }} { logInCheck }
 * @return {*}
 */
export function LoginAuthForm({ logInCheck }: { logInCheck: (b: boolean) => void }) {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [username, setUsername] = useState("")
    let [register, setRegister] = useState(false)

    let usernameRef = useRef<HTMLInputElement>(null);

    useEffect(() => { //when switching to registering the focus is placed on the username input
        if (usernameRef.current) {
            usernameRef.current.focus();
        }
    }, [register]);

    function registerAccount() {
        let users: { [username: string]: { email: string; password: string } } = JSON.parse(localStorage.getItem('users') || '{}');

        if (register) { //if registering
            if (username && email && password) {
                let emailExists = Object.values(users).some(u => u.email === email);
                if (users[username]) { //username taken
                    alert("Username already exists!");
                }
                else if (emailExists) { //email taken
                    alert("Email already exists!");
                }
                else { //successful registration
                    users[username] = { email, password };
                    localStorage.setItem('users', JSON.stringify(users));
                    alert("Successful registration!");
                    setRegister(false);
                }
            }
            else { //field(s) left empty
                alert("Please fill in all the fields!");
            }
        }
        else { //if logging in
            if (username && password) {
                if (users[username] && users[username].password == password) {
                    sessionStorage.setItem('loggedInUser', username);
                    alert("Successful log in!");
                    logInCheck(true);
                }
                else { //incorrect inputs
                    alert("Incorrect username or password");
                }
            }
            else { //field(s) left empty
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