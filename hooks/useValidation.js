import React, { useEffect, useState } from 'react'

const useValidation = (stateInicial, validar, fn) => {
	const [valores, setValores] = useState(stateInicial)
	const [errores, setErrores] = useState({})
	const [submitForm, setSubmitForm] = useState(false)

	useEffect(() => {
		if (submitForm) {
			const noErrores = Object.keys(errores).length === 0

			if (noErrores) {
				fn() // fn = Funcion que se ejecuta en el componente
			}

			setSubmitForm(false)
		}
	}, [errores])

	// funcion que se ejecuta conforme el usuario escribe algo
	const handleChange = ({ target }) => {
		setValores({ ...valores, [target.name]: target.value })
	}

	// funcion que se ejecuta cuando el usurio hace submit
	const handleSubmit = (e) => {
		e.preventDefault()

		const erroresValidacion = validar(valores)
		setErrores(erroresValidacion)
		setSubmitForm(true)
	}

	// cuando se realiza el evento de blur
	const handleBlur = ({ target }) => {
		const erroresValidacion = validar(valores)
		setErrores(erroresValidacion)
	}

	return {
		valores,
		errores,
		submitForm,
		handleSubmit,
		handleChange,
		handleBlur,
	}
}

export default useValidation
