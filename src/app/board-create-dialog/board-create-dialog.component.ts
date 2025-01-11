import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; // <-- Wichtig!
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-board-create-dialog',
  imports: [
    CommonModule,
    FormsModule,
    // Alles, was du für das Template brauchst:
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,  // <-- HIER einfügen
  ],
  templateUrl: './board-create-dialog.component.html',
  styleUrls: ['./board-create-dialog.component.css'],
})
export class BoardCreateDialogComponent {
  boardTitle = '';

  constructor(private dialogRef: MatDialogRef<BoardCreateDialogComponent>) {}

  cancel() {
    this.dialogRef.close(null);
  }

  save() {
    this.dialogRef.close(this.boardTitle);
  }
}
