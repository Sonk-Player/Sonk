import { Component, Input } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
 
  @Input()
  text?: string = 'Sin nombre';
 
  @Input()
  route?: string;
 
}