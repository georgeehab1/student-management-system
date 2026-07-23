import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-100 p-6 font-sans">
        <header className="w-full max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-600 mb-8">
          {/* Clicking the title now routes back to the home list */}
          <Link to="/">
            <h1 className="text-3xl font-extrabold text-slate-800 hover:text-blue-600 transition-colors">
              Student Management System
            </h1>
          </Link>
          <p className="text-slate-500 font-medium mt-1">
            Auspify Full-Stack Task Workspace
          </p>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/add" element={<AddStudent />} />
            <Route path="/edit/:id" element={<EditStudent />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}