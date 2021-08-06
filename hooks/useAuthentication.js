import { useEffect, useState } from 'react'
import clientFirebase from '../firebase/firebase'

const useAuthentication = () => {
	const [usuarioAutenticado, setUsuarioAutenticado] = useState(null)

	useEffect(() => {
		const unsuscribe = clientFirebase.auth.onAuthStateChanged((user) => {
			user ? setUsuarioAutenticado(user) : setUsuarioAutenticado(null)
		})

		return () => unsuscribe()
	}, [])

	return usuarioAutenticado
}

export default useAuthentication
