import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BoardService } from '../services/board.service';
import { Board } from '../models/board.model';

@Component({
  standalone: true,
  selector: 'app-board-list',
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Boards</h2>
    <button (click)="createBoard()">Neues Board</button>

    <ul>
      <li *ngFor="let board of boards" (click)="openBoard(board.id)">
        {{ board.title }} ({{ board.id }})
      </li>
    </ul>
  `,
  styles: [``]
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
      this.boards = this.boardService.getBoards(); // Refresh
    }
  }

  openBoard(boardId: string) {
    this.router.navigate(['/board', boardId]);
  }
}
