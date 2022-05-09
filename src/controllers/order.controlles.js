import Order from "../models/Order";
import createPdf from "../libs/pdf-creator";
export const createOrder = async (request, response) => {
  try {
    const { products, total } = request.body;

    const order = new Order({
      products,
      total,
      user: request.userId,
    });

    order.file = await createPdf(order);
    const savedOrder = await order.save();

    response
      .status(200)
      .json({ message: "Orden guardado correctamente", savedOrder });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const readOrder = async (request, response) => {
  try {
    const id = request.params.id;

    const order = await Order.findById(id);
    response.status(200).json(order);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const getOrders = async (request, response) => {
  try {
    const orders = await Order.find({ user: request.userId });
    response.status(2000).json(orders);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};
