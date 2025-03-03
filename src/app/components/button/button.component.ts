import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MyActions } from '../my-table/my-table-config';
import { NUM_PAGINA_BUTTON } from '../../costanti';

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

  cssOriginale: any;

  iconPositionLeft: boolean = false;
  iconPositionRight: boolean = false;
  iconCentered: boolean = false;

  ngOnInit(){
    this.cssOriginale = { ...this.actionRichiesta?.css };

    if(this.number){
      this.actionRichiesta = NUM_PAGINA_BUTTON;
    } 
    else{
      if(this.actionRichiesta?.iconPosition === "left")
        this.iconPositionLeft = true;
      else if (this.actionRichiesta?.iconPosition === "right")
        this.iconPositionRight = true;
      else if(!this.actionRichiesta?.label)
        this.iconCentered = true;
      else 
        this.iconCentered = false;
    }
  }

  handleClick(){
    if(!this.disabled)
      this.onClick.emit(this.actionRichiesta?.label)
  }
}
