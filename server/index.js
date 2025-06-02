import express from 'express';
import userRoutes from './routes/user.js';

const app = express();

app.use(express.json());
app.use('/user', userRoutes);

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});
