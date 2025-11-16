import React, { useEffect, useState } from "react";
import axios from "axios";
import  BASE_URL  from "../config";

export default function BookApiHome() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    author: "",
    genre: "",
    year: "",
    rating: "",
  });
  const [mode, setMode] = useState("add");

  // Fetch all books from backend
  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/books`);
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddBook = async () => {
    if (!formData.title || !formData.author)
      return alert("Please fill title and author");

    try {
      await axios.post(`${BASE_URL}/books`, {
        title: formData.title,
        author: formData.author,
        genre: formData.genre,
        year: formData.year,
        rating: formData.rating,
      });
      alert("✅ Book added successfully!");
      fetchBooks();
      setFormData({ id: "", title: "", author: "", genre: "", year: "", rating: "" });
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  const handleUpdateBook = async () => {
    if (!formData.id) return alert("Enter Book ID to update");

    try {
      await axios.put(`${BASE_URL}/books/${formData.id}`, {
        title: formData.title,
        author: formData.author,
        genre: formData.genre,
        year: formData.year,
        rating: formData.rating,
      });
      alert("✅ Book updated successfully!");
      fetchBooks();
      setFormData({ id: "", title: "", author: "", genre: "", year: "", rating: "" });
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  const handleDeleteBook = async () => {
    if (!formData.id) return alert("Enter Book ID to delete");

    try {
      await axios.delete(`${BASE_URL}/books/${formData.id}`);
      alert("🗑️ Book deleted successfully!");
      fetchBooks();
      setFormData({ id: "", title: "", author: "", genre: "", year: "", rating: "" });
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">📚 Book Management System</h1>

      {/* Mode Buttons */}
      <div className="flex gap-4 mb-6">
        {["add", "update", "delete"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-5 py-2 rounded-lg font-semibold ${
              mode === m ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {m === "add" && "➕ Add Book"}
            {m === "update" && "✏️ Update Book"}
            {m === "delete" && "❌ Delete Book"}
          </button>
        ))}
      </div>

      {/* Form Section */}
      <div className="bg-white shadow-md rounded-xl p-6 w-80 mb-10">
        {mode === "add" && (
          <>
            <h3 className="text-lg font-semibold mb-3 text-center">Add New Book</h3>
            {["title", "author", "genre", "year", "rating"].map((f) => (
              <input
                key={f}
                name={f}
                placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                value={formData[f]}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            ))}
            <button
              onClick={handleAddBook}
              className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2"
            >
              Add
            </button>
          </>
        )}

        {mode === "update" && (
          <>
            <h3 className="text-lg font-semibold mb-3 text-center">Update Book</h3>
            {["id", "title", "author", "genre", "year", "rating"].map((f) => (
              <input
                key={f}
                name={f}
                placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                value={formData[f]}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            ))}
            <button
              onClick={handleUpdateBook}
              className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2"
            >
              Update
            </button>
          </>
        )}

        {mode === "delete" && (
          <>
            <h3 className="text-lg font-semibold mb-3 text-center">Delete Book</h3>
            <input
              name="id"
              placeholder="Book ID"
              value={formData.id}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring focus:ring-red-200"
            />
            <button
              onClick={handleDeleteBook}
              className="w-full bg-red-600 text-white py-2 rounded-lg"
            >
              Delete
            </button>
          </>
        )}
      </div>

      {/* Display All Books */}
      <h2 className="text-2xl font-semibold mb-3">📖 All Books</h2>
      <div className="overflow-x-auto w-4/5">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-blue-100">
            <tr>
              {["ID", "Title", "Author", "Genre", "Year", "Rating"].map((head) => (
                <th key={head} className="border px-4 py-2">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((b) => (
                <tr key={b.id} className="text-center">
                  <td className="border px-4 py-2">{b.id}</td>
                  <td className="border px-4 py-2">{b.title}</td>
                  <td className="border px-4 py-2">{b.author}</td>
                  <td className="border px-4 py-2">{b.genre}</td>
                  <td className="border px-4 py-2">{b.year}</td>
                  <td className="border px-4 py-2">{b.rating}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-3">
                  No books available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
