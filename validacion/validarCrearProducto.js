export default function validarCrearProducto(valores) {
	let errores = {}

	if (!valores.producto) {
		errores.producto = 'El producto es obligatorio'
	}

	if (!valores.empresa) {
		errores.empresa = 'Nombre de la empresa es obligatorio'
	}

	// validar url
	if (!valores.url) {
		errores.url = 'La URL del producto es obligatoria'
	} else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
		errores.url = 'La URL no es válida'
	}

	if (!valores.descripcion) {
		errores.descripcion = 'Agrega una descripcion a tu producto'
	}

	return errores
}
