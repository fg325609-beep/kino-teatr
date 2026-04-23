const MOVIES = [
  {
    id:"m1", title:"Tungi Shahar", year:2026, rating:8.7, genre:"Action", duration:"2h 06m",
    poster:"assets/m1.jpg", trailer:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    desc:"Tezkor syujet, kuchli atmosfera, va katta shahar sirlari."
  },
  {
    id:"m2", title:"Qorli Izlar", year:2025, rating:8.1, genre:"Drama", duration:"1h 52m",
    poster:"assets/m2.jpg", trailer:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    desc:"Sokin drama, chuqur dialoglar, va qishki manzara."
  },
  {
    id:"m3", title:"Kometa 9", year:2026, rating:7.9, genre:"Sci-Fi", duration:"2h 18m",
    poster:"assets/m3.jpg", trailer:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    desc:"Kosmik sarguzasht, texnologiya, va tanlovlar."
  },
  {
    id:"m4", title:"Kulgi Ustasi", year:2024, rating:7.4, genre:"Comedy", duration:"1h 40m",
    poster:"assets/m4.jpg", trailer:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    desc:"Yengil komediya, kulgili vaziyatlar, va iliq yakun."
  },
  {
    id:"m5", title:"Sirli Xat", year:2025, rating:8.3, genre:"Thriller", duration:"1h 58m",
    poster:"assets/m5.jpg", trailer:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    desc:"Sirli izlar, kutilmagan burilishlar, va keskin final."
  },
  {
    id:"m6", title:"Qalb Ritmi", year:2026, rating:7.8, genre:"Romance", duration:"2h 02m",
    poster:"assets/m6.jpg", trailer:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    desc:"Muhabbat, tanlov, va hayot ritmi haqida hikoya."
  },
  {
    id:"m7", title:"Qorovul", year:2024, rating:7.6, genre:"Action", duration:"1h 46m",
    poster:"assets/m7.jpg", trailer:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    desc:"Qorovulning bir kechasi va xavfli vaziyatlar."
  },
  {
    id:"m8", title:"Sokin Dengiz", year:2025, rating:8.0, genre:"Drama", duration:"2h 11m",
    poster:"assets/m8.jpg", trailer:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    desc:"Sokinlik ortidagi haqiqat va insoniy kechinmalar."
  }
];

const LS_KEY = "kinohub_favorites";

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

function getMovieById(id){
  return MOVIES.find(m => m.id === id);
}

function getFavs(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  }catch{
    return [];
  }
}

function setFavs(arr){
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
}

function isFav(id){
  return getFavs().includes(id);
}

function toggleFav(id){
  const favs = getFavs();
  const idx = favs.indexOf(id);
  if(idx >= 0) favs.splice(idx, 1);
  else favs.push(id);
  setFavs(favs);
  return favs.includes(id);
}

function posterDiv(movie){
  // Rasm bo‘lmasa ham gradient turadi
  const hasPoster = !!movie.poster;
  const style = hasPoster ? `style="background-image:url('${movie.poster}');"` : "";
  const cls = hasPoster ? "poster has-image" : "poster";
  return `<div class="${cls}" ${style}></div>`;
}

function movieCard(movie){
  return `
  <a class="movie" href="movie.html?id=${encodeURIComponent(movie.id)}" aria-label="${escapeHtml(movie.title)}">
    ${posterDiv(movie)}
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

function toYouTubeEmbed(url){
  // oddiy parse: v=ID
  const m = String(url || "").match(/[?&]v=([^&]+)/);
  const id = m ? m[1] : "";
  return id ? `https://www.youtube.com/embed/${id}` : "";
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
  const poster = document.getElementById("moviePoster");
  const trailerBtn = document.getElementById("trailerBtn");
  const favBtn = document.getElementById("favBtn");

  if(meta){
    meta.innerHTML = `
      <span class="badge">${escapeHtml(movie.genre)}</span>
      <span class="badge">${movie.year}</span>
      <span class="badge">⭐ ${movie.rating}</span>
      <span class="badge">${escapeHtml(movie.duration)}</span>
    `;
  }

  if(desc) desc.textContent = movie.desc || "";

  if(poster){
    if(movie.poster){
      poster.classList.add("has-image");
      poster.style.backgroundImage = `url('${movie.poster}')`;
    }
  }

  function syncFav(){
    if(!favBtn) return;
    favBtn.textContent = isFav(movie.id) ? "♥ Sevimlida" : "♡ Sevimlilar";
  }
  syncFav();

  if(favBtn){
    favBtn.addEventListener("click", () => {
      toggleFav(movie.id);
      syncFav();
      const t = document.getElementById("toast");
      if(t){
        t.style.display = "block";
        t.textContent = isFav(movie.id) ? "Sevimlilarga qo‘shildi" : "Sevimlilardan olib tashlandi";
        setTimeout(()=> t.style.display="none", 1800);
      }
    });
  }

  if(trailerBtn){
    trailerBtn.addEventListener("click", () => {
      const box = document.getElementById("trailerBox");
      const frame = document.getElementById("trailerFrame");
      if(!box || !frame) return;

      const embed = toYouTubeEmbed(movie.trailer);
      if(!embed){
        const t = document.getElementById("toast");
        if(t){
          t.style.display = "block";
          t.textContent = "Trailer link topilmadi (demo).";
          setTimeout(()=> t.style.display="none", 1800);
        }
        return;
      }

      frame.src = embed;
      box.style.display = "block";
      box.scrollIntoView({ behavior:"smooth", block:"start" });
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
      t.textContent = "Ro‘yxatdan o‘tish (demo) muvaffaqiyatli.";
      form.reset();
      setTimeout(()=> t.style.display="none", 2000);
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
