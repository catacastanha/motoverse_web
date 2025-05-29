import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirMotosComponent } from './excluir-motos.component';

describe('ExcluirMotosComponent', () => {
  let component: ExcluirMotosComponent;
  let fixture: ComponentFixture<ExcluirMotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcluirMotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcluirMotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
