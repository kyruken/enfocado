import { formatDate, timeToHours } from "./components/utils.js";
import { RecentSessionsContainer } from "./components/dashboard/recentSessions.js";

// const recentSessionsContainer = document.getElementById("recentSessions");
const metricsContainer = document.getElementById("metricsContainer");

async function getStudySessions() {
  return window.electronAPI.getProjects();
}

async function getUniqueTitles() {
  return window.electronAPI.getUniqueTitles();
}

function createDoughnutChart(chartId, inputTitle, inputDatasetLabel, inputHashmap) {

  let inputLabels = [];
  let inputData = [];

  for ([key, value] of inputHashmap) {
    inputLabels.push(key);
    inputData.push(value);
  }

  const data = {
    labels: inputLabels,
    datasets: [{
      label: inputDatasetLabel || 'Study Time(Hrs)',
      data: inputData,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
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
            text: inputTitle || 'Study Time Distribution'
          }
        }
      }
    };

    const ctx = document.getElementById(chartId);
    return new Chart(ctx, config);
  }

function createMetricsBox(metricLabel, metricValue) {
  // Create main container
  const box = document.createElement('div');
  box.className = 'metric-box p-3 mb-3';

  // Title / Label
  const label = document.createElement('div');
  label.className = 'metric-label text-muted small';
  label.textContent = metricLabel;

  // Value
  const value = document.createElement('div');
  value.className = 'metric-value fw-bold';
  value.textContent = metricValue + " Hrs";

  box.appendChild(label);
  box.appendChild(value);

  return box;
}

async function main() {

  let uniqueTitles = await getUniqueTitles();
  let studySessions = await getStudySessions();

  let projectSessionHashmap = new Map();

  let todaySessions = [];
  let today = new Date();


  let todayHoursStudiedObject = 
    {
      hours: 0,
      label: "Today's Hours Studied"
    };
  let allTimeHoursStudiedObject =  
    {
      hours: 0,
      label: "All Time Studied"
    };

  // studySessions.forEach((session) => {
  //   if (formatDate(session.timestamp) == formatDate(today)) {
  //     todaySessions.push(session);
  //
  //     todayHoursStudiedObject.hours += timeToHours(session.elapsedTime);
  //   } else {
  //     allTimeHoursStudiedObject.hours += timeToHours(session.elapsedTime);
  //   }
  //
  //   if (!projectSessionHashmap.has(session.title)) {
  //     projectSessionHashmap.set(session.title, timeToHours(session.elapsedTime));
  //
  //   } else {
  //     projectSessionHashmap.set(session.title, projectSessionHashmap.get(session.title)+ timeToHours(session.elapsedTime));
  //   }
  // })
  //
  // let todaySessionHashmap = new Map();
  // for (let x = 0; x < todaySessions.length; x++) {
  //   if (!todaySessionHashmap.has(todaySessions[x].title)) {
  //     todaySessionHashmap.set(todaySessions[x].title, timeToHours(todaySessions[x].elapsedTime));
  //
  //   } else {
  //     todaySessionHashmap.set(todaySessions[x].title, todaySessionHashmap.get(todaySessions[x].title)+ timeToHours(todaySessions[x].elapsedTime));
  //   }
  //
  // }


  // let todayMetricBox = createMetricsBox(todayHoursStudiedObject.label, todayHoursStudiedObject.hours);
  // let allTimeMetricBox = createMetricsBox(allTimeHoursStudiedObject.label, allTimeHoursStudiedObject.hours);
  //
  // metricsContainer.appendChild(todayMetricBox);
  // metricsContainer.appendChild(allTimeMetricBox);

  // let totalTimePieChart = createDoughnutChart('totalTimePie', 'Total Time Studied', 'Total Study Time (Hrs)', projectSessionHashmap);
  // let todayTimePieChart = createDoughnutChart('todayTimePie', 'Today Time Studied', "Today's Study Time (Hrs)", todaySessionHashmap);
  //Brings recent study sessions to the first element
  studySessions = studySessions.reverse((a, b) => a.timeStamp < b.timestamp);

  const recentSessionContainer = new RecentSessionsContainer(studySessions);


  //recentSessionsContainer.elements.toReversed();
}

main()


