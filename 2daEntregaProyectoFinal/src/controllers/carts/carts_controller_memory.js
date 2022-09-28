export const Carts_controller_memory = class Carts_container {
	constructor() {
		this.carts = [];
	}

	products_list = async () => {
		let requests = await axios.get("http://localhost:8888/api/products");
		return requests.data;
	};

	findIndex = (id) => this.carts.findIndex((cart) => cart.id == id);

	findProductIndex = (cart_id, product_id) => {
		let cart_index = this.findIndex(cart_id);
		let product_index = this.carts[cart_index].products.findIndex((product) => product.id == product_id);
		return product_index;
	};

	create = async () => {
		try {
			let last_id, new_id, new_cart;
			last_id = !this.carts.length ? 0 : this.carts[this.carts.length - 1].id;
			new_id = last_id + 1;
			new_cart = { id: new_id, products: [] };
			this.carts.push(new_cart);
			return { cart_id: new_cart.id };
		} catch (err) {
			console.log("create ERROR::: ", err);
			return { error: "Cart not created." };
		}
	};

	getProducts = async (cart_id) => {
		try {
			let cart = this.carts.find((cart) => cart.id == cart_id);
			if (cart) return cart.products;
			else return { error: "Carrito no encontrado" };
		} catch (err) {
			console.log("ERROR getProducts: ", err);
			return { error: "Error al obtener productos" };
		}
	};

	get = async (cart_id) => {
		try {
			let cart = this.carts.find((cart) => cart.id == cart_id);
			if (cart) return cart;
			else return { error: "Carrito no encontrado" };
		} catch (err) {
			console.log("ERROR get: ", err);
			return { error: "Error al obtener el carrito" };
		}
	};

	addProduct = async (cart_id, product_id) => {
		try {
			const products = await this.products_list();
			const product_to_add = products.find((product) => product.id == product_id);
			let index_to_update = this.findIndex(cart_id);
			if (index_to_update >= 0 && product_to_add.id) {
				this.carts[index_to_update].products.push(product_to_add);
				return true;
			} else return { error: "Producto o Carrito no existe" };
		} catch (err) {
			console.log("ERROR addProduct: ", err);
			return { error: "Producto no añadido" };
		}
	};

	deleteProduct = async (cart_id, product_id) => {
		try {
			let cart_index = this.findIndex(cart_id);
			let product_index = this.findProductIndex(cart_id, product_id);
			if (cart_index >= 0 && product_index >= 0) {
				this.carts[cart_index].products.splice(product_index, 1);
				return true;
			} else return { error: "Producto o Carrito no existe" };
		} catch (err) {
			console.log("ERROR deleteProduct: ", err);
			return { error: "Producto no eliminado" };
		}
	};

	clearProducts = async (cart_id) => {
		try {
			let cart_index = this.findIndex(cart_id);
			if (cart_index >= 0) {
				this.carts[cart_index].products = [];
				return true;
			} else return { error: "Carrito no existe" };
		} catch (err) {
			console.log("ERROR clearProducts: ", err);
			return { error: "Carrito no eliminado" };
		}
	};
};
