import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DetallesProducto } from '../components/layout/DetallesProducto'
import Layout from '../components/layout/Layout'
import useProductos from '../hooks/useProductos'

export default function Buscar() {
	const router = useRouter()
	const {
		query: { q },
	} = router

	// lista de todos los productos
	const { productos } = useProductos('creado')

	const [resultado, setResultado] = useState([])

	useEffect(() => {
		const busqueda = q.toLowerCase()
		const filtro = productos.filter((producto) => {
			return (
				producto.producto.toLowerCase().includes(busqueda) ||
				producto.descripcion.toLowerCase().includes(busqueda)
			)
		})
		setResultado(filtro)
	}, [q, productos])

	return (
		<Layout>
			<div className='contenedor'>
				<div className='productos-parent'>
					{resultado.map((producto) => (
						<ul key={producto.id}>
							<DetallesProducto product={producto} />
						</ul>
					))}
				</div>
			</div>
		</Layout>
	)
}
