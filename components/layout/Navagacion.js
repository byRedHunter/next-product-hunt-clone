import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

const Nav = styled.nav`
	padding-left: 2rem;
	a {
		font-size: 1.8rem;
		margin-left: 2rem;
		color: var(--gris-200);

		&:last-of-type {
			margin-right: 0;
		}
	}
`

const Navagacion = () => {
	return (
		<Nav>
			<Link href='/'>Inicio</Link>
			<Link href='/populares'>Populares</Link>
			<Link href='/nuevo-producto'>Nuevo Producto</Link>
		</Nav>
	)
}

export default Navagacion
