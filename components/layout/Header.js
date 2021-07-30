import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import Buscar from '../ui/Buscar'
import Navagacion from './Navagacion'
import Boton from '../ui/Boton'

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
	const usuario = false

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
					`}
				>
					{usuario ? (
						<>
							<p
								css={css`
									margin-right: 2rem;
								`}
							>
								Hola: byRedHunter
							</p>

							<Boton bgColor='true'>Cerrar Sesión</Boton>
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
