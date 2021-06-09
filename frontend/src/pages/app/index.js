import Cookies from 'cookies'

export default function App(){
    return <div>App</div>
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
