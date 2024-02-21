import express from 'express';
import prController from '../controllers/productionRecord.js';
const router = express.Router();
const { selectBike, getRecords, getAllRecords, updateStatusBike, getDatabyId } = prController;

router.post('/select-bike',selectBike);
router.get('/bike-data',getRecords);
router.get('/all_bike_data', getAllRecords);
router.post('/update_bike', updateStatusBike);
router.post('/get_bike_stg', getDatabyId);

export default router;