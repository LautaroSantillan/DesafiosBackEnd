import { db, timeStamp } from "../../firebase_init.js";

export const Products_controller_firebase = class Products_container {
	constructor(collection) {
		this.collection = db.collection(collection);
	}

	// Agrega un producto
	save = async (product) => {
		try {
			let new_product = product;
			await this.collection.add({ ...new_product, createAt: timeStamp });
			return true;
		} catch (err) {
			return { error: "Producto no guardado" };
		}
	};

	// RETORNA TODOS LOS PRODUCTOS
	getAll = async () => {
		try {
			let products = await this.collection.get();
			let allProducts = products.docs.map((doc) => doc.data());
			console.log(allProducts);
			return allProducts;
		} catch (err) {
			return { error: "Error getAll" };
		}
	};
	// RECIBE UN ID Y RETORNA EL PRODUCTO
	getById = async (id) => {
		try {
			let product = await this.collection.doc(id).get();
			if (product.exists) return product.data();
			else throw new Error("Producto no encontrado");
		} catch (err) {
			return { error: "Error getById: " + err };
		}
	};

	// ACTUALIZA UN PRODUCTO POR SU ID
	updateById = async (id, products) => {
		try {
			await this.collection.doc(id).update(products);
			return true;
		} catch (err) {
			return { error: "Producto no actualizado" };
		}
	};

	// ELIMINA UN PRODUCTO POR SU ID
	deleteById = async (id) => {
		try {
			await this.collection.doc(id).delete();
			return true;
		} catch (err) {
			return { error: "Producto no eliminado" };
		}
	};
};
