import { css } from '@emotion/react'
import router from 'next/router'
import { useState } from 'react'
import Layout from '../components/layout/Layout'
import { Campo, Formulario, InputSubmit } from '../components/ui/Formulario'
import clientFirebase from '../firebase/firebase'
import useValidation from '../hooks/useValidation'
import validarIniciarSesion from '../validacion/validarIniciarSesion'

const STATE_INITIAL = {
	email: '',
	password: '',
}

export default function Login() {
	const [error, setError] = useState(false)

	const iniciarSesion = async () => {
		try {
			await clientFirebase.login(email, password)
			router.push('/')
		} catch (error) {
			console.error('Error al iniciar sesion ', error)
			setError(error.message)
		}
	}

	const { valores, errores, handleChange, handleSubmit } = useValidation(
		STATE_INITIAL,
		validarIniciarSesion,
		iniciarSesion
	)
	const { email, password } = valores

	return (
		<Layout>
			<div className='contenedor'>
				<Formulario autoComplete='off' onSubmit={handleSubmit}>
					<h1>Iniciar Sesión</h1>

					{error && (
						<p
							css={css`
								text-align: center;
								margin-bottom: 2rem;
								color: #f55;
							`}
						>
							{error}
						</p>
					)}

					<Campo error={errores?.email}>
						<label htmlFor='email'>Email</label>
						<input
							type='text'
							id='email'
							placeholder='Tu email'
							name='email'
							value={email}
							onChange={handleChange}
						/>
						{errores?.email && <p>{errores.email}</p>}
					</Campo>

					<Campo error={errores?.password}>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							placeholder='Tu password'
							name='password'
							value={password}
							onChange={handleChange}
						/>
						{errores?.password && <p>{errores.password}</p>}
					</Campo>

					<InputSubmit type='submit' value='Iniciar Sesión' />
				</Formulario>
			</div>
		</Layout>
	)
}
