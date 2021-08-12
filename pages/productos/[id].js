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
		gap: 2rem;
	}

	img {
		margin: 2rem 0;
	}
`

const CreadorProducto = styled.span`
	background: var(--gris-200);
	padding: 0.3rem 0.5rem;
	font-size: 1.4rem;
	border-radius: 0.5rem;
	color: #eee;
	margin-left: 1rem;
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
	const [comment, setComment] = useState({ mensaje: '' })
	const [consultarDB, setConsultarDB] = useState(true)

	useEffect(() => {
		if (id && consultarDB) {
			const obtenerProducto = async () => {
				const productQuery = await clientFirebase.db
					.collection('productos')
					.doc(id)
				const product = await productQuery.get()

				product.exists ? setProductoActual(product.data()) : setError(true)
			}

			obtenerProducto()
			setConsultarDB(false)
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
		haVotado,
	} = productoActual

	const votarProducto = async () => {
		if (!usuario) {
			return router.push('/login')
		}

		// verificar si el usuario actual ha votado
		if (haVotado.includes(usuario.uid)) return

		// obtener y sumar votos
		const nuevoTotal = votos + 1

		// guardar el id del usuario que ha votado
		const nuevoHaVotado = [...haVotado, usuario.uid]

		// actualizar en la db
		await clientFirebase.db
			.collection('productos')
			.doc(id)
			.update({ votos: nuevoTotal, haVotado: nuevoHaVotado })

		// actualizar en el state
		setProductoActual({ ...productoActual, votos: nuevoTotal })

		setConsultarDB(true)
	}

	// funciones para crear comentario
	const comentarioChage = (e) => {
		setComment({ ...comment, [e.target.name]: e.target.value })
	}

	// identificar si el comentario es del creador
	const esCreador = (id) => {
		if (creador.id === id) {
			return true
		}

		return false
	}

	const agregarComentario = async (e) => {
		e.preventDefault()

		if (!usuario) {
			return router.push('/login')
		}

		// informacion extra al comentario
		comment.usuarioId = usuario.uid
		comment.usuarioNombre = usuario.displayName

		const nuevoComentarios = [...comentarios, comment]

		// actualiza en la db
		await clientFirebase.db
			.collection('productos')
			.doc(id)
			.update({ comentarios: nuevoComentarios })

		// actualizar en el state
		setProductoActual({
			...productoActual,
			comentarios: nuevoComentarios,
		})

		setComment({ ...comment, mensaje: '' })
		setConsultarDB(true)
	}

	// funcion que revisa que el creador del producto sea el mismo que esta autenticado
	const puedeBorrar = () => {
		if (!usuario) return false

		if (creador.id === usuario.uid) return true
	}

	// elimina producto de la db
	const eliminarProducto = async () => {
		if (!usuario) return router.push('/login')
		if (creador.id !== usuario.uid) return router.push('/')

		try {
			await clientFirebase.db.collection('productos').doc(id).delete()

			router.push('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Layout>
			<div className='contenedor'>
				{error && <Error404 />}

				{Object.keys(productoActual).length === 0 ? (
					!error && <p>Cargando...</p>
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

										<form onSubmit={agregarComentario}>
											<Campo>
												<input
													type='text'
													name='mensaje'
													onChange={comentarioChage}
													value={comment.mensaje}
												/>
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

								{comentarios.length === 0 ? (
									<p>Aún no hay comentarios</p>
								) : (
									<ul>
										{comentarios.map((comentario) => (
											<li
												key={comentario.usuarioId + Date.now().toString()}
												css={css`
													border: 0.1rem solid var(--naranja);
													padding: 0.5rem;
													margin-bottom: 0.5rem;
												`}
											>
												<p> {comentario.mensaje} </p>
												<p
													css={css`
														margin-top: 1rem;
													`}
												>
													{' '}
													<span
														css={css`
															font-weight: bold;
														`}
													>
														Escriot por:
													</span>{' '}
													{comentario.usuarioNombre}{' '}
													{esCreador(comentario.usuarioId) && (
														<CreadorProducto>Es Creador</CreadorProducto>
													)}
												</p>
											</li>
										))}
									</ul>
								)}
							</div>

							<aside
								css={css`
									margin-top: 4rem;
									@media screen and (min-width: 768px) {
										margin-top: 0;
									}
								`}
							>
								<p> {votos} Votos </p>

								{usuario && <Boton onClick={votarProducto}>Votar</Boton>}

								<Boton target='_blank' bgColor={true} href={url}>
									Visitar Web
								</Boton>
							</aside>
						</ContenedorProducto>

						{puedeBorrar() && (
							<Boton onClick={eliminarProducto}>Eliminar Producto</Boton>
						)}
					</>
				)}
			</div>
		</Layout>
	)
}

export default Producto
