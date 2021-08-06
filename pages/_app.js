import FirebaseContext from '../firebase/FirebaseContext'
import clientFirebase from '../firebase/firebase'
import '../styles/app.css'
import useAuthentication from '../hooks/useAuthentication'

const MyApp = (props) => {
	const usuario = useAuthentication()
	const { Component, pageProps } = props

	return (
		<FirebaseContext.Provider value={{ clientFirebase, usuario }}>
			<Component {...pageProps} />
		</FirebaseContext.Provider>
	)
}

export default MyApp
