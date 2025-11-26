import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Fruit } from '../../services/fruity.service';

@Component({
  selector: 'app-fruit-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fruit-card.component.html',
  styleUrls: ['./fruit-card.component.css'],
})
export class FruitCardComponent {
  @Input() fruit!: Fruit;
  get thumb() {
    const key = this.fruit.name.toLowerCase().replace(/\s+/g, '-');
    return `assets/fruits/${key}.jpg`;
  }
}
