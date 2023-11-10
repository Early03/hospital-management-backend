
import express from 'express'
import { authenticate, restrict } from './../auth/verifyToken.js';
import { createBooking, getAllBookings } from '../Controllers/bookingController.js';

const router = express.Router({mergeParams: true});

router
    .route("/")
    .get(getAllBookings)
    .post(authenticate, createBooking);

export default router;