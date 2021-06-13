import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useRouter } from 'next/router';
import cookieCutter from 'cookie-cutter';

export default function Header({search}){
    const router = useRouter();

    return <header>
                <div className="header">
                        <div style={{margin : 10}}>
                            <img src="logo-coco-bambu-mini.png" alt="logo-coco-bambu-mini" style={{marginRight : 10}}/>
                            <FilledInput startAdornment={
                                                    <InputAdornment position="end">
                                                        <img src="/icon-busca.png" alt="icon-busca.png"/>
                                                    </InputAdornment>
                                                }
                                        placeholder="Buscar receita..."
                                        style={{backgroundColor : "white"}}
                                        onChange={e => search(e.target.value)}/>
                        </div>
                        <div className="col"
                             onClick={_ => {
                                cookieCutter.set("authenticated", false);
                                router.push("/login");
                             }}
                             style={{color : "white",
                                     margin : 10,
                                     alignItems : "center",
                                     justifyContent : "center",
                                     cursor : "pointer"}}>
                            <div style={{borderRadius : 50, border : "0.1px solid white"}}>
                                <img src="/icon-login.png" alt="icon-login"/>
                            </div>
                            Sair
                        </div>
                    </div>
            </header>
}