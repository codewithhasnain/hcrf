const BadgeApplication = require('../models/BadgeApplication');

const submitBadgeApplication = async (req, res) => {
  try {
    console.log("Received form submission:", req.body); // Log the request body

    const {
      businessName,
      contactPerson,
      emailAddress,
      phoneNumber,
      businessAddress,
      badges,
      businessDescription,
      productionMethods,
      documentation,
      otherDocumentation,
      certification,
    } = req.body;

    // Debugging the parsed values
    const parsedBadges = typeof badges === 'string' ? JSON.parse(badges) : badges;
    const parsedDocumentation = typeof documentation === 'string' ? JSON.parse(documentation) : documentation;

    console.log("Parsed Badges:", parsedBadges);
    console.log("Parsed Documentation:", parsedDocumentation);

    const application = await BadgeApplication.create({
      businessName,
      contactPerson,
      emailAddress,
      phoneNumber,
      businessAddress,
      badges: parsedBadges,
      businessDescription,
      productionMethods,
      supportingDocumentation: parsedDocumentation,
      otherDocumentation,
      certification,
    });

    console.log("Application saved to database:", application);

    res.status(201).json({
      success: true,
      message: 'Badge application submitted successfully.',
      application,
    });
  } catch (error) {
    console.error("Error during application submission:", error); // Log the error
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

// Retrieve all badge applications
const getAllBadgeApplications = async (req, res) => {
  try {
    const applications = await BadgeApplication.findAll();
    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

// Retrieve a single badge application by ID
const getBadgeApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await BadgeApplication.findByPk(id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    res.status(200).json({ success: true, application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

// Update a badge application
const updateBadgeApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      businessName,
      contactPerson,
      emailAddress,
      phoneNumber,
      businessAddress,
      badges,
      businessDescription,
      productionMethods,
      documentation,
      otherDocumentation,
      certification,
    } = req.body;

    const application = await BadgeApplication.findByPk(id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    const parsedBadges = typeof badges === 'string' ? JSON.parse(badges) : badges;
    const parsedDocumentation = typeof documentation === 'string' ? JSON.parse(documentation) : documentation;

    await application.update({
      businessName,
      contactPerson,
      emailAddress,
      phoneNumber,
      businessAddress,
      badges: parsedBadges,
      businessDescription,
      productionMethods,
      supportingDocumentation: parsedDocumentation,
      otherDocumentation,
      certification,
    });

    res.status(200).json({ success: true, message: 'Application updated successfully.', application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

// Delete a badge application
const deleteBadgeApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await BadgeApplication.findByPk(id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    await application.destroy();
    res.status(200).json({ success: true, message: 'Application deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

module.exports = {
  submitBadgeApplication,
  getAllBadgeApplications,
  getBadgeApplicationById,
  updateBadgeApplication,
  deleteBadgeApplication,
};
