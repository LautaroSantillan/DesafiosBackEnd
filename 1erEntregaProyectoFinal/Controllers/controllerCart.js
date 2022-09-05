import Container from "./container.js";
const carts = new Container('./DB/cart.json');

//Añadir carrito
const addCart = (req, res) => {
    const cart = {
        product: []
    };
    carts.save(cart);
    res.json({ message: 'Carrito agregado' });
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
            res.json({ 'Productos': cartSelected.products });
        }
    }
};

//Agrega producto a un carrito
const addProductToCart = (req, res) => {
    const idCartSelected = Number(req.params.id);
    if (isNaN(idCartSelected)) {
        return res.status(400).send({ message: 'Ingresa el ID de un carrito listado' });
    } else {
        const { idProduct } = req.body;
        const productSaved = carts.saveProduct(idCartSelected, idProduct);
        if (!productSaved) {
            return res.status(404).send({ message: 'Error' });
        } else {
            res.json({ message: productSaved });
        }
    }
};

//Elimina producto de un carrito
const deleteProduct = (req, res) => {
    const id = Number(req.params.id);
    const id_prod = Number(req.params.id_prod);
    if (isNaN(id) || isNaN(id_prod)) {
        return res.status(400).send({ message: 'Ingresa el ID de un carrito listado' });
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