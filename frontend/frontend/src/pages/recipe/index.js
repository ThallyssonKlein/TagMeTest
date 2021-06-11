import { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../../context/ApplicationContext';
import CheckBoxContainer from '../../components/checkboxContainer';
import { findOne } from '../../backend/recipe';

export default function Recipe(){
    const { selectedOrder } = useContext(ApplicationContext);
    const [lists, setLists] = useState(<div/>);

    useEffect(_ => {
        (async _ => {
            const findOneResponse = await findOne(selectedOrder.recipeId);

            setLists(
                <div>
                    <CheckBoxContainer listName="ingredients" list={findOneResponse.ingredients} recipeId={selectedOrder.recipeId}/>
                    <hr/>
                    <CheckBoxContainer listName="steps" list={findOneResponse.steps} recipeId={selectedOrder.recipeId}/>
                </div>
            );
        })();
    }, []);

    return <div>
                <h1>{selectedOrder.name}</h1>
                <p>{selectedOrder.description}</p>
                {lists}            
            </div>;
}