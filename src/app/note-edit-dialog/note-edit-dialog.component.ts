import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  selector: 'app-note-edit-dialog',
  templateUrl: './note-edit-dialog.component.html'
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
