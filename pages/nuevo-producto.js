import { css } from '@emotion/react'
import { useRouter } from 'next/dist/client/router'
import { useContext, useState } from 'react'
import FileUploader from 'react-firebase-file-uploader'
import Error404 from '../components/layout/404'
import Layout from '../components/layout/Layout'
import { Campo, Formulario, InputSubmit } from '../components/ui/Formulario'
import FirebaseContext from '../firebase/FirebaseContext'
import useValidation from '../hooks/useValidation'
import validarCrearProducto from '../validacion/validarCrearProducto'

const STATE_INITIAL = {
	producto: '',
	empresa: '',
	imagen: '',
	url: '',
	descripcion: '',
}

export default function NuevoProducto() {
	// state de las imagenes
	const [nombreImagen, setNombreImagen] = useState('')
	const [subiendo, setSubiendo] = useState(false)
	const [progreso, setProgreso] = useState(0)
	const [urlImagen, setUrlImagen] = useState('')

	const { usuario, clientFirebase } = useContext(FirebaseContext)
	const router = useRouter()

	const [error, setError] = useState(false)

	const crearProducto = async () => {
		// si el usuario no esta autenticado
		if (!usuario) return router.push('/login')

		// objeto de nuevo producto
		const producto = {
			...valores,
			votos: 0,
			urlImagen,
			comentarios: [],
			creado: Date.now(),
			creador: {
				id: usuario.uid,
				nombre: usuario.displayName,
			},
			haVotado: [],
		}

		try {
			// agregamos a la db
			clientFirebase.db.collection('productos').add(producto)

			return router.push('/')
		} catch (error) {
			console.error('Error al crear un nuevo producto ', error)
			setError(error.message)
		}
	}

	const { valores, errores, handleChange, handleSubmit } = useValidation(
		STATE_INITIAL,
		validarCrearProducto,
		crearProducto
	)
	const { producto, empresa, imagen, url, descripcion } = valores

	const handleUploadStart = () => {
		setProgreso(0)
		setSubiendo(true)
	}

	const handleProgress = (progreso) => setProgreso({ progreso })

	const handleUploadError = (error) => {
		setSubiendo(error)
		console.log(error)
	}

	const handleUploadSuccess = (nombre) => {
		setProgreso(100)
		setSubiendo(false)
		setNombreImagen(nombre)
		clientFirebase.storage
			.ref('productos')
			.child(nombre)
			.getDownloadURL()
			.then((url) => {
				console.log(url)
				setUrlImagen(url)
			})
	}

	return (
		<Layout>
			<div className='contenedor'>
				{!usuario ? (
					<Error404 />
				) : (
					<Formulario autoComplete='off' onSubmit={handleSubmit}>
						<h1>Nuevo Producto</h1>

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

						<fieldset>
							<legend>Información General</legend>

							<Campo error={errores?.producto}>
								<label htmlFor='producto'>Producto</label>
								<input
									type='text'
									id='producto'
									placeholder='Nombre del producto'
									name='producto'
									value={producto}
									onChange={handleChange}
								/>
								{errores?.producto && <p>{errores.producto}</p>}
							</Campo>

							<Campo error={errores?.empresa}>
								<label htmlFor='empresa'>Empresa</label>
								<input
									type='text'
									id='empresa'
									placeholder='Nombre de la empresa'
									name='empresa'
									value={empresa}
									onChange={handleChange}
								/>
								{errores?.empresa && <p>{errores.empresa}</p>}
							</Campo>

							<Campo error={errores?.imagen}>
								<label htmlFor='imagen'>Imagen</label>
								<FileUploader
									accept='image/*'
									id='imagen'
									name='imagen'
									randomizeFilename
									storageRef={clientFirebase.storage.ref('productos')}
									onUploadStart={handleUploadStart}
									onUploadError={handleUploadError}
									onUploadSuccess={handleUploadSuccess}
									onProgress={handleProgress}
								/>
								{errores?.imagen && <p>{errores.imagen}</p>}
							</Campo>

							<Campo error={errores?.url}>
								<label htmlFor='url'>URL</label>
								<input
									type='text'
									id='url'
									placeholder='URL del producto'
									name='url'
									value={url}
									onChange={handleChange}
								/>
								{errores?.url && <p>{errores.url}</p>}
							</Campo>
						</fieldset>

						<fieldset>
							<legend>Sobre tu Producto</legend>

							<Campo error={errores?.descripcion}>
								<label
									htmlFor='descripcion'
									css={css`
										align-self: self-start;
									`}
								>
									Descripción
								</label>
								<textarea
									type='descripcion'
									id='descripcion'
									placeholder='Descripción del producto'
									name='descripcion'
									value={descripcion}
									onChange={handleChange}
								/>
								{errores?.descripcion && <p>{errores.descripcion}</p>}
							</Campo>
						</fieldset>
						<InputSubmit type='submit' value='Crear Producto' />
					</Formulario>
				)}
			</div>
		</Layout>
	)
}
