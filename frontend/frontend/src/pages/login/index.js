import { useState } from 'react';
import cookieCutter from 'cookie-cutter';
import { useRouter } from 'next/router';
import GlobalStyles from '../../components/globalStyles';

export default function Login(){
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function doLogin(username, password){    
        if(username === "test" && password === "test"){
            cookieCutter.set("authenticated", "true");
            router.push("/listOrders");
        }
    }

    return <GlobalStyles>
                <div className="viewport bg-login" style={{backgroundImage : 'url(/img-bg-login.jpg)'}}>
                    <input type="text" placeholder="Nome do usuário" onChange={e => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Senha" onChange={e => setPassword(e.target.value)}/>
                    <button onClick={_ => doLogin(username, password)}>Acessar</button>
                </div>
            </GlobalStyles>
}