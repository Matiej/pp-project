import { Component } from '@angular/core';

@Component({
  selector: 'app-section17-pipes',
  templateUrl: './section17-pipes.component.html',
  styleUrls: ['./section17-pipes.component.css'],
})
export class Section17PipesComponent {
  filteredStatus: string = '';
  instanceFilter: string = '';
  private servers = [
    {
      instanceType: 'Small',
      name: 'Production server',
      status: 'stable',
      started: new Date(2019, 10, 1),
    },
    {
      instanceType: 'Large',
      name: 'Data base',
      status: 'offline',
      started: new Date(2020, 10, 2),
    },
    {
      instanceType: 'Medium',
      name: 'Development server',
      status: 'stable',
      started: new Date(2019, 12, 3),
    },
    {
      instanceType: 'Small',
      name: 'UAT server',
      status: 'critical',
      started: new Date(2019, 1, 4),
    },
  ];


  getFilteredServers(): any {
    if (this.filteredStatus.length < 1) {
      return this.servers;
    }
    return this.servers.filter((server) =>
      server.status.includes(this.filteredStatus)
    );
  }
  getStatusClasses(server: {
    instanceType: string;
    name: string;
    status: string;
    started: Date;
  }) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical',
    };
  }
}
