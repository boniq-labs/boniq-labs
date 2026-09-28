import Service from '../models/Service.js';

const formatService = (service) => ({
  ...service.toJSON(),
  _id: service.id
});

export const getServices = async (req, res) => {
  try {
    const { published } = req.query;
    const where = {};
    if (published !== undefined) {
      where.published = published === 'true';
    }
    const services = await Service.findAll({
      where,
      order: [['order', 'ASC']]
    });
    res.json(services.map(formatService));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (service) {
      res.json(formatService(service));
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(formatService(service));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (service) {
      Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
          service[key] = req.body[key];
        }
      });
      await service.save();
      res.json(formatService(service));
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (service) {
      await service.destroy();
      res.json({ message: 'Service removed' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reorderServices = async (req, res) => {
  try {
    const { services } = req.body;
    await Promise.all(services.map(({ id, order }) =>
      Service.update({ order }, { where: { id } })
    ));
    const updated = await Service.findAll({
      order: [['order', 'ASC']]
    });
    res.json(updated.map(formatService));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};