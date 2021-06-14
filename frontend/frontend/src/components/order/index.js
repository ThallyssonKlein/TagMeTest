import "./index.module.css";
import { useRouter } from "next/router";
import { useContext } from 'react';
import { ApplicationContext } from "../../context/ApplicationContext";
import { SearchContext } from '../../context/SearchContext';

export default function Order({recipeId, name, photo, description, _id, finalized, when}){
    const router = useRouter();
    const { setSelectedOrder } = useContext(ApplicationContext);
    const { searchQuery } = useContext(SearchContext);

    function seeRecipe(){
        setSelectedOrder({
            name,
            description,
            recipeId,
            photo
        });
        router.push("/recipe/" + _id);
    }

    if(searchQuery === "" || name.toLowerCase().includes(searchQuery.toLowerCase())){
        return <div className="row" style={{marginTop : 20, marginBottom : 30,justifyContent : "space-between", borderBottom : "0.1px solid gray", borderTop : "0.1px solid gray"}}>
                <div className="row" style={{marginTop : 20, marginBottom : 30}}>
                    <div className="col" style={{marginRight : 10}}>
                        <img src={"/" + photo + "-peq.jpg"} alt={photo} width="135px" height="135px"/>
                    </div>
                    <div className="col">
                        <h2>{name}</h2>
                        <p>{description}</p>
                    </div>
                </div>
                <div className="row" style={{marginLeft : 10}}>
                    {finalized && <span style={{color : "green"}}>Prato finalizado</span>}
                    <div className="when">
                        {when}
                    </div>
                    <div className="seeRecipeButton"
                         onClick={seeRecipe}>
                                <b>Ver receita</b>
                    </div>
                </div>
                <style jsx>
                    {`
                        .when {
                            border-radius : 50%;
                            background-color : gray;
                            width : 100px;
                            height : 100px;
                            display : flex;
                            flex-direction : row;
                            justify-content : center;
                            align-items : center;
                            color : white;
                            cursor : pointer;
                            margin-right : 10px;
                        }
                        .seeRecipeButton {
                            border-radius : 50%;
                            background-color : #ff9800;
                            width : 100px;
                            height : 100px;
                            display : flex;
                            flex-direction : row;
                            justify-content : center;
                            align-items : center;
                            color : white;
                            cursor : pointer;
                        }
                    `}
                </style>
           </div>
    }else{
        return <div/>
    }
}