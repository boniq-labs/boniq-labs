import Skill from '../models/Skill.js';

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll({});
    const formattedSkills = skills.map(s => ({ ...s.toJSON(), _id: s.id }));
    res.json(formattedSkills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSkill = async (req, res) => {
  try {
    const { name, level, category, icon } = req.body;
    const skill = await Skill.create({ name, level, category, icon });
    res.status(201).json({ ...skill.toJSON(), _id: skill.id });
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
    const { name, level, category, icon } = req.body;
    const skill = await Skill.findByPk(req.params.id);
    if (skill) {
      skill.name = name !== undefined ? name : skill.name;
      skill.level = level !== undefined ? level : skill.level;
      skill.category = category !== undefined ? category : skill.category;
      skill.icon = icon !== undefined ? icon : skill.icon;
      await skill.save();
      res.json({ ...skill.toJSON(), _id: skill.id });
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getSkills, createSkill, updateSkill, deleteSkill };
