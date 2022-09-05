import Container from './container.js';
const products = new Container('./DB/products.json');


//Obtener todos los productos || un producto seleccionado
const getProducts = (req, res) => {
	//Se obtiene todos los productos
	if (req.params.id == undefined) {
		return res.send(products.getAll());
	} else { //Se obtiene un producto seleccionado
		const id = Number(req.params.id);
		const product = products.getById(id);
		if (!product) {
			return res.status(404).send({ message: 'El ID no pertenece a ningun producto' });
		} else {
			res.json(product);
		}
	};
};

//Añadir Producto
const addProduct = (req, res) => {
	const { name, description, code, pic, price, stock } = req.body;
	products.save({ name, description, code, pic, price, stock });
	res.json({ message: 'Producto agregado' });
};

//Actualizar Producto
const updateProduct = (req, res) => {
	const id = Number(req.params.id);
	if (id < 0 || id > products.objects.length) {
		return res.status(400).send({ message: 'Ingresa el ID de un producto listado' });
	} else {
		if (isNaN(id)) {
			return res.status(400).send({ message: 'Ingresa el ID de un producto listado' });
		} else {
			products.update(id, req.body);
			res.json({ message: 'Producto actualizado' });
		}
	};
};

//Eliminar Producto
const deleteProduct = (req, res) => {
	const id = Number(req.params.id);
	if (isNaN(id)) {
		return res.status(400).send({ message: 'Ingresa el ID de un producto listado' });
	} else {
		const productDeleted = products.deleteById(id);
		if (productDeleted === -1) {
			return res.status(404).json({ message: 'El ID no pertenece a un producto listado' });
		} else {
			res.json({ message: 'Producto eliminado' });
		}
	};
};

export { products, getProducts, addProduct, updateProduct, deleteProduct };