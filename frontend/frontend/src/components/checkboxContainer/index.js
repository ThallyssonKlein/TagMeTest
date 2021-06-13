import { updateOne } from '../../backend/recipe';
import CheckBox from '../checkbox';
import classNames from 'classnames';

export default function CheckBoxContainer({listName, list, recipeId}){
    
    function onChange(change, item){
        console.log(change);
        let body = {}
        body[listName] = [
            {
                name : item.name,
                checked : change
            }
        ]
        updateOne(recipeId, body);
    }

    let liClasses = classNames({
        'col': true,
        'gray-background': listName === "ingredients"
    });

    return <div className={liClasses} style={{padding : 20, alignItems : "flex-start"}}>
                <h2 style={{marginBottom : 10}}>{listName === "ingredients" ? "Ingredientes" : "Modo de preparo"}</h2>
                {
                    list.map(item => {
                        return <CheckBox checked={item.checked}
                                        item={item}
                                        onChange={onChange}/>
                    })
                }
                <style jsx>
                    {`
                        .gray-background {
                            background-color : rgba(0,0,0,0.5);
                        }
                    `}
                </style>     
           </div>
}