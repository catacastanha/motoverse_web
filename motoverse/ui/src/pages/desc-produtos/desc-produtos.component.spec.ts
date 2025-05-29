import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescProdutosComponent } from './desc-produtos.component';

describe('DescProdutosComponent', () => {
  let component: DescProdutosComponent;
  let fixture: ComponentFixture<DescProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescProdutosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
