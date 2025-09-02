import Tour from '../models/Tour.js';
// @route   GET /api/filters/countries
export const getDistinctCountries = async (req, res) => {
    try {
        const countries = await Tour.distinct("country");
        res.status(200).json(countries.filter(Boolean)); // Remove null/empty values
    } catch (err) {
        console.error("Error fetching countries:", err);
        res.status(500).json({ message: "Failed to fetch countries" });
    }
};

// @route   GET /api/filters/states/:country    
export const getStatesByCountry = async (req, res) => {
    const country = req.params.country;
    try {
        const states = await Tour.find({ country }).distinct("state");
        res.status(200).json(states.filter(Boolean));
    } catch (err) {
        console.error("Error fetching states:", err);
        res.status(500).json({ message: "Failed to fetch states" });
    }
};

// Get tour by State

export const getTourByState = async (req, res) => {
    try {
        const { stateName } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const regex = new RegExp(state.replace(/-/g, " "), "i");
        const tours = await Tour.find({ state: regex })
            .skip((page - 1) * limit)
            .limit(limit);
        const total = await Tour.countDocuments({ state: regex });
        res.status(200).json({
            success: true,
            count: tours.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: tours,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}