import { css } from '@emotion/react'
import React from 'react'
import Layout from './Layout'

const Error404 = () => {
	return (
		<h1
			css={css`
				text-align: center;
				margin: 4rem 5%;
				color: var(--naranja);
			`}
		>
			No se puede mostrar, ocurrio un error.
		</h1>
	)
}

export default Error404
