
const recentSessionsContainer = document.getElementById("recentSessions");

async function getStudySessions() {
  return window.electronAPI.getProjects();
}

async function getUniqueTitles() {
  return window.electronAPI.getUniqueTitles();
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function timeToHours(timeString) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return hours + minutes / 60 + seconds / 3600;
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

function getTodaySessions(sessionsArray) {
  return new Date();
}

async function main() {

  let uniqueTitles = await getUniqueTitles();
  let studySessions = await getStudySessions();

  let projectSessionHashmap = new Map();

  let todaySessions = [];
  let today = new Date();

  studySessions.forEach((session) => {
    if (formatDate(session.timestamp) == formatDate(today)) {
      todaySessions.push(session);
    }

    if (!projectSessionHashmap.has(session.title)) {
      projectSessionHashmap.set(session.title, timeToHours(session.elapsedTime));

    } else {
      projectSessionHashmap.set(session.title, projectSessionHashmap.get(session.title)+ timeToHours(session.elapsedTime));
    }
  })

  let todaySessionHashmap = new Map();
  for (let x = 0; x < todaySessions.length; x++) {
    if (!todaySessionHashmap.has(todaySessions[x].title)) {
      todaySessionHashmap.set(todaySessions[x].title, timeToHours(todaySessions[x].elapsedTime));

    } else {
      todaySessionHashmap.set(todaySessions[x].title, todaySessionHashmap.get(todaySessions[x].title)+ timeToHours(todaySessions[x].elapsedTime));
    }

  }

  console.log(projectSessionHashmap);
  let totalTimePieChart = createDoughnutChart('totalTimePie', 'Total Time Studied', 'Total Study Time (Hrs)', projectSessionHashmap);
  let todayTimePieChart = createDoughnutChart('todayTimePie', 'Today Time Studied', "Today's Study Time (Hrs)", todaySessionHashmap);
  //Brings recent study sessions to the first element
  studySessions = studySessions.reverse((a, b) => a.timeStamp < b.timestamp);

  studySessions.forEach((session) => {
    const li = document.createElement('li');
    li.className = 'list-group-item py-3 px-4'; 
    const div = document.createElement('div');
    div.className = 'd-flex justify-content-between align-items-start'; 

    const leftDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const timeElapsedDiv = document.createElement('div');

    titleDiv.className = 'fw-bold text-dark'; 
    titleDiv.textContent = session.title;

    timeElapsedDiv.className = 'text-muted small'; 
    timeElapsedDiv.textContent = `${timeToHours(session.elapsedTime)} hrs`;

    leftDiv.appendChild(titleDiv);
    leftDiv.appendChild(timeElapsedDiv);

    const timestampDiv = document.createElement('div');
    timestampDiv.className = 'text-secondary small text-end'; 
    timestampDiv.textContent = formatDate(session.timestamp);

    div.appendChild(leftDiv);
    div.appendChild(timestampDiv);
    li.appendChild(div);
    recentSessionsContainer.appendChild(li);
  });

  console.log(recentSessionsContainer);
  //recentSessionsContainer.elements.toReversed();
}

main()


