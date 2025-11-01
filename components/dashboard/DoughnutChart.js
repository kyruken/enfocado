

function prepareConfig(data, options) {

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        title: {
          display: true,
          text: options?.plugins?.title?.text || 'Study Time Distribution'
        }
      }
    }
  };

  return config;
}

export class DoughnutChart {
  constructor(chartId, data, options) {
    this.id = chartId;
    this.data = data;
    this.options = options;

    this.config = prepareConfig(this.data, this.options);
  }

  render()
  {
    return new Chart(this.id, this.config);
  }

}
