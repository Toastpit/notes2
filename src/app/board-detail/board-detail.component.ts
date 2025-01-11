import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DragDropModule, CdkDragEnd } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BoardService } from '../services/board.service';
import { Board } from '../models/board.model';
import { Note } from '../models/note.model';
import { NoteEditDialogComponent } from '../note-edit-dialog/note-edit-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-board-detail',
  imports: [
    CommonModule,
    RouterModule,
    DragDropModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
    // evtl. mehr Material-Module (MatButtonModule etc.)
  ],
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {
  board: Board | undefined;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const boardId = this.route.snapshot.paramMap.get('id');
    if (boardId) {
      const boards = this.boardService.getBoards();
      this.board = boards.find(b => b.id === boardId);
    }
  }

  addNote() {
    if (!this.board) return;
    const text = prompt('Text für die neue Notiz:') || '';
    if (text.trim()) {
      this.boardService.addNoteToBoard(this.board.id, text);
    }
  }

  onNoteDragEnd(event: CdkDragEnd, noteId: string) {
    if (!this.board) return;
    const position = event.source.getFreeDragPosition(); 
    // => z.B. { x: 123, y: 456 }
  
    // Aktuelle Note finden und Koordinaten updaten
    const note = this.board.notes.find(n => n.id === noteId);
    if (note) {
      note.x = position.x;
      note.y = position.y;
      // Boards in localStorage speichern
      this.boardService.saveBoards(); 
    }
  }
  

  deleteNote(noteId: string) {
    if (!this.board) return;
    // Rufe den Service auf
    this.boardService.deleteNote(this.board.id, noteId);
  }

  editNote(note: Note) {
    // Dialog öffnen
    const dialogRef = this.dialog.open(NoteEditDialogComponent, {
      width: '400px', // z.B. 400px
      data: { text: note.text }
    });

    // Ergebnis abgreifen
    dialogRef.afterClosed().subscribe((newText: string | null) => {
      if (newText !== null && newText !== note.text) {
        // Im Service updaten
        this.boardService.updateNoteText(this.board!.id, note.id, newText);
      }
    });
  }
}
