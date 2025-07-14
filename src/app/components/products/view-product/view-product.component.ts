import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
 
@Component({ 
  selector: 'app-view-product', 
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './view-product.component.html', 
  styleUrls: ['./view-product.component.css'], // ✅ Corrected 'styleUrl' to 'styleUrls' 
}) 
export class ViewProductComponent implements OnInit { 
  product: any;
  public getproduct: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id')); // ✅ Convert to number
    if (productId) {
      this.getProductById(productId); // ✅ Pass as number
    } else {
      alert('Invalid Product ID');
      this.router.navigate(['/products']);
    }
  }

  public getProductById(id: number) {
    this.http.get(`http://localhost:8081/api/products/${id}`).subscribe({
      next: (response: any) => {
        console.log('Product fetched by ID:', response);
        this.getproduct = response; // Store the fetched product in `getproduct`
      },
      error: (error: any) => {
        console.error('Error fetching product by ID:', error);
      },
      complete: () => {
        console.log('Fetch product by ID completed.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/products']);
  }
 
}