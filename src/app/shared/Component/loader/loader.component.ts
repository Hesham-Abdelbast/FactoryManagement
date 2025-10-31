import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../../core/shared/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports: [CommonModule],
})
export class LoaderComponent implements OnInit, OnDestroy {
  dots = Array(12);
  isLoading = false;
  private sub?: Subscription;

  constructor(public loader: LoaderService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // subscribe to loader changes
    this.sub = this.loader.isLoading$.subscribe((value) => {
      this.isLoading = value;

      // safely trigger UI update without ExpressionChanged error
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
