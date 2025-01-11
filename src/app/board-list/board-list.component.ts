import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BoardService } from '../services/board.service';
import { Board } from '../models/board.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


import { BoardCreateDialogComponent } from '../board-create-dialog/board-create-dialog.component';

@Component({
  standalone: true,
  selector: 'app-board-list',
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {
  boards: Board[] = [];

  constructor(
    private boardService: BoardService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.boards = this.boardService.getBoards();
  }

  createBoard() {
    // Öffne den Dialog
    const dialogRef = this.dialog.open(BoardCreateDialogComponent, {
      width: '400px'
    });

    // Wenn der Dialog geschlossen wird, gibt es ggf. einen Titel zurück
    dialogRef.afterClosed().subscribe((title: string | null) => {
      if (title && title.trim()) {
        this.boardService.addBoard(title);
        this.boards = this.boardService.getBoards();
      }
    });
  }

  openBoard(boardId: string) {
    this.router.navigate(['/board', boardId]);
  }
}
