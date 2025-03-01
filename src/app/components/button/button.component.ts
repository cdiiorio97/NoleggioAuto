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

/*   applyHoverStyle(): void {
    if (!this.disabled && this.actionRichiesta) {
      this.actionRichiesta.css['background-color'] = this.adjustColorBrightness(this.cssOriginale['background-color'], -10);
    }
  }

  removeHoverStyle(): void {
    if(this.actionRichiesta)
      this.actionRichiesta.css['background-color'] = this.cssOriginale['background-color'];
  }

  private adjustColorBrightness(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + 
                              (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + 
                              (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1).toUpperCase();
  } */
}
