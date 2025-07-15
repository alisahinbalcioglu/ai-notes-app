import React from "react";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import { useNoteStore, NoteStore } from "../store/noteStore";
import { Note } from "../types/note";

const Home: React.FC = () => {
  const notes = useNoteStore((state: NoteStore) => state.notes);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        AI Not Uygulaması
      </h1>
      <NoteForm />
      <div className="mt-6 flex flex-col items-center">
        {notes.map((note: Note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default Home;
