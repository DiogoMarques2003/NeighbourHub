import { app } from './app';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.listen(process.env.PORT || 3333);
