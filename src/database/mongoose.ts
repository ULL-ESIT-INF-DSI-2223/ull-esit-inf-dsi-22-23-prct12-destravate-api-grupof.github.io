import { connect } from 'mongoose';

/**
 * Función que conecta con la base de datos
 * @param url
 */
connect('mongodb://127.0.0.1:27017/student').then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});