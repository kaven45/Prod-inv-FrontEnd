import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const testRoutes: Routes = [
    { path: 'home', component: AppComponent },
  ];

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [FormsModule], // Import necessary modules
      declarations: [AppComponent], // Declare AppComponent
      providers: [
        { provide: AuthService, useValue: authServiceSpy }, // Provide mock AuthService
        provideRouter(testRoutes), // Provide routes
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a title method that works', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const testTitle = 'Test Title';
    expect(app.title(testTitle)).toBeUndefined(); // Update if the method has a specific return type
  });

  it('should call logout method and navigate to home', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate'); // Spy on router's navigate method

    app.logout();

    expect(authServiceSpy.logout).toHaveBeenCalled(); // Check if logout was called
    expect(router.navigate).toHaveBeenCalledWith(['/home']); // Check if navigation occurred
  });
});