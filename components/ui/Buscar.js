import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import router from 'next/router'

const InputText = styled.input`
	border: 0.1rem solid var(--gris-100);
	padding: 1rem;
	min-width: 30rem;
	outline: none;
`

const InputSubmit = styled.button`
	height: 3rem;
	width: 3rem;
	display: block;
	background-size: 4rem;
	background-image: url('/static/images/buscar.png');
	background-repeat: no-repeat;
	position: absolute;
	right: 1rem;
	top: 0.1rem;
	background-color: white;
	border: none;
	color: transparent;
`

const Buscar = () => {
	const [busqueda, setBusqueda] = useState('')

	const buscarProducto = (e) => {
		e.preventDefault()

		if (busqueda.trim() === '') return

		// redireccion al usuario a /buscar
		router.push({ pathname: '/buscar', query: { q: busqueda } })
	}

	return (
		<form
			css={css`
				display: none;
				position: relative;
				@media screen and (min-width: 800px) {
					display: initial;
				}
			`}
			onSubmit={buscarProducto}
		>
			<InputText
				type='text'
				placeholder='Buscar Productos'
				value={busqueda}
				onChange={(e) => setBusqueda(e.target.value)}
			/>
			<InputSubmit type='submit'></InputSubmit>
		</form>
	)
}

export default Buscar
