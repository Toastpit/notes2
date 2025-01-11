import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCreateDialogComponent } from './board-create-dialog.component';

describe('BoardCreateDialogComponent', () => {
  let component: BoardCreateDialogComponent;
  let fixture: ComponentFixture<BoardCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardCreateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
