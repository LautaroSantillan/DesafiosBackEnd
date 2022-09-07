import Container from "./container.js";
const carts = new Container('./DB/cart.json');
const products = new Container('./DB/products.json');

//Añadir carrito
const addCart = (req, res) => {
    const cart = {
        product: []
    };
    carts.save(cart);
    res.json({ message: `Carrito agregado con ID ${carts.generateId(cart)}`}); 
};

//Elimina carrito
const deleteCart = (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ message: 'Ingresa el ID de un carrito listado' });
    } else {
        const cartDeleted = carts.deleteById(id);
        if (cartDeleted === -1) {
            return res.status(404).json({ message: 'El ID no pertenece a un carrito listado' });
        } else {
            res.json({ message: 'Carrito eliminado' });
        }
    }
};

//Obtiene productos de un carrito segun ID
const getProducts = (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ message: 'Ingresa el ID de un carrito listado' });
    } else {
        const cartSelected = carts.getById(id);
        if (cartSelected == null) {
            return res.status(404).send({ message: 'Ingresa el ID de un carrito listado' });
        } else {
            res.json(cartSelected);
        }
    }
};

//Agrega producto a un carrito
const addProductToCart = (req, res) => {
    const cart = carts.list(req.params.id);
    const prod = products.list(req.body.id);
    cart.product.push(prod);
    carts.update(cart, req.params.id);
    res.end();
};

//Elimina producto de un carrito
const deleteProduct = (req, res) => {
    const id = Number(req.params.id);
    const id_prod = Number(req.params.id_prod);
    if (isNaN(id) || isNaN(id_prod)) {
        return res.status(400).send({ message: 'Ingresa el ID de un carrito listado o de un producto existente' });
    } else {
        const productDeleted = carts.deleteProduct(id, id_prod);
        if (productDeleted == -1 || !productDeleted) {
            return res.status(404).send({ message: 'Error' });
        } else {
            res.json({ message: 'Producto eliminado' });
        }
    }
};

export { addCart, deleteCart, getProducts, addProductToCart, deleteProduct };