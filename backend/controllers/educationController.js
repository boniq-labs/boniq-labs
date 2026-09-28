import Education from '../models/Education.js';

const formatEducation = (edu) => ({
  ...edu.toJSON(),
  _id: edu.id
});

export const getEducations = async (req, res) => {
  try {
    const { published } = req.query;
    const where = {};
    if (published !== undefined) {
      where.published = published === 'true';
    }
    const educations = await Education.findAll({
      where,
      order: [['order', 'ASC'], ['startDate', 'DESC']]
    });
    res.json(educations.map(formatEducation));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEducationById = async (req, res) => {
  try {
    const education = await Education.findByPk(req.params.id);
    if (education) {
      res.json(formatEducation(education));
    } else {
      res.status(404).json({ message: 'Education not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEducation = async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json(formatEducation(education));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const education = await Education.findByPk(req.params.id);
    if (education) {
      Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
          education[key] = req.body[key];
        }
      });
      await education.save();
      res.json(formatEducation(education));
    } else {
      res.status(404).json({ message: 'Education not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByPk(req.params.id);
    if (education) {
      await education.destroy();
      res.json({ message: 'Education removed' });
    } else {
      res.status(404).json({ message: 'Education not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reorderEducations = async (req, res) => {
  try {
    const { educations } = req.body;
    await Promise.all(educations.map(({ id, order }) =>
      Education.update({ order }, { where: { id } })
    ));
    const updated = await Education.findAll({
      order: [['order', 'ASC'], ['startDate', 'DESC']]
    });
    res.json(updated.map(formatEducation));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};