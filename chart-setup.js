let weatherChart = null;
let chartDailyData = null;
let currentChartType = 'line';

function updateWeatherChart(daily){
  chartDailyData = daily;
  renderChart(currentChartType);
}

function renderChart(type){
  const isDark = document.documentElement.dataset.theme==='dark';
  const gridColor = isDark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.07)';
  const textColor = isDark?'rgba(240,240,248,0.5)':'rgba(8,8,16,0.45)';
  if(!chartDailyData) return;

  const labels = chartDailyData.time.map(d=>{
    const dt = new Date(d);
    return dt.toLocaleDateString('ru',{weekday:'short',day:'numeric'});
  });

  if(weatherChart){ weatherChart.destroy(); weatherChart=null; }

  const ctx = document.getElementById('weatherChart').getContext('2d');
  weatherChart = new Chart(ctx,{
    type,
    data:{
      labels,
      datasets:[
        {label:'Макс °C',data:chartDailyData.temperature_2m_max,
         borderColor:'#f87171',backgroundColor:type==='bar'?'rgba(248,113,113,0.6)':'rgba(248,113,113,0.12)',
         tension:0.4,fill:type==='line',pointRadius:5,pointHoverRadius:8,
         pointBackgroundColor:'#f87171'},
        {label:'Мин °C',data:chartDailyData.temperature_2m_min,
         borderColor:'#60a5fa',backgroundColor:type==='bar'?'rgba(96,165,250,0.6)':'rgba(96,165,250,0.08)',
         tension:0.4,fill:type==='line',pointRadius:5,pointHoverRadius:8,
         pointBackgroundColor:'#60a5fa'},
      ]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      animation:{duration:600,easing:'easeInOutQuart'},
      plugins:{
        legend:{labels:{color:textColor,font:{family:"'Space Mono'",size:11},boxWidth:12,padding:16}}
      },
      scales:{
        x:{grid:{color:gridColor},ticks:{color:textColor,font:{family:"'Space Mono'",size:10}}},
        y:{grid:{color:gridColor},ticks:{color:textColor,font:{family:"'Space Mono'",size:10},callback:v=>v+'°'}}
      }
    }
  });
}

function switchChart(type, btn){
  currentChartType = type;
  document.querySelectorAll('.chart-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  renderChart(type);
}

function updateChartTheme(){
  if(!weatherChart||!chartDailyData) return;
  renderChart(currentChartType);
}
