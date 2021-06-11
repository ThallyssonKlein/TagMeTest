import Cookies from 'cookies'
import { useEffect, useState } from 'react';
import { findAll } from '../../backend/orderservice';
import Order from '../../components/order';

export default function App(){
	const [orders, setOrders] = useState([]);

	useEffect(_ => {
		(async _ => {
			const findAllResponse = await findAll();
			if(findAllResponse && Array.isArray(findAllResponse)){
				setOrders(findAllResponse.map(order => {
					return <Order name={order.name} description={order.description} photo={order.photo} _id={order.id}/>
				}));
			}
		})();
	}, []);

    return <div>{orders}</div>
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
