import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BoardService } from '../services/board.service';
import { Board } from '../models/board.model';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-board-list',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './board-list.component.html', // <-- wir lagern das in eine eigene HTML-Datei aus
  styleUrls: ['./board-list.component.css'] // <-- eigenes SCSS/CSS
})
export class BoardListComponent implements OnInit {
  boards: Board[] = [];

  constructor(
    private boardService: BoardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.boards = this.boardService.getBoards();
  }

  createBoard() {
    const title = prompt('Titel für das neue Board:') || '';
    if (title.trim()) {
      this.boardService.addBoard(title);
      this.boards = this.boardService.getBoards();
    }
  }

  openBoard(boardId: string) {
    this.router.navigate(['/board', boardId]);
  }
}
