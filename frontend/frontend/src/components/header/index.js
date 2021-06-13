import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function Header({search}){
    return <header>
                <div className="header">
                        <img src="logo-coco-bambu-mini.png" alt="logo-coco-bambu-mini"/>
                        <FilledInput startAdornment={
                                                <InputAdornment position="end">
                                                    <img src="/icon-busca.png" alt="icon-busca.png"/>
                                                </InputAdornment>
                                            }
                                    placeholder="Buscar receita..."
                                    style={{backgroundColor : "white"}}
                                    onChange={e => search(e.target.value)}/>
                    </div>
            </header>
}