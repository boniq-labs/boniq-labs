import Project from '../models/Project.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    // Map id to _id for frontend compatibility
    const formattedProjects = projects.map(p => ({
      ...p.toJSON(),
      _id: p.id
    }));
    res.json(formattedProjects);
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
      res.json({ ...project.toJSON(), _id: project.id });
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
      imageUrl: req.body.imageUrl || '/images/sample.jpg',
      githubLink: req.body.githubLink || '',
      liveDemo: req.body.liveDemo || '',
      technologies: req.body.technologies || [],
    });

    res.status(201).json({ ...project.toJSON(), _id: project.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
  try {
    const { title, description, imageUrl, githubLink, liveDemo, technologies } = req.body;

    const project = await Project.findByPk(req.params.id);

    if (project) {
      project.title = title !== undefined ? title : project.title;
      project.description = description !== undefined ? description : project.description;
      project.imageUrl = imageUrl !== undefined ? imageUrl : project.imageUrl;
      project.githubLink = githubLink !== undefined ? githubLink : project.githubLink;
      project.liveDemo = liveDemo !== undefined ? liveDemo : project.liveDemo;
      project.technologies = technologies !== undefined ? technologies : project.technologies;

      await project.save();
      res.json({ ...project.toJSON(), _id: project.id });
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

export { getProjects, getProjectById, createProject, updateProject, deleteProject };
