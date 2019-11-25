import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {

  @Input() images;
  
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  close(){
    this.modal.dismiss();
  }

}
