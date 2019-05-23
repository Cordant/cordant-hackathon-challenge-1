import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

interface SendDataModel {
  cc_emails: string[];
  email: string;
  priority: number;
  source: number;
  status: number;
  subject: string;
  due_by?: string;
  description: string;
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

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.widgetForm = new FormGroup({
      urgency: new FormControl('bert', Validators.required),
      title: new FormControl('bert', Validators.required),
      description: new FormControl(1, Validators.required)
    });
  }

  submitReport() {
    console.log(this.widgetForm.getRawValue());
    const headers = new HttpHeaders();

    headers.append('Authorization', 'Basic ' + btoa('G8g72UQ4QVMy7mV8GWl4:X'));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body: SendDataModel = {
      cc_emails: ['hackathon-user+Manager1@cordantgroup.com'],
      email: 'hackathon-user+admin-1@cordantgroup.com',
      priority: +this.widgetForm.get('urgency').value,
      source: 2,
      status: 2,
      subject: this.widgetForm.get('title').value,
      due_by: '2019-07-14T13:08:06Z',
      description: this.widgetForm.get('description').value
    };

    // var headers2 = {"Authorization": "Basic <%= iparam.name %>"};
    // var options2 = { headers: headers, body: "Hello world"};
    // var url = "https://sample.freshdesk.com/tickets.json";
    // this.httpClient.post(url, options2)

    const url = 'https://cordantgrouphelpdesk.freshservice.com/helpdesk/tickets.json'; // site that doesn’t send Access-Control-*
    this.httpClient.post(url, JSON.stringify(body), {headers}).subscribe((data) => {
      console.log('returned data');
      console.log(data);
    });
  }


  // submitReport() {
  //   console.log(this.widgetForm.getRawValue());
  //   // const headers = new HttpHeaders();
  //   //
  //   // headers.append('Authorization', 'Basic ' + btoa('G8g72UQ4QVMy7mV8GWl4:X'));
  //   // headers.append('Content-Type', 'application/json');
  //
  //   const body: SendDataModel = {
  //     cc_emails: ['hackathon-user+Manager1@cordantgroup.com'],
  //     email: 'hackathon-user+admin-1@cordantgroup.com',
  //     priority: +this.widgetForm.get('urgency').value,
  //     source: 2,
  //     status: 2,
  //     subject: this.widgetForm.get('title').value,
  //     due_by: '2019-07-14T13:08:06Z',
  //     description: this.widgetForm.get('description').value
  //   };
  //
  //   // var headers2 = {"Authorization": "Basic <%= iparam.name %>"};
  //   // var options2 = { headers: headers, body: "Hello world"};
  //   // var url = "https://sample.freshdesk.com/tickets.json";
  //   // this.httpClient.post(url, options2)
  //
  //   const url = 'https://cordantgrouphelpdesk.freshservice.com/api/v2/tickets'; // site that doesn’t send Access-Control-*
  //   this.httpClient.post(url, JSON.stringify(body), {
  //     headers: {
  //       Authorization: 'Basic ' + btoa('G8g72UQ4QVMy7mV8GWl4:X'),
  //       'Content-Type': 'application/json',
  //       'Access-Control-Max-Age': '10',
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Headers': 'X-Requested-With',
  //     }
  //   }).subscribe((data) => {
  //     console.log('returned data');
  //     console.log(data);
  //   });
  // }
}


