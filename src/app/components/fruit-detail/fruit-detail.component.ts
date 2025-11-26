import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Fruit, FruityService } from '../../services/fruity.service';

@Component({
  selector: 'app-fruit-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fruit-detail.component.html',
  styleUrls: ['./fruit-detail.component.css'],
})
export class FruitDetailComponent implements OnInit {
  fruit?: Fruit;

  constructor(private route: ActivatedRoute, private fruity: FruityService) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name') || '';
    if (name) {
      this.fruity.getByName(name).subscribe(
        res => {
          if (Array.isArray(res)) this.fruit = res[0] || undefined;
          else this.fruit = res;
        },
        () => this.fruit = undefined
      );
    }
  }
}
