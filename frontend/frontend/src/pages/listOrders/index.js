import Cookies from 'cookies'
import { useEffect, useState } from 'react';
import { findAll } from '../../backend/orders';
import Order from '../../components/order';
import Header from '../../components/header';
import GlobalStyles from '../../components/globalStyles';
import Head from 'next/head';

export default function App(){
	const [orders, setOrders] = useState([]);

	useEffect(_ => {
		(async _ => {
			const findAllResponse = await findAll();
			if(findAllResponse && Array.isArray(findAllResponse)){
				setOrders(findAllResponse.map(order => {
					return <Order name={order.name}
								  description={order.description}
								  photo={order.photo}
								  recipeId={order.recipeId}/>
				}));
			}
		})();
	}, []);

    return <GlobalStyles>
					<Head>
						<title>Lista de pedidos</title>
					</Head>
					<div style={{marginLeft : 30, marginRight: 30}}>
						<Header/>
						<div className="hr">
							<h2>Últimos pedidos</h2>
						</div>
						{orders}
					</div>
			</GlobalStyles>
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
