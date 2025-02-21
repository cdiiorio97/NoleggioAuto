import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyActions } from '../my-table/my-table-config';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() actionRichiesta: MyActions | undefined;
  @Output() onClick = new EventEmitter<any>();

  handleClick(){
    this.onClick.emit(this.actionRichiesta?.label)
  }

}
