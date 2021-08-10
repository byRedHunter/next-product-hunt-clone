import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import FirebaseContext from '../../firebase/FirebaseContext'
import Error404 from '../../components/layout/404'
import Layout from '../../components/layout/Layout'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { es } from 'date-fns/locale'
import { Campo, InputSubmit } from '../../components/ui/Formulario'
import Boton from '../../components/ui/Boton'

const ContenedorProducto = styled.div`
	@media screen and (min-width: 768px) {
		display: grid;
		grid-template-columns: 2fr 1fr;
		column-gap: 2rem;
	}

	img {
		margin: 2rem 0;
	}
`

const Producto = () => {
	// routin para obtener el id actual
	const router = useRouter()
	const {
		query: { id },
	} = router

	const { usuario, clientFirebase } = useContext(FirebaseContext)

	const [productoActual, setProductoActual] = useState({})
	const [error, setError] = useState(false)

	useEffect(() => {
		if (id) {
			const obtenerProducto = async () => {
				const productQuery = await clientFirebase.db
					.collection('productos')
					.doc(id)
				const product = await productQuery.get()

				product.exists ? setProductoActual(product.data()) : setError(true)
			}

			obtenerProducto()
		}

		// eslint-disable-next-line
	}, [id])

	const {
		comentarios,
		creado,
		descripcion,
		empresa,
		producto,
		url,
		urlImagen,
		votos,
		creador,
	} = productoActual

	return (
		<Layout>
			<div className='contenedor'>
				{error && <Error404 />}

				{Object.keys(productoActual).length === 0 ? (
					<p>Cargando...</p>
				) : (
					<>
						<h1
							css={css`
								text-align: center;
							`}
						>
							{producto}
						</h1>

						<ContenedorProducto>
							<div>
								<p>
									Publicado hace:{' '}
									{formatDistanceToNow(new Date(creado), { locale: es })}
								</p>
								<p>
									Por: {creador.nombre} de la empresa {empresa}
								</p>

								<img src={urlImagen} alt={producto} />

								<p> {descripcion} </p>

								{usuario && (
									<>
										<h2
											css={css`
												margin-top: 2rem;
											`}
										>
											Agrega tu comentario
										</h2>

										<form>
											<Campo>
												<input type='text' name='mensaje' />
											</Campo>

											<InputSubmit type='submit' value='Agregar Comentario' />
										</form>
									</>
								)}

								<h2
									css={css`
										margin: 2rem 0;
									`}
								>
									Comentarios
								</h2>

								{/* {comentarios.map((comentario) => (
							<li key={comentario.id}>
								<p> {comentario.nombre} </p>
								<p> Escriot por: {comentario.usuarioNombre} </p>
							</li>
						))} */}
							</div>

							<aside>
								<p> {votos} Votos </p>

								{usuario && <Boton>Votar</Boton>}

								<Boton target='_blank' bgColor={true} href={url}>
									Visitar Web
								</Boton>
							</aside>
						</ContenedorProducto>
					</>
				)}
			</div>
		</Layout>
	)
}

export default Producto
