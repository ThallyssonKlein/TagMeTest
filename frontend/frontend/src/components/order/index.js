import "./index.module.css";
import { useRouter } from "next/router";
import { useContext } from 'react';
import { ApplicationContext } from "../../context/ApplicationContext";

export default function Order({recipeId, name, photo, description}){
    const router = useRouter();
    const { setSelectedOrder } = useContext(ApplicationContext);

    function seeRecipe(){
        setSelectedOrder({
            name,
            description,
            recipeId
        });
        router.push("/recipe/");
    }

    return <div className="row">
                <div className="col">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
                <div className="col">
                    <button onClick={seeRecipe}>Ver receita</button>
                </div>
           </div>
}