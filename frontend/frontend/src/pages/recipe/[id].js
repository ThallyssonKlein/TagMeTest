import { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../../context/ApplicationContext';
import CheckBoxContainer from '../../components/checkboxContainer';
import { findOne } from '../../backend/recipe';
import { useRouter } from 'next/router';

export default function Recipe(){
    const { selectedOrder } = useContext(ApplicationContext);
    const [lists, setLists] = useState(<div/>);
    const router = useRouter();

    useEffect(_ => {
        (async _ => {
            const findOneResponse = await findOne((selectedOrder) ? selectedOrder.recipeId : router.query.id);

            setLists(
                <div>
                    <div className="row" style={{flex : 1}}>
                        <CheckBoxContainer listName="ingredients" list={findOneResponse.ingredients} recipeId={selectedOrder.recipeId}/>
                    </div>
                    <hr/>
                    <div className="row" style={{flex : 1}}>
                        <CheckBoxContainer listName="steps" list={findOneResponse.steps} recipeId={selectedOrder.recipeId}/>
                    </div>
                </div>
            );
        })();
    }, []);

    function back(){
        router.push("/listOrders");
    }

    return <div className="viewport">
               <div className="col" style={{flex : 1}}>
                    <div className="col" style={{flex : 1, padding : 10, justifyContent : "space-between", color : "white", backgroundImage : "url(" + "/" + selectedOrder.photo + "-grande.jpg)"}}>
                        <div className="row" onClick={back} style={{cursor : "pointer"}}>
                            <img src="/icon-back.png" alt="icon-back" style={{marginRight : 5}}/> Voltar
                        </div>
                        <div>
                            <h1 style={{marginBotton : 5}}>{selectedOrder.name}</h1>
                            <p>{selectedOrder.description}</p>
                        </div>
                    </div>
                    {lists}            
                </div>;
            </div>
}