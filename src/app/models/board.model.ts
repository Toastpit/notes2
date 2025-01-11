import { Note } from '../models/note.model';

export interface Board {
    id: string;
    title: string;
    notes: Note[];
  }
  