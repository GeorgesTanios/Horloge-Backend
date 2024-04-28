// controllers/alarmController.ts
import {Request, Response} from 'express';
import {Alarm, CreateAlarmRequest} from '../types/alarms';
import {db} from '../database';

export const createAlarm = async (req: Request<CreateAlarmRequest>, res: Response): Promise<void> => {
    // 1. Extract data from the request body
    const {time, sound, message, isActive, repeat} = req.body;
    // 2. Prepare data for insertion
    const values = [time, sound, message, isActive ? 1 : 0, repeat]; // Convert isActive to bool
    // 3. Execute the INSERT query
    db.run(
        'INSERT INTO alarms (time, sound, message, isActive, repeat) VALUES (?, ?, ?, ?, ?)',
        values,
        (err: any) => {
            if (err) {
                res.status(500).json({message: 'Error creating new alarm', error: err});
                return console.error(err);
            }
            db.get('SELECT MAX(id) as id FROM alarms', [], (err, alarmID: any) => {
                if (err) {
                    return console.error(err);
                }
                db.get('SELECT * FROM alarms WHERE id = ?', [alarmID.id], (err, alarm: any) => {
                    if (err) {
                        return console.error(err);
                    }
                    res.status(201).json({message: 'Alarm created successfully', alarm: alarm});
                })
            });

        });
};

export const getAlarms = async (req: Request, res: Response): Promise<void> => {
    db.all('SELECT * FROM alarms', [], (err, alarms: any) => {
        if (err) {
            res.status(500).json({message: 'Error fetching alarms'});
            return console.error('Error fetching alarms:', err);
        }
        res.status(200).json(alarms);
    });
};

export const getAlarmById = async (req: Request<{ id: number }>, res: Response): Promise<void> => {
    const alarmId = parseInt(String(req.params.id));
    let sql = 'SELECT * FROM alarms WHERE id = ?';
    db.get(sql, [alarmId], (err, alarm) => {
        if (err) {
            res.status(404).json({message: 'Alarm not found'});
            return console.error(err.message);
        }
        return alarm
            ? res.status(200).json(alarm)
            : console.log(`No alarm found with the id ${alarmId}`);
    });
};

export const updateAlarm = async (req: Request<{ id: number }, CreateAlarmRequest>, res: Response): Promise<void> => {
    const alarmId = req.params.id;
    const {time, sound, message, isActive, repeat} = req.body;
    // Prepare update data
    const values = [time, sound, message, isActive ? 1 : 0, repeat, alarmId];
    // Execute the UPDATE query
    db.run(
        'UPDATE alarms SET time = ?, sound = ?, message = ?, isActive = ?, repeat = ? WHERE id = ?',
        values,
        (err: any, result: any) => {
            if (err) {
                res.status(404).json({message: 'Error updating alarm', error: err});
                return console.error(err);
            }
            db.get('SELECT * FROM alarms WHERE id = ?', [alarmId], (err, alarm: any) => {
                if (err) {
                    return console.error(err);
                }
                res.status(201).json({message: 'Alarm updated successfully', alarm: alarm});
            })
        }
    );
};

export const deleteAlarm = async (req: Request<{ id: number }>, res: Response): Promise<void> => {
    const alarmId = req.params.id;
    db.run('DELETE FROM alarms WHERE id = ?',
        [alarmId],
        (err: any, result: any) => {
            if (err) {
                res.status(500).json({message: 'Error deleting new alarms', error: err});
                return console.error(err);
            }
            res.status(201).json({message: 'Alarm deleted successfully', result: result});
        }
    );
};

const getBiggestIdAlarm = (): Alarm | void => {
    db.get('SELECT MAX(id) as id FROM alarms', [], (err, alarmID: any) => {
        if (err) {
            return console.error('Error fetching alarms:', err);
        }
        console.log('the lasrt id is : ', alarmID.id);
        db.get('SELECT * FROM alarms WHERE id = ?', [alarmID.id], (err, alarm: any) => {
            if (err) {
                return console.error(err);
            }
            console.log('the new last alarm is : ', alarm);
            return alarm;
        })
    });

};
