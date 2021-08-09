import { useContext, useEffect, useState } from 'react'
import { DetallesProducto } from '../components/layout/DetallesProducto'
import Layout from '../components/layout/Layout'
import FirebaseContext from '../firebase/FirebaseContext'

export default function Home() {
	const [productos, setProductos] = useState([])
	const { clientFirebase } = useContext(FirebaseContext)

	useEffect(() => {
		const obtenerProdutos = () => {
			clientFirebase.db
				.collection('productos')
				.orderBy('creado', 'desc')
				.onSnapshot(manejarSnapshot)
		}

		obtenerProdutos()
	}, [])

	function manejarSnapshot(snapshot) {
		const productos = snapshot.docs.map((doc) => {
			return {
				id: doc.id,
				...doc.data(),
			}
		})

		setProductos(productos)
	}

	return (
		<Layout>
			<div className='contenedor'>
				<div className='productos-parent'>
					{productos.map((producto) => (
						<ul key={producto.id}>
							<DetallesProducto product={producto} />
						</ul>
					))}
				</div>
			</div>
		</Layout>
	)
}
