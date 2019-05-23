import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import axios from 'axios';

interface SendDataModel {
  helpdesk_ticket: {
    description: string;
    subject: string;
    email: string;
    priority: number;
    status?: number;
  };
  cc_emails: string;
}

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})

export class WidgetComponent implements OnInit {

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
  widgetForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.widgetForm = new FormGroup({
      urgency: new FormControl(1, Validators.required),
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  submitReport() {
    const data: SendDataModel = {
      helpdesk_ticket: {
        description: this.widgetForm.get('description').value,
        subject: this.widgetForm.get('title').value,
        email: 'hackathon-user+admin-1@cordantgroup.com',
        priority: this.widgetForm.get('urgency').value
        // status: this.widgetForm.get('status').value
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
    }).catch(err => console.log(err));
  }
}


