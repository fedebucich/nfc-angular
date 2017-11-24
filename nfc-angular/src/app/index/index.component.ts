import { Component, OnInit } from '@angular/core';

import '../../style/app.scss';
import '../../style/custom.scss';

@Component({
  selector: 'my-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('index');
  }

}
