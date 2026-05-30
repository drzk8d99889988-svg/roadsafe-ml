/**
 * 交通事故安全診斷 — 核心 JavaScript
 */

// ============================================================
// Scroll Reveal
// ============================================================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// ============================================================
// Header Scroll Effect
// ============================================================
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ============================================================
// SparklesText 星星閃爍
// ============================================================
function initSparkles(containerSelector, count = 12) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const colors = ['#9E7AFF', '#FE8BBB', '#6366f1', '#818cf8', '#c4b5fd'];

  function createSparkle() {
    const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    star.setAttribute('viewBox', '0 0 21 21');
    star.setAttribute('width', '18');
    star.setAttribute('height', '18');
    star.setAttribute('class', 'sparkle-star');
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = (Math.random() * 2) + 's';
    star.style.animationDuration = (0.6 + Math.random() * 0.8) + 's';
    star.style.color = colors[Math.floor(Math.random() * colors.length)];

    star.innerHTML = `<path d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z" fill="currentColor"/>`;

    container.appendChild(star);

    // Auto-remove after animation cycle
    setTimeout(() => {
      if (star.parentNode) star.remove();
    }, 3000);
  }

  for (let i = 0; i < count; i++) {
    setTimeout(createSparkle, Math.random() * 2000);
  }
  setInterval(createSparkle, 600);
}

// ============================================================
// Chart Helpers
// ============================================================
function initBarChart(canvasId, labels, data, label, color) {
  const ctx = document.getElementById(canvasId)?.getContext('2d');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label,
        data,
        backgroundColor: color || 'rgba(99,102,241,0.7)',
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { display: false, drawBorder: false },
          ticks: { color: '#606070', font: { size: 12 } }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
          ticks: { color: '#606070', font: { size: 12 } }
        }
      }
    }
  });
}

function initLineChart(canvasId, labels, datasets) {
  const ctx = document.getElementById(canvasId)?.getContext('2d');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#a0a0b0', font: { size: 12 } } } },
      scales: {
        x: {
          grid: { display: false, drawBorder: false },
          ticks: { color: '#606070', font: { size: 12 } }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
          ticks: { color: '#606070', font: { size: 12 } }
        }
      },
      elements: {
        line: { tension: 0.4 },
        point: { radius: 3, hoverRadius: 6 }
      }
    }
  });
}

function initDoughnutChart(canvasId, labels, data, colors) {
  const ctx = document.getElementById(canvasId)?.getContext('2d');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: colors || ['#6366f1', '#818cf8', '#a5b4fc', '#c4b5fd', '#e0e7ff'],
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#a0a0b0', padding: 16, font: { size: 12 } }
        }
      }
    }
  });
}

// ============================================================
// Leaflet Map Helpers
// ============================================================
function initMap(containerId, center, zoom, hotspots) {
  const mapEl = document.getElementById(containerId);
  if (!mapEl || typeof L === 'undefined') return null;

  const map = L.map(containerId, {
    center,
    zoom,
    zoomControl: false,
    attributionControl: false
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  const colorMap = { high: '#ef4444', medium: '#f59e0b', low: '#10b981' };

  hotspots.forEach((spot) => {
    const color = colorMap[spot.level] || '#6366f1';
    const circle = L.circleMarker(spot.latlng, {
      radius: 10 + (spot.score / 10),
      fillColor: color,
      color: color,
      weight: 2,
      opacity: 0.8,
      fillOpacity: 0.5
    }).addTo(map);

    circle.bindPopup(`
      <div style="font-family:Inter,sans-serif;padding:4px;">
        <div style="font-weight:700;font-size:14px;margin-bottom:4px;">${spot.name}</div>
        <div style="font-size:12px;color:#666;">危險指數: <strong style="color:${color}">${spot.score}</strong></div>
        <div style="font-size:12px;color:#666;">主要肇因: ${spot.cause}</div>
      </div>
    `);
  });

  return map;
}

// ============================================================
// 模擬天氣 API（本地規則引擎）
// ============================================================
const WEATHER_RULES = {
  sunny:    { factor: 1.0, label: '晴', icon: 'sun' },
  cloudy:   { factor: 1.1, label: '陰', icon: 'cloud' },
  rainy:    { factor: 1.4, label: '雨', icon: 'cloud-rain' },
  storm:    { factor: 1.8, label: '暴雨', icon: 'cloud-lightning' },
  foggy:    { factor: 1.5, label: '霧', icon: 'cloud-fog' }
};

function getWeeklyForecast() {
  // 模擬一週天氣預測
  const days = ['週一','週二','週三','週四','週五','週六','週日'];
  const types = ['sunny','cloudy','rainy','rainy','cloudy','sunny','cloudy'];
  return days.map((d, i) => ({
    day: d,
    type: types[i],
    ...WEATHER_RULES[types[i]],
    tempHigh: 28 + Math.floor(Math.random() * 6),
    tempLow: 22 + Math.floor(Math.random() * 4)
  }));
}

// ============================================================
// ML 危險指數預測（本地規則引擎）
// ============================================================
const ROAD_DATA = [
  { name: '雲林路 × 中山路路口', latlng: [23.709, 120.545], baseScore: 85, accidents: 47, cause: '機車與汽車擦撞' },
  { name: '大同路路段', latlng: [23.712, 120.548], baseScore: 72, accidents: 38, cause: '追撞事故' },
  { name: '明德北路路口', latlng: [23.705, 120.540], baseScore: 68, accidents: 31, cause: '行人穿越道事故' },
  { name: '文化路 × 中正路路口', latlng: [23.708, 120.542], baseScore: 61, accidents: 26, cause: '違規左轉' },
  { name: '大學路路段', latlng: [23.715, 120.552], baseScore: 55, accidents: 22, cause: '超速' },
  { name: '成功路 × 復興路路口', latlng: [23.701, 120.538], baseScore: 48, accidents: 18, cause: '闖紅燈' },
  { name: '鎮南路路段', latlng: [23.718, 120.555], baseScore: 42, accidents: 15, cause: '迴轉不當' },
  { name: '建成路 × 林森路路口', latlng: [23.703, 120.535], baseScore: 35, accidents: 12, cause: '未保持安全距離' },
];

function predictHazardIndex(baseScore, weatherFactor, hourFactor = 1.0) {
  // 簡化預測公式：基礎分數 × 天氣因子 × 時段因子
  const raw = baseScore * weatherFactor * hourFactor;
  return Math.min(100, Math.round(raw));
}

function getLevel(score) {
  if (score >= 70) return { level: 'high', label: '高風險', color: '#ef4444' };
  if (score >= 45) return { level: 'medium', label: '中風險', color: '#f59e0b' };
  return { level: 'low', label: '低風險', color: '#10b981' };
}

function generatePredictions(weatherType = 'sunny') {
  const wf = WEATHER_RULES[weatherType];
  return ROAD_DATA.map((road) => {
    const score = predictHazardIndex(road.baseScore, wf.factor);
    const levelInfo = getLevel(score);
    return { ...road, score, ...levelInfo, weatherFactor: wf.factor };
  }).sort((a, b) => b.score - a.score);
}

function generateSuggestions(predictions) {
  const suggestions = [];
  const highRisk = predictions.filter((p) => p.level === 'high');
  const rainy = predictions.some((p) => p.weatherFactor > 1.2);

  if (highRisk.length > 0) {
    suggestions.push({
      icon: 'alert-triangle',
      title: '加強高風險路段巡邏',
      desc: `${highRisk.map((r) => r.name).join('、')} 等 ${highRisk.length} 處為高風險路段，建議增加警力巡邏頻率。`
    });
  }
  if (rainy) {
    suggestions.push({
      icon: 'cloud-rain',
      title: '雨天視線不佳提醒',
      desc: '預測期間有雨天，建議加強路面反光標線與號誌照明檢查。'
    });
  }
  suggestions.push({
    icon: 'clock',
    title: '加強尖峰時段管控',
    desc: '早晚通勤時段（07:00-09:00、17:00-19:00）事故率較高，建議設置臨時交通疏導。'
  });
  suggestions.push({
    icon: 'users',
    title: '機車族群宣導',
    desc: '機車事故佔比最高，建議加強機車安全駕駛宣導與路口禮讓觀念。'
  });

  return suggestions;
}

// ============================================================
// DOM Ready
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initHeaderScroll();
});
