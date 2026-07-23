import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

// GET: Retrieve all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
});

// POST: Add a new student
router.post('/', async (req, res) => {
  try {
    const { name, studentId, major, email } = req.body;

    // Check if student ID or email already exists
    const existingStudent = await Student.findOne({ $or: [{ studentId }, { email }] });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student ID or Email already exists' });
    }

    const newStudent = new Student({
      name,
      studentId,
      major,
      email
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error saving student', error: error.message });
  }
});

// GET: Fetch a single student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error: error.message });
  }
});

// DELETE: Remove a student by ID
router.delete('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error: error.message });
  }
});

// PUT: Update an existing student by ID
router.put('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    
    // findByIdAndUpdate takes three arguments: the ID, the new data, and options
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId, 
      req.body, 
      { new: true, runValidators: true } 
    );
    
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating student', error: error.message });
  }
});

export default router;