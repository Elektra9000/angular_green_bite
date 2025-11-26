import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FruitCardComponent } from '../fruit-card/fruit-card.component';
import { Fruit, FruityService } from '../../services/fruity.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FruitCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  fruits: Fruit[] = [];
  displayedSuggested: string[] = [];

  private allSuggested = [
    'banana',
    'apple',
    'strawberry',
    'orange',
    'lemon',
    'kiwi',
    'guava',
    'plum',
    'blueberry',
    'raspberry',
    'mango',
    'pear',
    'pineapple',
    'grape',
    'cherry',
    'peach',
    'apricot',
    'melon',
  ];

  suggestCount = 6;

  loading = false;

  control = new FormControl('');
  private sub: Subscription = new Subscription();

  constructor(private fruity: FruityService, private router: Router) {}

  ngOnInit() {
    this.loadInitial();
    this.setRandomSuggested();

    this.sub = this.control.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(
          (v): v is string =>
            v !== null && typeof v === 'string' && v.trim().length > 0
        )
      )
      .subscribe((v) => this.onSearch(v.trim()));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadInitial() {
    this.loading = true;
    this.fruity.getAll().subscribe({
      next: (list) => {
        this.fruits = (list || []).slice(0, 24);
        this.loading = false;
      },
      error: () => {
        this.fruits = [];
        this.loading = false;
      },
    });
  }

  onSearch(term: string) {
    if (!term || term.trim().length === 0) return;
    this.loading = true;
    this.fruity.getByName(term).subscribe({
      next: (res) => {
        if (Array.isArray(res)) this.fruits = res;
        else if (res && res.name) this.fruits = [res];
        else this.fruits = [];
        this.loading = false;
      },
      error: () => {
        this.fruits = [];
        this.loading = false;
      },
    });
  }

  openDetail(name: string) {
    this.router.navigate(['/fruit', name]);
  }

  getThumbUrl(name: string) {
    const key = (name || 'fallback').toLowerCase().replace(/\s+/g, '-');
    return `/assets/fruits/${key}.jpg`;
  }

  onThumbError(ev: Event) {
    const img = ev.target as HTMLImageElement;
    if (!img) return;
    if (!img.dataset['fallback']) {
      img.dataset['fallback'] = '1';
      img.src = '/assets/fruits/fallback.jpg';
    }
  }

  private setRandomSuggested() {
    const shuffled = this.shuffleArray([...this.allSuggested]);
    this.displayedSuggested = shuffled.slice(0, this.suggestCount);
  }

  refreshSuggested() {
    this.setRandomSuggested();
  }

  private shuffleArray<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
