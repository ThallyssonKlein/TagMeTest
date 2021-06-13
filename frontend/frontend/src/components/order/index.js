import "./index.module.css";
import { useRouter } from "next/router";
import { useContext } from 'react';
import { ApplicationContext } from "../../context/ApplicationContext";

export default function Order({recipeId, name, photo, description, _id}){
    const router = useRouter();
    const { setSelectedOrder } = useContext(ApplicationContext);

    function seeRecipe(){
        setSelectedOrder({
            name,
            description,
            recipeId,
            photo
        });
        router.push("/recipe/" + _id);
    }

    return <div className="row" style={{justifyContent : "space-between", borderBottom : "0.1px solid gray", borderTop : "0.1px solid gray"}}>
                <div className="row">
                    <div className="col" style={{marginRight : 10}}>
                        <img src={"/" + photo + "-peq.jpg"} alt={photo} width="135px" height="135px"/>
                    </div>
                    <div className="col">
                        <h2>{name}</h2>
                        <p>{description}</p>
                    </div>
                </div>
                <div className="col" style={{marginLeft : 10}}>
                    <div className="seeRecipeButton"
                         onClick={seeRecipe}>
                                <b>Ver receita</b>
                    </div>
                </div>
                <style jsx>
                    {`
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
}