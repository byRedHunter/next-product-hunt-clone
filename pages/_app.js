import FirebaseContext from '../firebase/FirebaseContext'
import clientFirebase from '../firebase/firebase'
import '../styles/app.css'

const MyApp = (props) => {
	const { Component, pageProps } = props

	return (
		<FirebaseContext.Provider value={{ clientFirebase }}>
			<Component {...pageProps} />
		</FirebaseContext.Provider>
	)
}

export default MyApp
