import Profile from '../models/Profile.js';

// @desc    Get profile
// @route   GET /api/profile
// @access  Public
export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update profile
// @route   PUT /api/profile
// @access  Private/Admin
export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }

    const allowedFields = [
      'name', 'greeting', 'role', 'bio', 'avatarUrl', 'cvUrl',
      'email', 'phone', 'location',
      'whatsapp', 'linkedin', 'instagram', 'github', 'twitter', 'dribbble',
      'logoUrl', 'faviconUrl', 'siteUrl',
      'seoTitle', 'seoDescription', 'seoKeywords'
    ];

    allowedFields.forEach(key => {
      if (req.body[key] !== undefined) {
        profile[key] = req.body[key];
      }
    });

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
