import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  selector: 'app-note-edit-dialog',
  template: `
    <h2 mat-dialog-title>Notiz bearbeiten</h2>
    <mat-dialog-content>
      <textarea [(ngModel)]="tempText" rows="5" style="width:100%"></textarea>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Abbrechen</button>
      <button mat-button color="primary" (click)="save()">Speichern</button>
    </mat-dialog-actions>
  `
})
export class NoteEditDialogComponent {
  tempText: string;

  constructor(
    private dialogRef: MatDialogRef<NoteEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string }
  ) {
    // Kopie des Original-Texts, damit man Änderungen erst beim "Speichern" übernimmt
    this.tempText = data.text;
  }

  cancel() {
    this.dialogRef.close(null); // Abbrechen → schließe Dialog
  }

  save() {
    this.dialogRef.close(this.tempText); // Gebe den neuen Text zurück
  }
}
