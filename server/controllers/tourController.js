import Tour from '../models/Tour.js'

export const createTour = async (req, res) => {
    try {
        console.log("req.file:", req.file);
        console.log("req.body:", req.body);

        const photoPath = req.file ? req.file.path : req.body.photo;
        console.log("photoPath:", photoPath);

        let tourData = { ...req.body };

        // Parse nested fields
        if (tourData.bestTime) {
            try {
                tourData.bestTime = JSON.parse(tourData.bestTime);
            } catch (err) {
                console.error("Invalid bestTime JSON:", err);
            }
        }

        if (tourData.duration) {
            try {
                tourData.duration = JSON.parse(tourData.duration);
            } catch (err) {
                console.error("Invalid duration JSON:", err);
            }
        }

        if (tourData.category) {
            try {
                tourData.category = Array.isArray(tourData.category)
                    ? tourData.category
                    : [tourData.category]; // ensure it's always an array
            } catch (err) {
                console.error("Invalid category:", err);
            }
        }

        const newTour = new Tour({ ...tourData, photo: photoPath });
        const saved = await newTour.save();
        res.status(201).json({ success: true, data: saved });
    } catch (e) {
        console.error("Error in createTour:", e);
        res.status(500).json({ success: false, message: e.message });
    }
};




export const updateTour = async (req, res) => {
    const id = req.params.id;

    try {
        let updateData = { ...req.body };

        // Parse if strings
        if (typeof updateData.bestTime === "string") {
            updateData.bestTime = JSON.parse(updateData.bestTime);
        }

        if (typeof updateData.duration === "string") {
            updateData.duration = JSON.parse(updateData.duration);
        }

        if (typeof updateData.category === "string") {
            updateData.category = JSON.parse(updateData.category);
        }

        // Update photo if file uploaded
        if (req.file) {
            updateData.photo = req.file.path; // or cloudinary URL if using Cloudinary
        }

        const updatedTour = await Tour.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedTour) {
            return res.status(404).json({ success: false, message: "Tour not found" });
        }

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedTour,
        });

    } catch (err) {
        console.error("Error in updateTour:", err);
        res.status(500).json({
            success: false,
            message: "Failed to update",
            error: err.message,
        });
    }
};


// Delete Tour
export const deleteTour = async (req, res) => {
    const id = req.params.id

    try {
        await Tour.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "Successfully Deleted",
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "failed to delete",
        })
    }
}

// Get Single Tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id

    try {
        const tour = await Tour.findById(id).populate("reviews");
        res.status(200).json({
            success: true,
            message: "Successfully Deleted",
            data: tour,
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "not found",
        })
    }
}

// Get All Tour
// export const getAllTour = async (req, res) => {
//     const page = parseInt(req.query.page) || 0;
//     try {
//         const tours = await Tour.find({})
//             .populate("reviews")
//             .populate("category", "name")
//             .skip(page * 8)
//             .limit(8);

//         res.status(200).json({
//             success: true,
//             count: tours.length,
//             message: "Fatch Data Successfully",
//             data: tours
//         })
//     } catch (err) {
//         console.error("Error in getAllTour:", err);
//         res.status(404).json({
//             success: false,
//             message: "not found",
//         })
//     }
// }
export const getAllTour = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const { country, state } = req.query;

    let query = {};

    if (country) query.country = country;
    if (state) query.state = state;

    try {
        const tours = await Tour.find(query)
            .populate("reviews")
            .populate("category", "name")
            .skip(page * 8)
            .limit(8);

        res.status(200).json({
            success: true,
            count: tours.length,
            message: "Fetch Data Successfully",
            data: tours
        });
    } catch (err) {
        console.error("Error in getAllTour:", err);
        res.status(404).json({
            success: false,
            message: "not found",
        });
    }
};


// Get Tour by Search
export const getTourBySearch = async (req, res) => {
    const city = req.query.city;

    try {
        // ^ ensures city name starts with entered letters (case-insensitive)
        const tours = await Tour.find({
            city: { $regex: new RegExp("^" + city, "i") },
        }).populate("reviews");

        res.status(200).json({
            success: true,
            message: "Successful",
            data: tours,
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found",
        });
    }
};


// get featured tour
export const getFeaturedTour = async (req, res) => {
    try {
        const tours = await Tour.find({ featured: true }).populate("reviews").limit(8);


        res.status(200).json({
            success: true,
            count: tours.length,
            message: "Fatch Data Successfully",
            data: tours
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "not found",
        })
    }
}

// get tour counts
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({ success: true, data: tourCount })
    } catch (error) {
        res.status(500).json({ success: false, message: "failed to fetch" })
    }
}

