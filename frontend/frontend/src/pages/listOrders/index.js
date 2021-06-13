import Cookies from 'cookies'
import { useEffect, useState, useContext } from 'react';
import { findAll } from '../../backend/order';
import Order from '../../components/order';
import Header from '../../components/header';
import Head from 'next/head';

import { SearchContext } from '../../context/SearchContext';

export default function App(){
	const [orders, setOrders] = useState([]);
	const { setSearchQuery } = useContext(SearchContext);

	useEffect(_ => {
		(async _ => {
			const findAllResponse = await findAll();
			if(findAllResponse && Array.isArray(findAllResponse)){
				setOrders(findAllResponse.map(order => {
					return <Order name={order.name}
								  description={order.description}
								  photo={order.photo}
								  recipeId={order.recipeId}
								  _id={order._id}/>
				}));
			}
		})();
	}, []);

	function search(query){
		setSearchQuery(query);
	}

    return <div>
					<Head>
						<title>Lista de pedidos</title>
					</Head>
					<div style={{marginLeft : 30, marginRight: 30}}>
						<Header search={search}/>
						<div className="hr">
							<h2>Últimos pedidos</h2>
						</div>
						{orders}
					</div>
			</div>
}

export async function getServerSideProps(ctx) {
	const { req, res } = ctx;
	const cookies = new Cookies(req, res);

	if (!cookies.get("authenticated")) {
		return {
			redirect: { destination: '/login', permanent: true },
		};
	}
	return { props: {} };
}
