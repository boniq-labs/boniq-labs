import Experience from '../models/Experience.js';

const formatExperience = (exp) => ({
  ...exp.toJSON(),
  _id: exp.id
});

export const getExperiences = async (req, res) => {
  try {
    const { published } = req.query;
    const where = {};
    if (published !== undefined) {
      where.published = published === 'true';
    }
    const experiences = await Experience.findAll({
      where,
      order: [['order', 'ASC'], ['startDate', 'DESC']]
    });
    res.json(experiences.map(formatExperience));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    if (experience) {
      res.json(formatExperience(experience));
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(formatExperience(experience));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    if (experience) {
      Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
          experience[key] = req.body[key];
        }
      });
      await experience.save();
      res.json(formatExperience(experience));
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    if (experience) {
      await experience.destroy();
      res.json({ message: 'Experience removed' });
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reorderExperiences = async (req, res) => {
  try {
    const { experiences } = req.body; // Array of { id, order }
    await Promise.all(experiences.map(({ id, order }) =>
      Experience.update({ order }, { where: { id } })
    ));
    const updated = await Experience.findAll({
      order: [['order', 'ASC'], ['startDate', 'DESC']]
    });
    res.json(updated.map(formatExperience));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};