import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['isAdmin', 'isLoggedIn']);

    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    }).compileComponents();
  });

  it('criar o app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('deve mostrar links de admin quando usuário é admin', () => {
    authService.isAdmin.and.returnValue(true);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a[routerLink="cadastro-produto"]')).toBeTruthy();
    expect(compiled.querySelector('a[routerLink="excluir-motos"]')).toBeTruthy();
  });

  it('não deve mostrar links de admin quando usuário não é admin', () => {
    authService.isAdmin.and.returnValue(false);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a[routerLink="cadastro-produto"]')).toBeFalsy();
    expect(compiled.querySelector('a[routerLink="excluir-motos"]')).toBeFalsy();
  });
});
