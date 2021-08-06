import React, { useContext } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import FirebaseContext from '../../firebase/FirebaseContext'

const Nav = styled.nav`
	padding-left: 2rem;
	a {
		font-size: 1.8rem;
		margin-left: 2rem;
		color: var(--gris-200);

		&:last-of-type {
			margin-right: 0;
		}

		&:first-of-type {
			display: none;
		}
	}
	@media screen and (min-width: 400px) {
		a {
			&:first-of-type {
				display: initial;
			}
		}
	}
	@media screen and (min-width: 800px) {
		a {
			&:first-of-type {
				display: none;
			}
		}
	}
	@media screen and (min-width: 1000px) {
		a {
			&:first-of-type {
				display: initial;
			}
		}
	}
`

const Navagacion = () => {
	const { usuario } = useContext(FirebaseContext)

	return (
		<Nav>
			<Link href='/'>Inicio</Link>

			<Link href='/populares'>Populares</Link>

			{usuario && <Link href='/nuevo-producto'>Nuevo Producto</Link>}
		</Nav>
	)
}

export default Navagacion
