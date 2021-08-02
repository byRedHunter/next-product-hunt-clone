import Layout from '../components/layout/Layout'
import { Campo, Formulario, InputSubmit } from '../components/ui/Formulario'
import useValidation from '../hooks/useValidation'
import validarCrearCuenta from '../validacion/validarCrearCuenta'

const STATE_INITIAL = {
	nombre: '',
	email: '',
	password: '',
}

export default function CrearCuenta() {
	const crearCuenta = () => {
		console.log('creando cuenta')
	}

	const { valores, errores, submitForm, handleChange, handleSubmit } =
		useValidation(STATE_INITIAL, validarCrearCuenta, crearCuenta)
	const { nombre, email, password } = valores

	return (
		<Layout>
			<div className='contenedor'>
				<Formulario autoComplete='off' onSubmit={handleSubmit}>
					<h1>Crear Cuenta</h1>

					<Campo error={errores?.nombre}>
						<label htmlFor='nombre'>Nombre</label>
						<input
							type='text'
							id='nombre'
							placeholder='Tu nombre'
							name='nombre'
							value={nombre}
							onChange={handleChange}
						/>
						{errores?.nombre && <p>{errores.nombre}</p>}
					</Campo>

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

					<InputSubmit type='submit' value='Crear Cuenta' />
				</Formulario>
			</div>
		</Layout>
	)
}
