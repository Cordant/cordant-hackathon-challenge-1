import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import axios from 'axios';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import * as moment from 'moment';
import swal from 'sweetalert2';

interface SendDataModel {
  helpdesk_ticket: {
    description: string;
    subject: string;
    email: string;
    priority: number;
    due_by?: Date;
    categories?: number;
    subCategories?: number;
  };
  cc_emails: string;
}

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})

export class WidgetComponent implements OnInit {
  @ViewChild('swalReportIssue') swalReportIssue: SwalComponent;

  widgetForm: FormGroup;

  urgencies: { type: string, value: number }[] = [
    {
      type: 'urgent',
      value: 4
    },
    {
      type: 'high',
      value: 3
    },
    {
      type: 'medium',
      value: 2
    },
    {
      type: 'low',
      value: 1
    }];

  categories: { type: string, value: number }[] = [
    {
      type: 'other',
      value: 4
    },
    {
      type: 'network',
      value: 3
    },
    {
      type: 'software',
      value: 2
    },
    {
      type: 'hardware',
      value: 1
    }];

  subCategories: { type: string, value: number }[] = [
    {
      type: 'computer',
      value: 4
    },
    {
      type: 'printer',
      value: 3
    },
    {
      type: 'phone',
      value: 2
    },
    {
      type: 'peripherals',
      value: 1
    }];

  constructor() {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.widgetForm = new FormGroup({
      urgency: new FormControl(1, Validators.required),
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      categories: new FormControl(null),
      subCategories: new FormControl(null),
      dueBy: new FormControl(null)
    });
  }

  showHelper() {
    this.swalReportIssue.show();
  }

  submitReport() {
    console.log(new Date(this.widgetForm.get('dueBy').value))
    const data: SendDataModel = {
      helpdesk_ticket: {
        description: this.widgetForm.get('description').value,
        subject: 'Rush hour app - ' + this.widgetForm.get('title').value,
        email: 'hackathon-user+admin-1@cordantgroup.com',
        priority: this.widgetForm.get('urgency').value,
        due_by: new Date(this.widgetForm.get('dueBy').value)
      },
      cc_emails: 'hackathon-user+Manager1@cordantgroup.com'
    };

    const url = 'https://cordantgrouphelpdesk.freshservice.com/helpdesk/tickets.json';
    axios.post(url, data, {
      auth: {
        username: 'hackathon-user+admin-1@cordantgroup.com',
        password: 'hack-cordant-1'
      }
    }).then((returnedData) => {
      console.log('returned data');
      console.log(returnedData);
      if(returnedData.status === 200){
        swal.close();
      }
    }).catch(err => console.log(err));
  }
}


