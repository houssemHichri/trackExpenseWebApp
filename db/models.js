import mongoose from 'mongoose';
import generator from 'mongoose-gen';
import { employees, expenses } from './json';

const { Schema } = mongoose;

const getModel = (json, name) => mongoose.model(name, new Schema(generator.convert(json)));

const EmployeesModel = getModel(employees, 'Employee');
const ExpensesModel = getModel(expenses, 'Expense');

export {
  EmployeesModel,
  ExpensesModel,
};

// const Cat = mongoose.model('Cat', { name: String });
// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
