import styled from '@emotion/styled'
import React from 'react'
import Link from 'next/link'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { es } from 'date-fns/locale'
import { css } from '@emotion/react'

const Producto = styled.li`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	border-bottom: 0.1rem solid var(--naranja);
	row-gap: 2rem;
	@media screen and (min-width: 700px) {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 1rem;
	}
`
const DescripcionProducto = styled.div`
	display: grid;
	gap: 2rem;
	@media screen and (min-width: 700px) {
		flex: 0 1 600px;
		grid-template-columns: 1fr 3fr;
	}
`
const Comentarios = styled.div`
	margin: 2rem 0;
	display: flex;
	align-items: center;
	div {
		display: flex;
		align-items: center;
		border: 0.1rem solid var(--naranja);
		padding: 0.3rem 1rem;
		margin-right: 2rem;
	}
	img {
		width: 2rem;
		margin-right: 1rem;
	}
	p {
		font-size: 1.6rem;
		font-weight: 700;
		&::last-of-type {
			margin: 0;
		}
	}
`
const Imagen = styled.img`
	border-radius: 0.3rem;
	width: 100%;
	@media screen and (min-width: 700px) {
		width: 20rem;
	}
`
const Votos = styled.div`
	text-align: center;
	border: 0.1rem solid var(--naranja);
	display: flex;
	justify-content: center;
	padding: 1rem 0;
	@media screen and (min-width: 700px) {
		flex-direction: column;
		padding: 3rem 2rem;
		flex: 0 0 auto;
	}

	div {
		font-size: 2rem;
	}

	p {
		margin: 0;
		font-size: 2rem;
		font-weight: 700;
	}
`
const Titulo = styled.h1`
	font-size: 2rem;
	font-weight: bold;
	margin: 0;
	cursor: pointer;
`

export const DetallesProducto = ({ product }) => {
	const {
		id,
		comentarios,
		creado,
		descripcion,
		empresa,
		producto,
		url,
		urlImagen,
		votos,
	} = product

	return (
		<Producto>
			<DescripcionProducto>
				<div>
					<Imagen src={urlImagen} alt={producto} />
				</div>

				<div>
					<Link href='/productos/[id]' as={`/productos/${id}`} passHref>
						<Titulo>{producto}</Titulo>
					</Link>
					<p
						css={css`
							color: #555;
						`}
					>
						{descripcion}
					</p>

					<Comentarios>
						<div>
							<Imagen
								src='/static/images/comentario.png'
								alt='Icono de comentario'
							/>
							<p> {comentarios.length} Comentarios</p>
						</div>
					</Comentarios>

					<p>
						Publicado hace:{' '}
						{formatDistanceToNow(new Date(creado), { locale: es })}
					</p>
				</div>
			</DescripcionProducto>

			<Votos>
				<div>&#9650;</div>
				<p> {votos} </p>
			</Votos>
		</Producto>
	)
}
