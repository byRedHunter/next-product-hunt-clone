import React, { useContext } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import Buscar from '../ui/Buscar'
import Navagacion from './Navagacion'
import Boton from '../ui/Boton'
import FirebaseContext from '../../firebase/FirebaseContext'
import clientFirebase from '../../firebase/firebase'

const ContenedorHeader = styled.div`
	max-width: 1200px;
	width: 95%;
	margin: 0 auto;
	@media (min-width: 768px) {
		display: flex;
		justify-content: space-between;
	}
`

const Logo = styled.p`
	color: var(--naranja);
	font-size: 4rem;
	font-weight: 700;
	font-family: 'Roboto Slab', sans-serif;
	margin-right: 2rem;
	cursor: pointer;
`

const Header = () => {
	const { usuario } = useContext(FirebaseContext)

	return (
		<header
			css={css`
				border-bottom: 0.2rem solid var(--gris-100);
				padding: 1rem 0;
			`}
		>
			<ContenedorHeader>
				<div
					css={css`
						display: flex;
						align-items: center;
						justify-content: space-between;
					`}
				>
					<Link href='/' passHref>
						<Logo>P</Logo>
					</Link>

					<Buscar />

					<Navagacion />
				</div>

				<div
					css={css`
						display: flex;
						align-items: center;
						justify-content: center;
						@media screen and (min-width: 800px) {
							justify-content: initial;
						}
					`}
				>
					{usuario ? (
						<>
							<p
								css={css`
									margin-right: 2rem;
									@media screen and (min-width: 800px) {
										display: none;
									}
									@media screen and (min-width: 1100px) {
										display: initial;
									}
								`}
							>
								Hola: {usuario.displayName}
							</p>

							<Boton
								bgColor='true'
								onClick={() => clientFirebase.closeSession()}
							>
								Cerrar Sesión
							</Boton>
						</>
					) : (
						<>
							<Link href='/login' passHref>
								<Boton bgColor='true'>Login</Boton>
							</Link>

							<Link href='/crear-cuenta' passHref>
								<Boton>Crear Cuenta</Boton>
							</Link>
						</>
					)}
				</div>
			</ContenedorHeader>
		</header>
	)
}

export default Header
