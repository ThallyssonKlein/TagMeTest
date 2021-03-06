import { useState } from 'react';
import cookieCutter from 'cookie-cutter';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Logo from '../../components/logo';
import Head from 'next/head';
import Cookies from 'cookies';

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function doLogin(username, password){    
        if(username === "test" && password === "test"){
            cookieCutter.set("authenticated", true);
            router.push("/listOrders");
        }
    }

    return <div>
                <Head>
                    <title>Login</title>
                </Head>
                <div className="viewport bg-login" style={{backgroundImage : 'url(/img-bg-login.jpg)'}}>
                    <div className="col">
                        <Logo/>
                        <FilledInput startAdornment={
                                        <InputAdornment position="start">
                                            <img src="/icon-login.png" alt="icon-login.png"/>
                                        </InputAdornment>
                                     }
                                     placeholder="Nome do usuário"
                                     style={{backgroundColor : "white"}}
                                     onChange={e => setUsername(e.target.value)}/>
                        <div style={{marginTop : 10}}>
                            <FilledInput startAdornment={
                                            <InputAdornment position="start">
                                                <img src="/icon-key.png" alt="icon-key.png"/>
                                            </InputAdornment>
                                         }
                                         placeholder="Senha"
                                         style={{backgroundColor : "white"}}
                                         onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <div className="row" style={{marginTop : 10, marginBottom : 30}}>
                            <Button variant="contained"
                                    onClick={_ => doLogin(username, password)}
                                    style={{color : "white", flex : 1}}
                                    color="primary">
                                <b>Acessar</b>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
}

export const getServerSideProps = async ctx => {
    const { req, res } = ctx;
	const cookies = new Cookies(req, res);

    if (cookies.get("authenticated") || cookies.get("authenticated") === "true") {
		return {
			redirect: { destination: '/listOrders', permanent: true },
		};
	}
    return {
       props: {}
    }
}