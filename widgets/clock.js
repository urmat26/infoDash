const DAYS   = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
const MONTHS = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const ARC_LEN = 81.68;

let prevMin = -1;

function updateClock(){
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = now.getSeconds();

  if(m !== prevMin){
    document.getElementById('ch').textContent = h;
    document.getElementById('cm').textContent = m;
    prevMin = m;
  }
  document.getElementById('cs').textContent = String(s).padStart(2,'0');
  document.getElementById('secArc').style.strokeDashoffset = ARC_LEN * (s/60);

  document.getElementById('clockDate').textContent =
    `${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
  document.getElementById('clockDay').textContent = DAYS[now.getDay()];
}
