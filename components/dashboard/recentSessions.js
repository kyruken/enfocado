import { formatDate, timeToHours } from "../utils.js";

export class RecentSessionsContainer {

  sessions = [];
  container = {};

  constructor(inputSessions) {

    this.sessions = inputSessions;
    this.container = document.getElementById("recentSessions"); 

    this.addAllStudySessions(inputSessions);

    

  }

  addSession(session) {
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
    this.container.appendChild(li);
  }

  addAllStudySessions(studySessionsList) {
    studySessionsList.forEach((session) => {
      this.addSession(session);
    })
  }
}

