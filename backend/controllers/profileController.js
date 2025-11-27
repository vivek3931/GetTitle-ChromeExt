const Profile = require('../models/Profile');

exports.createOrUpdateProfile = async (req, res) => {
    try {
        const { name, url, about, bio, location, followerCount, connectionCount } = req.body;
        
        console.log(`Receiving data for: ${name || url}`);

        const [profile, created] = await Profile.upsert({
            name, url, about, bio, location, followerCount, connectionCount
        });

        res.status(200).json({
            message: created ? 'Profile created successfully' : 'Profile updated successfully',
            data: profile
        });
    } catch (error) {
        console.error(" Error saving profile:", error);
        res.status(500).json({ error: 'Failed to save profile data' });
    }
};

exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.findAll();
        res.json(profiles);
    } catch (error) {
        console.error(" Error fetching profiles:", error);
        res.status(500).json({ error: 'Failed to fetch profiles' });
    }
};