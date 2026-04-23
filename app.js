const MOVIES = [<font></font>
  { id:"m1", title:"Tungi Shahar", year:2026, rating:8.7, genre:"Action", duration:"2h 06m" },<font></font>
  { id:"m2", title:"Qorli Izlar", year:2025, rating:8.1, genre:"Drama", duration:"1h 52m" },<font></font>
  { id:"m3", title:"Kometa 9", year:2026, rating:7.9, genre:"Sci-Fi", duration:"2h 18m" },<font></font>
  { id:"m4", title:"Kulgi Ustasi", year:2024, rating:7.4, genre:"Comedy", duration:"1h 40m" },<font></font>
  { id:"m5", title:"Sirli Xat", year:2025, rating:8.3, genre:"Thriller", duration:"1h 58m" },<font></font>
  { id:"m6", title:"Qalb Ritmi", year:2026, rating:7.8, genre:"Romance", duration:"2h 02m" },<font></font>
  { id:"m7", title:"Qorovul", year:2024, rating:7.6, genre:"Action", duration:"1h 46m" },<font></font>
  { id:"m8", title:"Sokin Dengiz", year:2025, rating:8.0, genre:"Drama", duration:"2h 11m" }<font></font>
];<font></font>
<font></font>
function getMovieById(id){<font></font>
  return MOVIES.find(m => m.id === id);<font></font>
}<font></font>
<font></font>
function movieCard(movie){<font></font>
  return `<font></font>
  <a class="movie" href="movie.html?id=${encodeURIComponent(movie.id)}" aria-label="${movie.title}"><font></font>
    <div class="poster"></div><font></font>
    <div class="movie-body"><font></font>
      <div class="movie-title">${escapeHtml(movie.title)}</div><font></font>
      <div class="meta"><font></font>
        <span class="badge">${movie.genre}</span><font></font>
        <span class="badge">${movie.year}</span><font></font>
        <span class="badge">⭐ ${movie.rating}</span><font></font>
      </div><font></font>
    </div><font></font>
  </a>`;<font></font>
}<font></font>
<font></font>
function renderGrid(el, movies){<font></font>
  el.innerHTML = movies.map(movieCard).join("");<font></font>
}<font></font>
<font></font>
function escapeHtml(str){<font></font>
  return String(str)<font></font>
    .replaceAll("&","&")<font></font>
    .replaceAll("<","<")<font></font>
    .replaceAll(">",">")<font></font>
    .replaceAll('"',""")<font></font>
    .replaceAll("'","&#039;");<font></font>
}<font></font>
<font></font>
function qs(name){<font></font>
  const url = new URL(window.location.href);<font></font>
  return url.searchParams.get(name);<font></font>
}<font></font>
<font></font>
function initYear(){<font></font>
  const el = document.getElementById("year");<font></font>
  if(el) el.textContent = String(new Date().getFullYear());<font></font>
}<font></font>
<font></font>
function initHome(){<font></font>
  const grid1 = document.getElementById("trendingGrid");<font></font>
  const grid2 = document.getElementById("newGrid");<font></font>
  if(!grid1 || !grid2) return;<font></font>
<font></font>
  const trending = [...MOVIES].sort((a,b)=> b.rating - a.rating).slice(0,4);<font></font>
  const newest = [...MOVIES].sort((a,b)=> b.year - a.year).slice(0,4);<font></font>
<font></font>
  renderGrid(grid1, trending);<font></font>
  renderGrid(grid2, newest);<font></font>
}<font></font>
<font></font>
function initCatalog(){<font></font>
  const grid = document.getElementById("catalogGrid");<font></font>
  const search = document.getElementById("searchInput");<font></font>
  const genre = document.getElementById("genreSelect");<font></font>
  if(!grid || !search || !genre) return;<font></font>
<font></font>
  const genres = ["All", ...Array.from(new Set(MOVIES.map(m=>m.genre)))];<font></font>
  genre.innerHTML = genres.map(g => `<option value="${g}">${g}</option>`).join("");<font></font>
<font></font>
  function apply(){<font></font>
    const q = search.value.trim().toLowerCase();<font></font>
    const g = genre.value;<font></font>
<font></font>
    const filtered = MOVIES.filter(m => {<font></font>
      const okQ = !q || m.title.toLowerCase().includes(q);<font></font>
      const okG = (g === "All") || (m.genre === g);<font></font>
      return okQ && okG;<font></font>
    });<font></font>
<font></font>
    renderGrid(grid, filtered);<font></font>
<font></font>
    const count = document.getElementById("resultCount");<font></font>
    if(count) count.textContent = `${filtered.length} ta kino topildi`;<font></font>
  }<font></font>
<font></font>
  search.addEventListener("input", apply);<font></font>
  genre.addEventListener("change", apply);<font></font>
<font></font>
  apply();<font></font>
}<font></font>
<font></font>
function initMovieDetails(){<font></font>
  const id = qs("id");<font></font>
  const movie = id ? getMovieById(id) : null;<font></font>
<font></font>
  const title = document.getElementById("movieTitle");<font></font>
  if(!title) return;<font></font>
<font></font>
  if(!movie){<font></font>
    title.textContent = "Kino topilmadi";<font></font>
    const box = document.getElementById("movieBox");<font></font>
    if(box) box.innerHTML = `<p class="help">Catalogdan kino tanlab kiring.</p>`;<font></font>
    return;<font></font>
  }<font></font>
<font></font>
  title.textContent = movie.title;<font></font>
<font></font>
  const meta = document.getElementById("movieMeta");<font></font>
  const desc = document.getElementById("movieDesc");<font></font>
  const btn = document.getElementById("trailerBtn");<font></font>
<font></font>
  if(meta){<font></font>
    meta.innerHTML = `<font></font>
      <span class="badge">${movie.genre}</span><font></font>
      <span class="badge">${movie.year}</span><font></font>
      <span class="badge">⭐ ${movie.rating}</span><font></font>
      <span class="badge">${movie.duration}</span><font></font>
    `;<font></font>
  }<font></font>
<font></font>
  if(desc){<font></font>
    desc.textContent =<font></font>
      "Bu demo. Keyingi bosqichda men backend ulab, kinolarni API orqali chiqaraman (search, pagination, login, admin panel).";<font></font>
  }<font></font>
<font></font>
  if(btn){<font></font>
    btn.addEventListener("click", () => {<font></font>
      const t = document.getElementById("toast");<font></font>
      if(t){<font></font>
        t.style.display = "block";<font></font>
        t.textContent = "Trailer (demo) ochiladi. Haqiqiy loyihada YouTube embed yoki video player qo‘shamiz.";<font></font>
        setTimeout(()=> t.style.display="none", 2600);<font></font>
      }<font></font>
    });<font></font>
  }<font></font>
}<font></font>
<font></font>
function initSignup(){<font></font>
  const form = document.getElementById("signupForm");<font></font>
  if(!form) return;<font></font>
<font></font>
  form.addEventListener("submit", (e) => {<font></font>
    e.preventDefault();<font></font>
    const data = new FormData(form);<font></font>
    const name = String(data.get("name") || "").trim();<font></font>
    const email = String(data.get("email") || "").trim();<font></font>
    const pass = String(data.get("password") || "").trim();<font></font>
<font></font>
    const t = document.getElementById("toast");<font></font>
    const err = [];<font></font>
<font></font>
    if(name.length < 2) err.push("Ism kamida 2 ta harf bo‘lsin.");<font></font>
    if(!email.includes("@")) err.push("Email noto‘g‘ri ko‘rinadi.");<font></font>
    if(pass.length < 6) err.push("Parol kamida 6 ta belgi bo‘lsin.");<font></font>
<font></font>
    if(t){<font></font>
      t.style.display = "block";<font></font>
      if(err.length){<font></font>
        t.textContent = "Xatolik: " + err.join(" ");<font></font>
        return;<font></font>
      }<font></font>
      t.textContent = "Ro‘yxatdan o‘tish (demo) muvaffaqiyatli. Keyin backendga ulaymiz.";<font></font>
      form.reset();<font></font>
      setTimeout(()=> t.style.display="none", 2600);<font></font>
    }<font></font>
  });<font></font>
}<font></font>
<font></font>
document.addEventListener("DOMContentLoaded", () => {<font></font>
  initYear();<font></font>
  initHome();<font></font>
  initCatalog();<font></font>
  initMovieDetails();<font></font>
  initSignup();<font></font>
});