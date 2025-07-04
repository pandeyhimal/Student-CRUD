const express = require('express');
const { connectToDB, getDB } = require('./db');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(express.json());

connectToDB().then(() => {
  const db = getDB();
  const students = db.collection('students');

  //  CREATE student
  app.post('/students', async (req, res) => {
    const student = req.body;

    // Check duplicate email
    const exists = await students.findOne({ email: student.email });
    if (exists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    try {
      const result = await students.insertOne(student);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //  READ all students
  app.get('/students', async (req, res) => {
    const all = await students.find().toArray();
    res.json(all);
  });

  //  READ one student
  app.get('/students/:id', async (req, res) => {
    try {
      const student = await students.findOne({ _id: new ObjectId(req.params.id) });
      if (!student) return res.status(404).json({ message: 'Student not found' });
      res.json(student);
    } catch {
      res.status(400).json({ message: 'Invalid ID format' });
    }
  });

  // UPDATE student
  app.put('/students/:id', async (req, res) => {
    try {
      const result = await students.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
      res.json(result);
    } catch {
      res.status(400).json({ message: 'Invalid ID format' });
    }
  });

  //  DELETE student
  app.delete('/students/:id', async (req, res) => {
    try {
      const result = await students.deleteOne({ _id: new ObjectId(req.params.id) });
      res.json(result);
    } catch {
      res.status(400).json({ message: 'Invalid ID format' });
    }
  });

  // Server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
