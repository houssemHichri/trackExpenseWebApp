import express from 'express';
import { EmployeesModel, ExpensesModel } from '../db/models';
import db from '../db';

const router = express.Router();

/* GET home page. */
router
  .get('/employees/:id', (req, res) => {
    EmployeesModel.findOne({ _id: req.params.id }, (err, claimer) => {
      if (err) return console.log(`api server error at employees/:id : ${err}`);
      res.json({ claimer });
    });
  })
  .get('/employees', (req, res) => {
    EmployeesModel.find((err, claimers) => {
      if (err) return console.log(`api server error at /employees : ${err}`);
      res.json({ claimers });
    });
  })
  .put('/employees', (req, res) => {
    res.json({ title: 'Express' });
  })
  .post('/employees', (req, res) => {
    const { firstName, lastName } = req.body;
    const Employee = new EmployeesModel({ firstName, lastName });
    Employee.save()
      .then(ress => console.log(ress))
      .catch(err => console.log(err));
    res.json({ title: 'Express' });
  })
  .get('/expenses', (req, res) => {
    ExpensesModel.find((err, expenses) => {
      if (err) return console.log(`api server error at /expenses: ${err}`);
      res.json({ expenses });
    });
  })
  .get('/expenses/:id', (req, res) => {
    ExpensesModel.findOne({ _id: req.params.id }, (err, expense) => {
      if (err) return console.log(`api server error at GET /expenses/:id: ${err}`);
      res.json({ expense });
    });
  })
  .get('/approvedExpenses', (req, res) => {
    ExpensesModel.find({ approved: true }, (err, expenses) => {
      if (err) return console.log(`api server error at /expenses: ${err}`);
      res.json({ expenses });
    });
  })
  .put('/expenses/:id', (req, res) => {
    ExpensesModel.findOne({ _id: req.params.id }, (err, expense) => {
      if (err) return console.log(`api server error at expenses/:id : ${err}`);
      expense.set(req.body);
      expense.save((err, updated) => {
        if (err) return handleError(err);
        res.json({ expense: updated });
      });
    });
  })
  .put('/expenses/approve/:id', (req, res) => {
    ExpensesModel.findOne({ _id: req.params.id }, (err, expense) => {
      if (err) return console.log(`api server error at /expenses/approve/:id: ${err}`);
      expense.set({ approved: !expense.approved });
      expense.save((err, updated) => {
        if (err) return handleError(err);
        res.json({ expense: updated });
      });
    });
  })
  .post('/expenses', (req, res) => {
    const Expense = new ExpensesModel({ ...req.body });
    Expense.save()
      .then(ress => console.log(ress))
      .catch(err => console.log(err));
    res.json({ title: 'Express' });
  })
  .delete('/expenses/:id', (req, res) => {
    ExpensesModel.deleteOne({ _id: req.params.id }, (err) => {
      if (err) return console.log(`api server error at DELETE /expenses/:id: ${err}`);
      res.json({});
    });
  });

module.exports = router;
