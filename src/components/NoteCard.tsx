import React, { useState } from "react";
import { Note } from "../types/note";
import { useNoteStore } from "../store/noteStore";
import { generateSummary, generateTags } from "../services/aiService";

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const updateNote = useNoteStore((state) => state.updateNote);
  const [loading, setLoading] = useState(false);

  const handleAIProcess = async () => {
    setLoading(true);
    const summary = await generateSummary(note.content);
    const tags = await generateTags(note.content);
    updateNote(note.id, summary, tags);
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-xl mx-auto mb-4">
      <p className="text-gray-800 whitespace-pre-line mb-2">{note.content}</p>

      {note.summary && (
        <div className="text-sm text-gray-600 mb-2">
          <strong>Özet:</strong> {note.summary}
        </div>
      )}

      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {note.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <button
        onClick={handleAIProcess}
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition disabled:opacity-50"
      >
        {loading ? "İşleniyor..." : "AI ile Özetle + Etiketle"}
      </button>
    </div>
  );
};

export default NoteCard;
