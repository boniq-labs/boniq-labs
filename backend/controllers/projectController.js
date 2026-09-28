import Project from '../models/Project.js';

const formatProject = (project) => ({
  ...project.toJSON(),
  _id: project.id
});

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const { published, featured, category } = req.query;
    const where = {};
    if (published !== undefined) {
      where.published = published === 'true';
    }
    if (featured !== undefined) {
      where.featured = featured === 'true';
    }
    if (category) {
      where.category = category;
    }
    const projects = await Project.findAll({
      where,
      order: [['order', 'ASC'], ['createdAt', 'DESC']]
    });
    res.json(projects.map(formatProject));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      res.json(formatProject(project));
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title || 'Sample project',
      description: req.body.description || 'Sample description',
      shortDescription: req.body.shortDescription || '',
      imageUrl: req.body.imageUrl || '/images/sample.jpg',
      images: req.body.images || [],
      githubLink: req.body.githubLink || '',
      liveDemo: req.body.liveDemo || '',
      category: req.body.category || '',
      technologies: req.body.technologies || [],
      featured: req.body.featured || false,
      published: req.body.published !== undefined ? req.body.published : true,
      order: req.body.order || 0,
    });

    res.status(201).json(formatProject(project));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (project) {
      const allowedFields = [
        'title', 'description', 'shortDescription', 'imageUrl', 'images',
        'githubLink', 'liveDemo', 'category', 'technologies',
        'featured', 'published', 'order'
      ];
      
      allowedFields.forEach(key => {
        if (req.body[key] !== undefined) {
          project[key] = req.body[key];
        }
      });

      await project.save();
      res.json(formatProject(project));
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      await project.destroy();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Reorder projects
// @route   PUT /api/projects/reorder
// @access  Private/Admin
const reorderProjects = async (req, res) => {
  try {
    const { projects } = req.body; // Array of { id, order }
    await Promise.all(projects.map(({ id, order }) =>
      Project.update({ order }, { where: { id } })
    ));
    const updated = await Project.findAll({
      order: [['order', 'ASC'], ['createdAt', 'DESC']]
    });
    res.json(updated.map(formatProject));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getProjects, getProjectById, createProject, updateProject, deleteProject, reorderProjects };
