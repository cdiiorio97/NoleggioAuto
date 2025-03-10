import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyActions } from '../my-table/my-table-config';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() actionRichiesta?: MyActions | undefined;
  @Input() addButton?: boolean;
  @Input() disabled?: boolean;
  @Input() number?: number;
  @Output() onClick = new EventEmitter<any>();

  iconPositionLeft: boolean = false;
  iconPositionRight: boolean = false;
  iconCentered: boolean = false;

  ngOnInit(){
    if(this.actionRichiesta?.iconPosition === "left")
      this.iconPositionLeft = true;
    else if (this.actionRichiesta?.iconPosition === "right")
      this.iconPositionRight = true;
    else if(!this.actionRichiesta?.label)
      this.iconCentered = true;
    else 
      this.iconCentered = false;
  }

  handleClick(){
    if(!this.disabled)
      this.onClick.emit(this.actionRichiesta?.label)
  }
}
