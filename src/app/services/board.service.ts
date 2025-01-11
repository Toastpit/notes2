import { Injectable } from '@angular/core';
import { Board } from '../models/board.model';
import { Note } from '../models/note.model';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private boards: Board[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  getBoards(): Board[] {
    return this.boards;
  }

  addBoard(title: string): Board {
    const newBoard: Board = {
      id: uuidv4(),
      title,
      notes: []
    };
    this.boards.push(newBoard);
    this.saveToLocalStorage();
    return newBoard;
  }

  saveBoards() {
    this.saveToLocalStorage();
  }
  

  addNoteToBoard(boardId: string, text: string): Note {
    const board = this.boards.find(b => b.id === boardId);
    if (!board) throw new Error('Board not found');
    const newNote: Note = {
      id: uuidv4(),
      text,
      createdAt: new Date().toDateString(),
      x: 50, // z.B. default-Position
      y: 50
    };
    board.notes.push(newNote);
    this.saveToLocalStorage();
    return newNote;
  }

  deleteNote(boardId: string, noteId: string) {
    const board = this.boards.find(b => b.id === boardId);
    if (!board) return;
  
    board.notes = board.notes.filter(n => n.id !== noteId);
    this.saveToLocalStorage();
  }
  

  // Weitere CRUD-Methoden (z.B. updateBoard, deleteBoard, etc.)

  private saveToLocalStorage() {
    localStorage.setItem('boards', JSON.stringify(this.boards));
  }

  updateNotePosition(boardId: string, noteId: string, x: number, y: number) {
    const board = this.boards.find(b => b.id === boardId);
    if (!board) return;
    const note = board.notes.find(n => n.id === noteId);
    if (!note) return;
    note.x = x;
    note.y = y;
    this.saveToLocalStorage();
  }

  updateNoteText(boardId: string, noteId: string, newText: string) {
    const board = this.boards.find(b => b.id === boardId);
    if (!board) return;
    const note = board.notes.find(n => n.id === noteId);
    if (!note) return;
    note.text = newText;
    this.saveToLocalStorage();
  }
  

  private loadFromLocalStorage() {
    const data = localStorage.getItem('boards');
    if (data) {
      this.boards = JSON.parse(data);
    }
  }
}
