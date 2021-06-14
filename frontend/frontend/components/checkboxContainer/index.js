import { useContext, useEffect } from 'react'; 
import { updateOne } from '../../backend/recipe';
import CheckBox from '../checkbox';
import classNames from 'classnames';
import { ChecksContext } from '../../context/ChecksContext';

export default function CheckBoxContainer({listName, list, recipeId}){
    const { checkedIngredients, setCheckedIngredients, checkedSteps, setCheckedSteps } = useContext(ChecksContext);

    function onChange(change, item){
        let body = {}
        body[listName] = [
            {
                name : item.name,
                checked : change
            }
        ]
        updateOne(recipeId, body);
        if(listName === "ingredients"){
            let tmpCheckedIngredients = checkedIngredients;
            tmpCheckedIngredients[item.name] = change;
            console.log(tmpCheckedIngredients);
            setCheckedIngredients(tmpCheckedIngredients);
        }else{
            let tmpCheckedSteps = checkedSteps;
            tmpCheckedSteps[item.name] = change;
            setCheckedSteps(tmpCheckedSteps);
        }
    }

    let liClasses = classNames({
        'col': true,
        'gray-background': listName === "ingredients"
    });

    useEffect(_ => {
        if(listName === "ingredients"){
            let tmpCheckedIngredients = {};
            list.forEach(item => {
                tmpCheckedIngredients[item.name] = item.checked;
            });
            setCheckedIngredients(tmpCheckedIngredients);
        }else{
            let tmpCheckedSteps = {};
            list.forEach(item => {
                tmpCheckedSteps[item.name] = item.checked;
            });
            setCheckedSteps(tmpCheckedSteps);
        }
    }, []);

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