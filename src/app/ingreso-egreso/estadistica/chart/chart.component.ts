import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'chart-doughnut',
  templateUrl: './chart.component.html',
  styles: '',
  standalone: true,
  imports: [NgChartsModule],
})
export class ChartComponent {
  @Input({ required: true })
  labels: string[] = ['Grafica1', 'Grafica2'];

  // @Input({required:true})
  graphicType: ChartType = 'doughnut';

  @Input({ required: true })
  set dataGraph(series: number[][]) {
    const datasets = series.map((data) => ({ data }));
    this.data = {
      labels: this.labels,
      datasets,
    };
  }

  data?: ChartData<'doughnut'>;
}
