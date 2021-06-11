import "./index.module.css";
import { useRouter } from "next/router";

export default function Order({recipeId, name, photo, description}){
    const router = useRouter();

    function seeRecipe(){
        router.push("/recipe/" + recipeId);
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