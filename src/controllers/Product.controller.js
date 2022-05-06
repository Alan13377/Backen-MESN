import Product from "../models/Product";
import fs from "fs-extra";
import path from "path";
export const createProduct = async (request, response) => {
  try {
    //response.send(request.userId);
    const { name, uprice } = request.body;

    const product = new Product({
      name,
      uprice,
      image: request.file.path,
      user: request.userId,
    });
    await product.save();
    response
      .status(200)
      .json({ message: "Producto guardado correctamente", product });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const readProduct = async (request, response) => {
  try {
    const { id } = request.params;
    const product = await Product.findById(id);

    response.status(200).json(product);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (request, response) => {
  try {
    const id = request.params.id,
      { name, uprice } = request.body;

    //Si existe
    if (request.file) {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          name,
          uprice,
          image: request.file.path,
        },
        { new: true }
      );
      response.status(200).json({
        message: "Producto actualizado correctamente",
        updatedProduct,
      });
    } else {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          name,
          uprice,
        },
        { new: true }
      );
      response.status(200).json({
        message: "Producto actualizado correctamente",
        updatedProduct,
      });
    }
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (requets, response) => {
  try {
    const id = requets.params.id;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deleteProduct) {
      await fs.unlink(path.resolve(deletedProduct.image));
    }

    response.status(200).json({ message: "Producto borrado correctamente" });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const getProducts = async (request, response) => {
  try {
    const products = await Product.find({ user: request.userId }).sort("name");
    response.status(200).json(products);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};
