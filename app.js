const  MOVIES = [ < font > </ font > 
  { id : "m1" , sarlavha : "Tungi shahar" , yil : 2026 , reyting : 8.7 , janr : "Jangari" , davomiyligi : "2 soat 06 daqiqa" }, < font > </ font > 
  { id : "m2" , sarlavha : "Qorli izlar" , yil : 2025 , reyting : 8.1 , janr : "Drama" , davomiyligi : "1 soat 52 daqiqa" }, < font > </ font > 
  { id : "m3" , sarlavha : "Kometa 9" , yil : 2026 , reyting : 7.9 , janr : "Ilmiy fantastika" , davomiyligi : "2 soat 18 daqiqa" }, < font > </ font > 
  { id : "m4" , sarlavha : "Kulgi Ustasi" , yil : 2024 , reyting : 7.4 , janr : "Komediya" , davomiyligi : "1 soat 40 daqiqa" }, < font > </ font > 
  { id : "m5" , sarlavha : "Sirli Xat" , yil : 2025 , reyting : 8.3 , janr : "Triller" , davomiyligi : "1 soat 58 daqiqa" }, < font > </ font > 
  { id : "m6" , sarlavha :"Qalb Ritmi" , yil : 2026 , reyting : 7,8 , janr: "Romantika" , davomiyligi : "2 soat 02 daqiqa" }, < font > </ font > 
  { id : "m7" , sarlavhasi : "Qorovul" , yil : 2024 , reyting : 7.6 , janr : "Jangari" , davomiyligi : "1 soat 46 daqiqa" }, < font > </ font > 
  { id : "m8" , sarlavhasi : "Sokin dengiz" , yil : 2025 , reyting : 8.0 , janr : "Drama" , davomiyligi : "2 soat 11 daqiqa" }<font></font>] 
; < font > </ font > 
< font > </ font >
 funksiyasi  getMovieById ( id ){ < font > </ font >
   return  MOVIES.find ( m = > m.id === id ); < font > </ font >
}<font></font>
< font > </ font >
 function  movieCard ( movie ){ < font > </ font >
   return  `<font></font><a class="movie" href="movie.html?id= ${ encodeURIComponent (movie.id)} " aria-label=" ${movie.title} ">
   <font></font>
    <div class="poster"></div><font></font>
    <div class="movie-body"><font></font>
      <div class="movie-title"> ${escapeHtml(movie.title)} </div><font></font>
      <div class="meta"><font></font>
        <span class="badge"> ${movie.genre} </span><font></font>
        <span class="badge"> ${movie.year} </span><font></font>
        <span class="badge">⭐ ${movie.rating} </span><font></font>
      </div><font></font>
    </div><font></font>
  </a>` ; < shrift > </ shrift >
}<font></font>
< font > </ font >
 funksiyasi  renderGrid ( el, movies ){ < font > </ font > 
  el.innerHTML= movies.map ( movieCard) .join ( "" ); < font > </ font >
}<font></font>
< font > </ font >
 function  escapeHtml ( str ){ < font > </ font >
   return  String (str)<font></font>
    . replaceAll ( "&" , "&" )<font></font>
    . replaceAll ( "<" , "<" )<font></font>
    . replaceAll ( ">" , ">" )<font></font>
    . replaceAll ( '"' , "" ")<font></font>
    .replaceAll(" '","'");<font></font>
}<font></font>
<shrift></shrift>
function qs(name){<font></font>
  const url = yangi URL(window.location.href);<font></font>
  return url.searchParams.get(name);<font></font>
}<font></font>
<shrift></shrift>
function initYear(){<font></font>
  const el = document.getElementById("yil");<font></font>
  agar(el) el.textContent = String(new Date().getFullYear());<font></font>
}<font></font>
<shrift></shrift>
funksiya initHome(){<font></font>
  const grid1 = document.getElementById("trendGrid");<font></font>
  const grid2 = document.getElementById("newGrid");<font></font>
  if(!grid1 || !grid2) return;<font></font>
<shrift></shrift>
  const trending = [...MOVIES].sort((a,b)=> b.rating - a.rating).slice(0,4);<font></font>
  const eng yangi = [...MOVIES].sort((a,b)=> b.year - a.year).slice(0,4);<font></font>
<shrift></shrift>
  renderGrid(grid1, trendda);<font></font>
  renderGrid(grid2, eng yangi);<font></font>
}<font></font>
<shrift></shrift>
initCatalog() funksiyasi {<font></font>
  const grid = document.getElementById("catalogGrid");<font></font>
  const search = document.getElementById("searchInput");<font></font>
  const genre = document.getElementById("genreSelect");<font></font>
  if(!grid || !search || !genre) return;<font></font>
<shrift></shrift>
  const genre = ["Hammasi", ...Array.from(yangi to'plam(MOVIES.map(m=>m.genre)))];<font></font>
  genre.innerHTML = genre.map(g => `<option value="${g}">${g}</option>`).join("");<font></font>
<shrift></shrift>
  funksiya apply(){<font></font>
    const q = search.value.trim().toLowerCase();<font></font>
    const g = genre.value;<font></font>
<shrift></shrift>
    const filtrlangan = MOVIES.filter(m => {<font></font>}
      const okQ = !q || m.title.toLowerCase().includes(q);<font></font>
      const okG = (g === "Hammasi") || (m.janr === g);<font></font>
      qaytish okQ && okG;<font></font>
    });<font></font>
<shrift></shrift>
    renderGrid(grid, filtrlangan);<font></font>
<shrift></shrift>
    const count = document.getElementById("resultCount");<font></font>
    if(count) count.textContent = `${filtered.length} faylini yuklab bo'lmadi`;<font></font>
  }<font></font>
<shrift></shrift>
  search.addEventListener("kiritish", qo'llash);<font></font>
  genre.addEventListener("o'zgartirish", qo'llash);<font></font>
<shrift></shrift>
  apply();<shrift></shrift>
}<font></font>
<shrift></shrift>
initMovieDetails() funksiyasi {<font></font>
  const id = qs("id");<font></font>
  const film = id? getMovieById(id): null;<font></font>
<shrift></shrift>
  const sarlavha = document.getElementById("movieSarlavhasi");<font></font>
  agar(!title) return;<font></font>
<shrift></shrift>
  agar(!film){<font></font>
    title.textContent = "Kino topilmadi";<font></font>
    const box = document.getElementById("movieBox");<font></font>
    if(box) box.innerHTML = `<p class="help">Katalogdan kino tanlab kiring.</p>`;<font></font>
    qaytarish;<font></font>
  }<font></font>
<shrift></shrift>
  sarlavha.textContent = film.sarlavha;<font></font>
<shrift></shrift>
  const meta = document.getElementById("movieMeta");<font></font>
  const desc = document.getElementById("movieDesc");<font></font>
  const btn = document.getElementById("treylerBtn");<font></font>
<shrift></shrift>
  agar(meta){<font></font>
    meta.innerHTML = `<font></font>
      <span class="badge">${movie.genre}</span><font></font>
      <span class="badge">${movie.year}</span><font></font>
      <span class="badge">⭐ ${movie.rating}</span><font></font>
      <span class="badge">${movie.duration}</span><font></font>
    `;<font></font>
  }<font></font>
<shrift></shrift>
  agar(desc){<font></font>
    desc.textContent =<font></font>
      "Bu demo chiqar. oson bosqichda men backend ulab, kinolarni API orqali (search, pagination, login, admin panel).";<font></font>
  }<font></font>
<shrift></shrift>
  agar(btn){<font></font>
    btn.addEventListener("bosish", () => {<font></font>
      const t = document.getElementById("toast");<font></font>
      agar(t){<font></font>
        t.style.display = "blok";<font></font>
        t.textContent = "Treyler (demo) ochiladi. Haqiqiy loyihada YouTube embed yoki video player qo'shamiz.";<font></font>
        setTimeout(()=> t.style.display="yo'q", 2600);<font></font>
      }<font></font>
    });<font></font>
  }<font></font>
}<font></font>
<shrift></shrift>
function initSignup(){<font></font>
  const form = document.getElementById("ro'yxatdan o'tish shakli");<font></font>
  agar(!form) qaytarsa;<font></font>
<shrift></shrift>
  form.addEventListener("yuborish", (e) => {<font></font>
    e.preventDefault();<font></font>
    const data = new FormData(form);<font></font>
    const name = String(data.get("name") || "").trim();<font></font>
    const email = String(data.get("email") || "").trim();<font></font>
    const pass = String(data.get("parol") || "").trim();<font></font>
<shrift></shrift>
    const t = document.getElementById("toast");<font></font>
    const err = [];<font></font>
<shrift></shrift>
    if(name.length < 2) err.push("Ism kamida 2 ta harf bo'lsin.");<font></font>
    if(!email.includes("@")) err.push("Email noto'g'ri ko'rinadi.");<font></font>
    if(pass.length < 6) err.push("Parol kamida 6 ta belgi bo'lsin.");<font></font>
<shrift></shrift>
    agar(t){<font></font>
      t.style.display = "blok";<font></font>
      agar(err.length){<font></font>
        t.textContent = "Xatolik: " + err.join(" ");<font></font>
        qaytarish;<font></font>
      }<font></font>
      t.textContent = "Ro'yxatdan o'tish (demo) hosil. Keyin backendga ulaymiz.";<font></font>
      form.reset();<font></font>
      setTimeout(()=> t.style.display="yo'q", 2600);<font></font>
    }<font></font>
  });<font></font>
}<font></font>
<shrift></shrift>
document.addEventListener("DOMContentYuklandi", () => {<font></font>
  initYear();<font></font>
  initHome();<font></font>
  initCatalog();<font></font>
  initMovieDetails();<font></font>
  initSignup();<font></font>
});