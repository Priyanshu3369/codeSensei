import { useState } from 'react';
import api from '../services/api';

export default function SubmitCode() {
  const [form, setForm] = useState({
    code: '',
    language: 'javascript',
    description: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const res = await api.post('/review', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage(res.data.message);
      setForm({ code: '', language: 'javascript', description: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 rounded shadow"
      >
        <h2 className="text-xl font-bold mb-4">Submit Code for Review</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-600 mb-2">{message}</p>}

        <select
          name="language"
          className="border p-2 w-full mb-3"
          value={form.language}
          onChange={handleChange}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>

        <textarea
          name="code"
          placeholder="Paste your code here..."
          className="border p-2 w-full h-40 mb-3 font-mono"
          value={form.code}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Optional description"
          className="border p-2 w-full mb-4"
          value={form.description}
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit for Review
        </button>
      </form>
    </div>
  );
}
