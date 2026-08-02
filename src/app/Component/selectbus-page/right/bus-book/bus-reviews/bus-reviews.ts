import { Component, Input,OnInit, ChangeDetectorRef,ViewEncapsulation, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../../../../../service/review';

@Component({
  selector: 'app-bus-reviews',
  standalone: false,
  templateUrl: './bus-reviews.html',
  styleUrl: './bus-reviews.css',
  encapsulation:ViewEncapsulation.None,
})
export class BusReviews {
  @Input() busId:string='';
  reviews: any[] = [];
  averageRating: number = 0;
  reviewForm!: FormGroup;
  selectedRating: number = 5;
  editingReviewId: string | null = null;
  loggedInUser: string = sessionStorage.getItem('Loggedinuser') ?? '';

  
  
  isJourneyCompleted: boolean = true; 
  isVerifiedUser: boolean = true;
  hasAlreadyReviewed: boolean = true;
  isEditMode: boolean = false;


  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private reviewService: ReviewService,
  ) {}

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(15)]]
    });
    this.loadReviews();
  }

  setRating(star: number) {
    this.selectedRating = star;
  }
  startEdit(review: any) {
  this.isEditMode = true;
  this.editingReviewId = review._id; 
  this.hasAlreadyReviewed = false; 
  
  this.reviewForm.patchValue({
    content: review.content
  });
}


isWithin24Hours(createdAt: string): boolean {
  const hours = (new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 60 * 60);
  return hours <= 24;
}

  loadReviews() {
     const loggedInUser = sessionStorage.getItem('Loggedinuser') ;
    this.reviewService.getReviewsByBus(this.busId).subscribe((res: any) => {
    this.reviews = res.reviews;
    this.averageRating = res.averageRating;
    const userReviewExists = this.reviews.some((r: any) => r.author === this.loggedInUser);
    this.hasAlreadyReviewed = userReviewExists;
    console.log("Logged In User:", this.loggedInUser);
    console.log("Review Authors:", this.reviews.map((review: any) => review.author));
    this.calculateAverage();
    this.cdr.detectChanges();
  });

   
  }

  calculateAverage() {
    const validReviews = this.reviews.filter(r => !r.isHidden);
    if (validReviews.length === 0) {
      this.averageRating = 0;
      return;
    }
    const sum = validReviews.reduce((acc, rev) => acc + rev.rating, 0);
    this.averageRating = Number((sum / validReviews.length).toFixed(1));
  }
submitReview() {
  if (this.reviewForm.valid && this.isJourneyCompleted && this.isVerifiedUser) {
    const content = this.reviewForm.value.content;
     const loggedInUser = sessionStorage.getItem('Loggedinuser');

    if (this.isEditMode && this.editingReviewId) {
      
      this.reviewService.updateReview(this.editingReviewId, content).subscribe({
        next: (response) => {
          console.log('Review updated successfully:', response);
          this.resetFormState();
          this.loadReviews();
        },
        error: (err) => {
          console.error('Error updating review:', err);
        }
      });
    } else {
      
      
      const newReview = {
        busId: this.busId,
        author: loggedInUser,
        rating: this.selectedRating,
        content: content,
        createdAt: new Date(),
        upvotes: 0
      };

      this.reviewService.addReview(newReview).subscribe({
        next: (response) => {
          console.log('Review saved to database:', response);
          this.resetFormState();
          this.loadReviews();
        },
        error: (err) => {
          console.error('Error saving review:', err);
        }
      });
    }
  }
}


resetFormState() {
  this.isEditMode = false;
  this.editingReviewId = null;
  this.hasAlreadyReviewed = true;
  this.reviewForm.reset();
  this.selectedRating = 5;
  this.cdr.detectChanges();
}

  upvoteReview(review: any) {
    review.upvotes++;
  }

  reportReview(review: any) {
    review.isHidden = true; 
    this.calculateAverage();
  }
}


