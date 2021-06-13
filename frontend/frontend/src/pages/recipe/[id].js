import { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../../context/ApplicationContext';
import CheckBoxContainer from '../../components/checkboxContainer';
import { findOne as findOneRecipe } from '../../backend/recipe';
import { findOne as findOneOrder } from '../../backend/order';

import { useRouter } from 'next/router';

import Button from '@material-ui/core/Button';

import { ChecksContext } from '../../context/ChecksContext';

import Cookies from 'cookies';

function Recipe({id}){
    const { selectedOrder } = useContext(ApplicationContext);
    const [internalSelectedOrder, setInternalSelectedOrder] = useState(selectedOrder);
    const [lists, setLists] = useState();
    const router = useRouter();
    const { checkedIngredients, checkedSteps } = useContext(ChecksContext);
    const [allChecked, setAllChecked] = useState(true);

    useEffect(_ => {
        Object.entries(checkedIngredients).forEach(ingredient => {
            if(!ingredient[1]){
                setAllChecked(false);
            }
        });
        Object.entries(checkedSteps).forEach(step => {
            if(!step[1]){
                setAllChecked(false);
            }
        });
    }, [checkedIngredients, checkedSteps]);

    useEffect(_ => {
        (async _ => {
            let findOneResponse;
            let findOneOrderResponse;
            let orderId = id;
            if(!selectedOrder){
                findOneOrderResponse = await findOneOrder(orderId);
                findOneOrderResponse = findOneOrderResponse.data;
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
                        {allChecked &&
                            <Button variant="contained"
                                    style={{color : "white"}}
                                    color="primary">
                                    <b>Acessar</b>
                            </Button> }          
                    </div> : 
                    <div>Carregando a receita...</div>
               }
            </div>
}

export const getServerSideProps = async ctx => {
    const { params } = ctx;
    const id = params.id;
    const { req, res } = ctx;
	const cookies = new Cookies(req, res);
    const findOneOrderResponse = await findOneOrder(id);
    if(!findOneOrderResponse.ok){
        return {
			redirect: { destination: '/listOrders', permanent: true },
		};
    }
    if (!cookies.get("authenticated") || cookies.get("authenticated") === "false") {
		return {
			redirect: { destination: '/login', permanent: true },
		};
	}
    return {
       props: { id }
    }
}

export default Recipe;