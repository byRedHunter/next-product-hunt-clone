import { useContext, useEffect, useState } from 'react'
import FirebaseContext from '../firebase/FirebaseContext'

const useProductos = (orden) => {
	const [productos, setProductos] = useState([])
	const { clientFirebase } = useContext(FirebaseContext)

	useEffect(() => {
		const obtenerProdutos = () => {
			clientFirebase.db
				.collection('productos')
				.orderBy(orden, 'desc')
				.onSnapshot(manejarSnapshot)
		}

		obtenerProdutos()
		// eslint-disable-next-line
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

	return { productos }
}

export default useProductos
