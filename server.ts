import express, {Router} from 'express';
import cors from 'cors';
import alarmsRouter from './src/routes/alarms'; // Import routes file

const app = express();

// Optional middleware (e.g., body parsing)
app.use(express.json());

// give cors permission to access from this url
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Register routes
app.use('/api', alarmsRouter);

// Start the server
app.listen(3000, () => console.log('Server listening on port 3000'));
