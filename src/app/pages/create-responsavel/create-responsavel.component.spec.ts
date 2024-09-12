import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResponsavelComponent } from './create-responsavel.component';

describe('CreateResponsavelComponent', () => {
  let component: CreateResponsavelComponent;
  let fixture: ComponentFixture<CreateResponsavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateResponsavelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
