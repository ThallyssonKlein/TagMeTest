export default function App(){
    return <div>App</div>
}

export async function getServerSideProps(ctx) {
    //check cookie
	if (false) {
		return {
			redirect: { destination: '/login', permanent: true },
		};
	}
	return { props: {} };
}
