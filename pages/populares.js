import { DetallesProducto } from '../components/layout/DetallesProducto'
import Layout from '../components/layout/Layout'
import useProductos from '../hooks/useProductos'

export default function Populares() {
	const { productos } = useProductos('votos')

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
