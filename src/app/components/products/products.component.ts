import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  public getproduct: any;
  filteredProducts: any[] = [];
  searchQuery: string = '';

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getMethod();
  }

  public getMethod() {
    this.http.get('http://localhost:8081/api/products').subscribe({
      next: (response: any) => {
        console.log('Response:', response);
        this.products = response; // Assuming the response is an array of products
        this.filteredProducts = [...this.products];
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      },
      complete: () => {
        console.log('Product fetch completed.');
      }
    });
  }

  searchProducts(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }


  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.http.delete(`http://localhost:8081/api/products/${id}`).subscribe({
        next: () => {
          console.log(`Product with ID ${id} deleted successfully.`);
          this.products = this.products.filter((product) => product.id !== id); // Remove from local list
          this.searchProducts();
        },
        error: (error: any) => {
          console.error(`Error deleting product with ID ${id}:`, error);
        },
        complete: () => {
          console.log('Product deletion completed.');
        }
      });
    }
  }

}