import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from 
'@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
 
@Component({ 
  selector: 'app-edit-product', 
  imports: [ReactiveFormsModule, FormsModule], 
  templateUrl: './edit-product.component.html', 
  styleUrl: './edit-product.component.css' 
}) 
export class EditProductComponent implements OnInit { 
  product = {
    id: 0,
    name: '',
    description: '',
    manufacturer: '',
    price: 0.0,
    quantity: 0
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    this.getProductById(productId);
  }

  getProductById(id: number) {
    this.http.get(`http://localhost:8081/api/products/${id}`).subscribe({
      next: (response: any) => {
        this.product = response; // Populate the form fields with the fetched product details
      },
      error: (error) => {
        console.error('Error fetching product:', error);
      }
    });
  }

  updateProduct() {
    this.http.put(`http://localhost:8081/api/products/${this.product.id}`, this.product).subscribe({
      next: () => {
        alert('Product updated successfully!');
        this.router.navigate(['/products']); // Redirect to the product list page
      },
      error: (error) => {
        console.error('Error updating product:', error);
      }
    });
  }

  onCancel() {
    // Navigate back to the products page
    this.router.navigate(['/products']);
  }
 
} 