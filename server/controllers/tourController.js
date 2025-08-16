import Tour from '../models/Tour.js'

export const createTour = async (req, res) => {
    try {
        const photoPath = req.file
            ? `/uploads/${req.file.filename}`
            : req.body.photo;
        const newTour = new Tour({ ...req.body, photo: photoPath });
        const saved = await newTour.save();
        res.status(201).json({ success: true, data: saved });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Something wrong', error: e.message });
    }
}





// Update Tour


export const updateTour = async (req, res) => {
    const id = req.params.id

    try {
        const updateTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })
        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updateTour,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "failed to update",
        })
    }
}

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
export const getAllTour = async (req, res) => {
    const page = parseInt(req.query.page);
    try {
        const tours = await Tour.find({})
            .populate("reviews")
            .skip(page * 8)
            .limit(8);

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

// Get Tour by Search
// controllers/tourController.js
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