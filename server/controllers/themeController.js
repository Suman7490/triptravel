import Themes from "../models/Themes.js";
import Tour from "../models/Tour.js";



// Get tour by theme
export const getToursByTheme = async (req, res) => {
    try {
        const { themeId } = req.params;

        // validate theme exists
        const theme = await Themes.findById(themeId);
        if (!theme) {
            return res.status(404).json({ success: false, message: "Theme not found" });
        }

        // find tours under that theme
        const tours = await Tour.find({ category: themeId })
            .populate("category", "name")
            .populate("reviews");

        res.status(200).json({
            success: true,
            theme: theme.name,
            count: tours.length,
            data: tours
        });
    } catch (err) {
        console.error("Error fetching tours by theme:", err);
        res.status(500).json({ success: false, message: "Failed to fetch tours" });
    }
};

// GET /api/states/:stateName/themes
export const getStateThemes = async (req, res) => {
    try {
        const { stateName } = req.params;

        // Find themes available in tours of that state
        const tours = await Tour.find({ state: stateName }).populate("theme");
        const themes = [...new Map(tours.map(t => [t.theme._id, t.theme])).values()];

        res.status(200).json({ success: true, data: themes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to fetch state themes" });
    }
};



// Create Theme
export const createTheme = async (req, res) => {
    try {
        console.log("req.file:", req.file); // will contain Cloudinary info
        console.log("req.body:", req.body);

        const photoUrl = req.file?.path; // Cloudinary returns 'path' as URL
        if (!photoUrl) {
            return res.status(400).json({ success: false, message: "Photo is required" });
        }

        const newTheme = new Themes({
            name: req.body.name,
            photo: photoUrl,
        });

        const saved = await newTheme.save();
        res.status(201).json({ success: true, data: saved });
    } catch (e) {
        console.error("Error in createTheme:", e);
        res.status(500).json({ success: false, message: e.message });
    }
};


// Get all themes
export const getThemes = async (req, res) => {
    try {
        const themes = await Themes.find();
        res.status(200).json({ success: true, data: themes });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
};

// Update theme
export const updateTheme = async (req, res) => {
    try {
        const { id } = req.params;
        const photoUrl = req.file?.path;

        const updated = await Themes.findByIdAndUpdate(
            id,
            {
                name: req.body.name,
                ...(photoUrl && { photo: photoUrl }),
            },
            { new: true }
        );

        if (!updated) return res.status(404).json({ success: false, message: "Theme not found" });

        res.status(200).json({ success: true, data: updated });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
};

// Delete theme
export const deleteTheme = async (req, res) => {
    try {
        const { id } = req.params;
        await Themes.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Theme deleted successfully" });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
};