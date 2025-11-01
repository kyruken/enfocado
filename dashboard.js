import { formatDate, timeToHours } from "./components/utils.js";
import { RecentSessionsContainer } from "./components/dashboard/recentSessions.js";
import { DoughnutChart } from "./components/dashboard/DoughnutChart.js";

const metricsContainer = document.getElementById("metricsContainer");

async function getStudySessions() {
  return window.electronAPI.getProjects();
}

async function getUniqueTitles() {
  return window.electronAPI.getUniqueTitles();
}

async function main() {

  let uniqueTitles = await getUniqueTitles();
  let studySessions = await getStudySessions();
  console.log(studySessions);

  let projectSessionHashmap = new Map();

  let today = new Date();

  const data = {
    labels: studySessions.filter(session => session.timestamp == today).map(session => session.title),
    datasets: [{
      label: 'Study Time(Hrs)',
      data: studySessions.map(session => timeToHours(session.elapsedTime)),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  let todayDoughnutChart = new DoughnutChart("todayTimePie", data, {});
  todayDoughnutChart.render()

  let todaySessions = [];

  studySessions = studySessions.reverse((a, b) => a.timeStamp < b.timestamp);

  const recentSessionContainer = new RecentSessionsContainer(studySessions);


}

main()


