import Property from "../models/Property.js";

export const createProperty = async (req, res) => {
  const newProperty = new Property(req.body);

  try {
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProperty = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "description", "price", "location", "images"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).send();
    }

    updates.forEach((update) => (property[update] = req.body[update]));
    await property.save();
    res.status(200).send(property);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).send();
    }

    res.status(200).send(property);
  } catch (error) {
    res.status(500).send(error);
  }
};
