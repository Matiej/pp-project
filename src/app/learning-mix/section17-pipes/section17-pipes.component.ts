import { Component } from '@angular/core';

@Component({
  selector: 'app-section17-pipes',
  templateUrl: './section17-pipes.component.html',
  styleUrls: ['./section17-pipes.component.css']
})
export class Section17PipesComponent {
  servers = [
    {
      instanceType: 'Small',
      name: 'Production server',
      status: 'stable',
      started: new Date(10, 1 , 2019)
    },
    {
      instanceType: 'Large',
      name: 'Data base',
      status: 'offline',
      started: new Date(10, 2 , 2020)
    },
    {
      instanceType: 'Medium',
      name: 'Development server',
      status: 'stable',
      started: new Date(12, 3 , 2019)
    },
    {
      instanceType: 'Small',
      name: 'UAT server',
      status: 'stable',
      started: new Date(1, 4 , 2019)
    },
  ];

  getStatusClasses(server: {instanceType: string, name: string, status: string, started: Date}) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical'
    };
  }


}
