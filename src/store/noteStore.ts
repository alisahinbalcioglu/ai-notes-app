import { create } from "zustand";
import { Note } from "../types/note";
import { v4 as uuidv4 } from "uuid";

export interface NoteStore {
  notes: Note[];
  addNote: (content: string) => void;
  updateNote: (id: string, summary: string, tags: string[]) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  addNote: (content) => {
    const newNote: Note = {
      id: uuidv4(),
      content,
      summary: "",
      tags: [],
    };
    set((state: NoteStore) => ({
      notes: [newNote, ...state.notes],
    }));
  },
  updateNote: (id, summary, tags) => {
    set((state: NoteStore) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, summary, tags } : note
      ),
    }));
  },
}));
