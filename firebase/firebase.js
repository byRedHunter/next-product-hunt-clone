import app from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from './config'

class Firebase {
	constructor() {
		!app.apps.length && app.initializeApp(firebaseConfig)
		this.auth = app.auth()
	}

	// registrar un usuario
	async registrar(nombre, email, password) {
		const newUser = await this.auth.createUserWithEmailAndPassword(
			email,
			password
		)

		return await newUser.user.updateProfile({ displayName: nombre })
	}

	// iniciar sesion
	async login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}
}

const clientFirebase = new Firebase()

export default clientFirebase
