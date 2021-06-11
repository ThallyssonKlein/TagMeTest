import { updateOne } from '../../backend/recipe';
import CheckBox from '../checkbox';

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

    return <div>
                {
                    list.map(item => {
                        return <CheckBox checked={item.checked}
                                         item={item}
                                         onChange={onChange}/>
                    })
                }     
           </div>
}