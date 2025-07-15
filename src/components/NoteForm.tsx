import React, { useState } from "react";
import { useNoteStore, NoteStore } from "../store/noteStore";

const NoteForm: React.FC = () => {
  const [noteText, setNoteText] = useState("");
  const addNote = useNoteStore((state: NoteStore) => state.addNote);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    addNote(noteText);
    setNoteText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-md w-full max-w-xl mx-auto mt-10"
    >
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Bir not yaz..."
        className="w-full p-3 border border-gray-300 rounded-md mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
      >
        Not Ekle
      </button>
    </form>
  );
};

export default NoteForm;
