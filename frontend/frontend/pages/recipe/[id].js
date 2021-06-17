import { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../../context/ApplicationContext';
import CheckBoxContainer from '../../components/checkboxContainer';
import { findOne as findOneRecipe } from '../../backend/recipe';
import { findOne as findOneOrder, updateOne as updateOneOrder, findOneServerSide } from '../../backend/order';

import { useRouter } from 'next/router';

import Button from '@material-ui/core/Button';

import { ChecksContext } from '../../context/ChecksContext';

import Cookies from 'cookies';

import Modal from '@material-ui/core/Modal';

import { useMediaQuery } from 'react-responsive';

import classNames from 'classnames';

function Recipe({id}){
    const [finalized, setFinalized] = useState(false);
    const { selectedOrder } = useContext(ApplicationContext);
    const [internalSelectedOrder, setInternalSelectedOrder] = useState(selectedOrder);
    const [lists, setLists] = useState();
    const router = useRouter();
    const { checkedIngredients, checkedSteps } = useContext(ChecksContext);
    const [allChecked, setAllChecked] = useState(true);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

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

    async function finalize(){
        setFinalized(false);
        back();
        updateOneOrder(id, {finalized: true});
    }

    let liClasses = classNames({
        'col': true,
        'topImg': isTabletOrMobile,
    });
      
    function getModalStyle() {
        const top = 50;
        const left = 50;
        
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    return <div className="viewportWithoutAligment">
            <Modal open={finalized}
                   onClose={finalize}>
                    <div style={{
                        position: 'absolute',
                        width: 400,
                        backgroundColor: "white",
                        border: '2px solid #000',
                        padding : 50,
                        textAlign : "center",
                        ...getModalStyle(),
                    }}>
                        <div style={{marginBottom : 10}}>Pedido finalizado com sucesso</div>
                        <Button variant="contained"
                                style={{color : "white"}}
                                color="primary"
                                onClick={finalize}>
                                <b>Entendi</b>
                        </Button>
                    </div>
            </Modal>
               {
                   (lists) ? 
                        <>
                            <div className={liClasses}
                                 style={{
                                                padding : 30,
                                                justifyContent : "space-between",
                                                backgroundSize : "cover",
                                                color : "white",
                                                backgroundImage : "url(" + "/" + internalSelectedOrder.photo + "-grande.jpg)"
                                            }}>
                                    <div className="row" 
                                         onClick={back}
                                         style={{marginTop : 20, marginBottom : 30, cursor : "pointer"}}>
                                        <img src="/icon-back.png" alt="icon-back" /> Voltar
                                    </div>
                                    <div>
                                        <h1 style={{marginBottom : 10}}>{internalSelectedOrder.name}</h1>
                                        <p>{internalSelectedOrder.description}</p>
                                    </div>
                            </div>
                            {lists} 
                            <div style={{display : "flex", justifyContent : "flex-end", backgroundColor : "rgba(0,0,0,0.1)", padding : 10}}>
                                <Button variant="contained"
                                        style={{color : "white"}}
                                        color="primary"
                                        onClick={_ => setFinalized(true)}>
                                        <b>Finalizar Pedido</b>
                                </Button>
                            </div>
                        </>
                     : 
                    <div>Carregando a receita...</div>
               }
            </div>
}

export const getServerSideProps = async ctx => {
    const { params } = ctx;
    const id = params.id;
    const { req, res } = ctx;
	const cookies = new Cookies(req, res);
    const findOneOrderResponse = await findOneServerSide(id);
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
