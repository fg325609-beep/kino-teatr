const MOVIES = [
  { id:"m1", title:"Tungi Shahar", year:2026, rating:8.7, genre:"Action", duration:"2h 06m" },
  { id:"m2", title:"Qorli Izlar", year:2025, rating:8.1, genre:"Drama", duration:"1h 52m" },
  { id:"m3", title:"Kometa 9", year:2026, rating:7.9, genre:"Sci-Fi", duration:"2h 18m" },
  { id:"m4", title:"Kulgi Ustasi", year:2024, rating:7.4, genre:"Comedy", duration:"1h 40m" },
  { id:"m5", title:"Sirli Xat", year:2025, rating:8.3, genre:"Thriller", duration:"1h 58m" },
  { id:"m6", title:"Qalb Ritmi", year:2026, rating:7.8, genre:"Romance", duration:"2h 02m" },
  { id:"m7", title:"Qorovul", year:2024, rating:7.6, genre:"Action", duration:"1h 46m" },
  { id:"m8", title:"Sokin Dengiz", year:2025, rating:8.0, genre:"Drama", duration:"2h 11m" }
];

function getMovieById(id){
  return MOVIES.find(m => m.id === id);
}

function movieCard(movie){
  return `
  <a class="movie" href="movie.html?id=${encodeURIComponent(movie.id)}" aria-label="${escapeHtml(movie.title)}">
    <div class="poster"></div>
    <div class="movie-body">
      <div class="movie-title">${escapeHtml(movie.title)}</div>
      <div class="meta">
        <span class="badge">${escapeHtml(movie.genre)}</span>
        <span class="badge">${movie.year}</span>
        <span class="badge">⭐ ${movie.rating}</span>
      </div>
    </div>
  </a>`;
}

function renderGrid(el, movies){
  el.innerHTML = movies.map(movieCard).join("");
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&")
    .replaceAll("<","<")
    .replaceAll(">",">")
    .replaceAll('"',""")
    .replaceAll("'","&#039;");
}

function qs(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function initYear(){
  const el = document.getElementById("year");
  if(el) el.textContent = String(new Date().getFullYear());
}

function initHome(){
  const grid1 = document.getElementById("trendingGrid");
  const grid2 = document.getElementById("newGrid");
  if(!grid1 || !grid2) return;

  const trending = [...MOVIES].sort((a,b)=> b.rating - a.rating).slice(0,4);
  const newest = [...MOVIES].sort((a,b)=> b.year - a.year).slice(0,4);

  renderGrid(grid1, trending);
  renderGrid(grid2, newest);
}

function initCatalog(){
  const grid = document.getElementById("catalogGrid");
  const search = document.getElementById("searchInput");
  const genre = document.getElementById("genreSelect");
  if(!grid || !search || !genre) return;

  const genres = ["All", ...Array.from(new Set(MOVIES.map(m => m.genre)))];
  genre.innerHTML = genres.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join("");

  function apply(){
    const q = search.value.trim().toLowerCase();
    const g = genre.value;

    const filtered = MOVIES.filter(m => {
      const okQ = !q || m.title.toLowerCase().includes(q);
      const okG = (g === "All") || (m.genre === g);
      return okQ && okG;
    });

    renderGrid(grid, filtered);

    const count = document.getElementById("resultCount");
    if(count) count.textContent = `${filtered.length} ta kino topildi`;
  }

  search.addEventListener("input", apply);
  genre.addEventListener("change", apply);

  apply();
}

function initMovieDetails(){
  const id = qs("id");
  const movie = id ? getMovieById(id) : null;

  const title = document.getElementById("movieTitle");
  if(!title) return;

  if(!movie){
    title.textContent = "Kino topilmadi";
    const box = document.getElementById("movieBox");
    if(box) box.innerHTML = `<p class="help">Katalogdan kino tanlab kiring.</p>`;
    return;
  }

  title.textContent = movie.title;

  const meta = document.getElementById("movieMeta");
  const desc = document.getElementById("movieDesc");
  const btn = document.getElementById("trailerBtn");

  if(meta){
    meta.innerHTML = `
      <span class="badge">${escapeHtml(movie.genre)}</span>
      <span class="badge">${movie.year}</span>
      <span class="badge">⭐ ${movie.rating}</span>
      <span class="badge">${escapeHtml(movie.duration)}</span>
    `;
  }

  if(desc){
    desc.textContent =
      "Bu demo. Keyingi bosqichda backend ulab, kinolarni API orqali chiqaramiz (search, pagination, login, admin panel).";
  }

  if(btn){
    btn.addEventListener("click", () => {
      const t = document.getElementById("toast");
      if(t){
        t.style.display = "block";
        t.textContent = "Trailer (demo). Haqiqiy loyihada YouTube embed yoki video player qo‘shamiz.";
        setTimeout(()=> t.style.display="none", 2600);
      }
    });
  }
}

function initSignup(){
  const form = document.getElementById("signupForm");
  if(!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const pass = String(data.get("password") || "").trim();

    const t = document.getElementById("toast");
    const err = [];

    if(name.length < 2) err.push("Ism kamida 2 ta harf bo‘lsin.");
    if(!email.includes("@")) err.push("Email noto‘g‘ri ko‘rinadi.");
    if(pass.length < 6) err.push("Parol kamida 6 ta belgi bo‘lsin.");

    if(t){
      t.style.display = "block";
      if(err.length){
        t.textContent = "Xatolik: " + err.join(" ");
        return;
      }
      t.textContent = "Ro‘yxatdan o‘tish (demo) muvaffaqiyatli. Keyin backendga ulaymiz.";
      form.reset();
      setTimeout(()=> t.style.display="none", 2600);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initHome();
  initCatalog();
  initMovieDetails();
  initSignup();
});
