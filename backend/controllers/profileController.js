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

    const { name, greeting, role, bio, avatarUrl, cvUrl, whatsapp, linkedin, instagram, logoUrl, siteUrl } = req.body;

    profile.name = name !== undefined ? name : profile.name;
    profile.greeting = greeting !== undefined ? greeting : profile.greeting;
    profile.role = role !== undefined ? role : profile.role;
    profile.bio = bio !== undefined ? bio : profile.bio;
    profile.avatarUrl = avatarUrl !== undefined ? avatarUrl : profile.avatarUrl;
    profile.cvUrl = cvUrl !== undefined ? cvUrl : profile.cvUrl;
    profile.whatsapp = whatsapp !== undefined ? whatsapp : profile.whatsapp;
    profile.linkedin = linkedin !== undefined ? linkedin : profile.linkedin;
    profile.instagram = instagram !== undefined ? instagram : profile.instagram;
    profile.logoUrl = logoUrl !== undefined ? logoUrl : profile.logoUrl;
    profile.siteUrl = siteUrl !== undefined ? siteUrl : profile.siteUrl;

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
