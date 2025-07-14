import { Component, OnInit } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
 
@Component({ 
  selector: 'app-add-product', 
  imports: [FormsModule, CommonModule, ReactiveFormsModule], 
  templateUrl: './add-product.component.html', 
  styleUrl: './add-product.component.css' 
}) 
 
export class AddProductComponent { 
  product = {
    name: '',
    description: '',
    manufacturer: '',
    price: 0.00,
    quantity: 0,
  };

  constructor(private http: HttpClient, private router: Router) {}

  addProduct() {
    this.http.post('http://localhost:8081/api/products', this.product).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
        alert('Product added successfully!');
        this.router.navigate(['/products']); // Navigate to the product list page
      },
      error: (error) => {
        console.error('Error adding product:', error);
        alert('Failed to add product. Please try again.');
      },
    });
  }
  onCancel() {
    // Navigate back to the products page
    this.router.navigate(['/products']);
  }
} 