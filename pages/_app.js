import FirebaseContext from '../firebase/FirebaseContext'
import firebase from '../firebase/firebase'
import '../styles/app.css'

const MyApp = (props) => {
	const { Component, pageProps } = props

	return (
		<FirebaseContext.Provider value={{ firebase }}>
			<Component {...pageProps} />
		</FirebaseContext.Provider>
	)
}

export default MyApp
