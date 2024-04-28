// routes/alarms.ts
import express, {Router} from 'express';
import {createAlarm, deleteAlarm, getAlarmById, getAlarms, updateAlarm} from '../controllers/alarmController';

const router: Router = express.Router();

// Create alarm
router.post('/alarms', createAlarm);

// Get all alarms
router.get('/alarms', getAlarms);

// Get alarm by ID
router.get('/alarms/:id', getAlarmById);

// Update alarm
router.put('/alarms/:id', updateAlarm);

// Delete alarm
router.delete('/alarms/:id', deleteAlarm);

export default router;