import mongoose from "mongoose";
import config from "../../config.js";

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

export const Products_controller_mongodb = class Products_container {
	constructor(collection, schema) {
		this.collection = mongoose.model(collection, schema);
	}

	// Agrega un producto
	save = async (product) => {
		try {
			await this.collection.create(product);
			return true;
		} catch (err) {
			return { error: "Producto no guardado" };
		}
	};

	getAll = async () => {
		try {
			const products = await this.collection.find({});
			if (!products) throw new Error("Productos no encontrados");
			return products;
		} catch (err) {
			return { error: err };
		}
	};

	getById = async (product_id) => {
		try {
			const product = await this.collection.findById(product_id);
			if (!product) throw new Error("Producto no encontrado");
			return product;
		} catch (err) {
			return { error: err };
		}
	};

	updateById = async (product_id, product) => {
		try {
			await this.collection.findByIdAndUpdate(product_id, product);
			return true;
		} catch (err) {
			return { error: err };
		}
	};

	deleteById = async (product_id) => {
		try {
			await this.collection.findByIdAndDelete(product_id);
			return true;
		} catch (err) {
			return { error: err };
		}
	};
};
