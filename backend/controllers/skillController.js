import Skill from '../models/Skill.js';

const formatSkill = (skill) => ({
  ...skill.toJSON(),
  _id: skill.id
});

const getSkills = async (req, res) => {
  try {
    const { published, category } = req.query;
    const where = {};
    if (published !== undefined) {
      where.published = published === 'true';
    }
    if (category) {
      where.category = category;
    }
    const skills = await Skill.findAll({
      where,
      order: [['order', 'ASC'], ['category', 'ASC'], ['name', 'ASC']]
    });
    res.json(skills.map(formatSkill));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSkill = async (req, res) => {
  try {
    const { name, level, category, icon, description, published, order } = req.body;
    const skill = await Skill.create({ 
      name, 
      level, 
      category, 
      icon, 
      description,
      published: published !== undefined ? published : true,
      order: order || 0
    });
    res.status(201).json(formatSkill(skill));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
     const skill = await Skill.findByPk(req.params.id);
     if (skill) {
       await skill.destroy();
       res.json({ message: 'Skill removed' });
     } else {
       res.status(404).json({ message: 'Skill not found' });
     }
   } catch (err) {
       res.status(500).json({ message: err.message });
   }
};

const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (skill) {
      const allowedFields = ['name', 'level', 'category', 'icon', 'description', 'published', 'order'];
      allowedFields.forEach(key => {
        if (req.body[key] !== undefined) {
          skill[key] = req.body[key];
        }
      });
      await skill.save();
      res.json(formatSkill(skill));
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const reorderSkills = async (req, res) => {
  try {
    const { skills } = req.body; // Array of { id, order }
    await Promise.all(skills.map(({ id, order }) =>
      Skill.update({ order }, { where: { id } })
    ));
    const updated = await Skill.findAll({
      order: [['order', 'ASC'], ['category', 'ASC'], ['name', 'ASC']]
    });
    res.json(updated.map(formatSkill));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getSkills, createSkill, updateSkill, deleteSkill, reorderSkills };
