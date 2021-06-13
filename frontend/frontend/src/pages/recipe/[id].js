import { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../../context/ApplicationContext';
import CheckBoxContainer from '../../components/checkboxContainer';
import { findOne as findOneRecipe } from '../../backend/recipe';
import { findOne as findOneOrder } from '../../backend/order';

import { useRouter } from 'next/router';

function Recipe({id}){
    const { selectedOrder } = useContext(ApplicationContext);
    const [internalSelectedOrder, setInternalSelectedOrder] = useState(selectedOrder);
    const [lists, setLists] = useState();
    const router = useRouter();

    useEffect(_ => {
        (async _ => {
            let findOneResponse;
            let findOneOrderResponse;
            let orderId = id;
            if(!selectedOrder){
                findOneOrderResponse = await findOneOrder(orderId);
                findOneResponse = await findOneRecipe(findOneOrderResponse.recipeId);
                setInternalSelectedOrder(findOneOrderResponse);
            }else{
                findOneResponse = await findOneRecipe(selectedOrder.recipeId);
            }

            setLists(
                <>
                    <CheckBoxContainer listName="ingredients"
                                       list={findOneResponse.ingredients}
                                       recipeId={(internalSelectedOrder) ? internalSelectedOrder.recipeId : findOneOrderResponse.recipeId}/>
                    <CheckBoxContainer listName="steps"
                                       list={findOneResponse.steps}
                                       recipeId={(internalSelectedOrder) ? internalSelectedOrder.recipeId : findOneOrderResponse.recipeId}/>
                </>
            );
        })();
    }, []);

    function back(){
        router.push("/listOrders");
    }

    return <div className="viewport">
               {
                   (lists) ? 
                    <div className="col" style={{flex : 1}}>
                        <div className="col" style={{height : 800, padding : 10, justifyContent : "space-between", color : "white", backgroundImage : "url(" + "/" + internalSelectedOrder.photo + "-grande.jpg)"}}>
                            <div className="row" onClick={back} style={{cursor : "pointer", marginTop : 20, marginBottom : 30}}>
                                <img src="/icon-back.png" alt="icon-back" style={{marginRight : 5}}/> Voltar
                            </div>
                            <div>
                                <h1 style={{marginBotton : 5}}>{internalSelectedOrder.name}</h1>
                                <p>{internalSelectedOrder.description}</p>
                            </div>
                        </div>
                        {lists}            
                    </div> : 
                    <div>Carregando a receita...</div>
               }
            </div>
}

export const getServerSideProps = async ({params}) => {
    const id = params.id;
    return {
       props: { id }
    }
}

export default Recipe;