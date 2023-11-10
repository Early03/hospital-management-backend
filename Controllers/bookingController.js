import Booking from '../models/BookingSchema.js'
import Doctor from '../models/DoctorSchema.js'

//get all reviews
export const getAllBookings = async (req, res) => {

    try{
        const bookings = await Booking.find({})
        
        res.status(200).json({success:true, message:'Successful', data:bookings})
        
    } catch (err) {
        res.status(404).json({success:false, message:'Not Found'})
    }
};

//create review
export const createBooking = async(req,res)=>{
    if(!req.body.doctor) req.body.doctor = req.params.doctorId
    if(!req.body.user) req.body.user = req.userId

    const newBooking = new Booking(req.body)

    try {

        const savedBooking = await newBooking.save();

        await Doctor.findByIdAndUpdate(req.body.doctor, {
        $push:{appointments: savedBooking._id}
    })

    res.status(200).json({success:true, message:'Appointment Submitted', data:savedBooking});

} catch (err){
    res.status(500).json({success:false, message: err.message });
}

}