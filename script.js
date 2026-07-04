/* ══════════════════════════════════════════════════════
   EMAILJS CONFIG  ← fill these three values in
   1. Sign up free at https://emailjs.com
   2. Create a Service (Gmail, Outlook, etc.) → copy Service ID
   3. Create an Email Template → copy Template ID
   4. Go to Account → copy your Public Key
   Your template can use these variables:
     {{activities}}, {{lunch}}, {{dinner}}, {{dessert}}, {{submitted_at}}
   ══════════════════════════════════════════════════════ */
const EMAILJS_SERVICE_ID  = 'service_lnoxmwy';
const EMAILJS_TEMPLATE_ID = 'template_zze74wu';
const EMAILJS_PUBLIC_KEY  = 'ieCBfdbPaOBxN5tB1';

/* ────── DATA ────── */
const DATA = {
  activities: [
    { emoji:'🏺', name:'Santa Cruz Clay', desc:'Paint pottery together and take home a handmade keepsake.' },
    { emoji:'🎨', name:'Petroglyph Ceramic Lounge', desc:'Choose a ceramic piece, paint it together, and pick it up after it\'s fired.' },
    { emoji:'🦈', name:'UCSC Aquarium', desc:'Meet sharks, colorful fish, octopuses, and other Monterey Bay marine life.' },
    { emoji:'🏖️', name:'Picnic on Beach', desc:'Pack your favorite snacks, relax by the ocean, and watch the sunset together.' },
    { emoji:'🦋', name:'Santa Cruz Museum of Natural History', desc:'Explore local wildlife, tide pools, fossils, and the natural history of the Central Coast.' },
    { emoji:'🕹️', name:'Boardwalk Arcade', desc:'Win prizes, play classic arcade games, and challenge each other to air hockey or skee-ball.' },
    { emoji:'⛳', name:'Mini Golf Boardwalk', desc:'Putt your way through a colorful oceanside mini golf course with friendly competition.' },
    { emoji:'🦦', name:'Monterey Bay Aquarium', desc:'Watch playful sea otters, mesmerizing jellyfish, and one of the world\'s best kelp forest exhibits.' },
  ],
  lunch: [
    { emoji:'🇧🇷', name:'Cafe Brasil', desc:'Brazilian brunch favorites like pão de queijo, açai bowls, and hearty breakfast plates.', url:'https://www.cafebrasil.us/' },
    { emoji:'🥟', name:'Chloe\'s Kitchen', desc:'Handmade dumplings, fresh noodles, and comforting Chinese home-style dishes.', url:'http://chloeskitchensc.com/' },
    { emoji:'🦞', name:'Crow\'s Nest', desc:'Fresh seafood and waterfront dining overlooking the Santa Cruz Harbor.', url:'https://crowsnest-santacruz.com/' },
    { emoji:'🌺', name:'Makai Island Kitchen & Groggery', desc:'Hawaiian-inspired plates, poke bowls, tropical cocktails, and island vibes.', url:'https://www.makaisantacruz.com/' },
    { emoji:'🌮', name:'Cafe El Palomar', desc:'Classic Mexican favorites just steps away from Twin Lakes Beach.', url:'https://www.cafeelpalomar.com/' },
    { emoji:'☕', name:'Cat & Cloud Cafe', desc:'Specialty coffee, house-roasted espresso, and delicious breakfast sandwiches.', url:'https://catandcloud.com/pages/cafe-menu' },
  ],
  dinner: [
    { emoji:'🚠', name:'ShadowBrook', desc:'Ride the iconic hillside cable car before enjoying a romantic dinner beside Soquel Creek.', url:'https://shadowbrook-capitola.com/' },
    { emoji:'🌄', name:'The View Restaurant & Bar', desc:'Watch the sunset over Monterey Bay as you share a cozy dinner with breathtaking panoramic views.', url:'https://www.chaminade.com/santa-cruz-restaurants/the-view-restaurant/' },
    { emoji:'🏡', name:'Home', desc:'Comfort food in a cozy atmosphere.', url:'https://www.homesoquel.com/' },
    { emoji:'🌿', name:'Laili Restaurant', desc:'Afghan and Mediterranean cuisine served in a beautiful garden courtyard lit with string lights.', url:'https://lailirestaurant.com/' },
    { emoji:'🍝', name:'Vim', desc:'An intimate chef-driven dining experience featuring handmade pasta and seasonal California ingredients.', url:'https://www.vimsantacruz.com/' },
    { emoji:'🍷', name:'Gabriella Café', desc:'Elegant farm-to-table cuisine showcasing fresh ingredients from local Santa Cruz farms.', url:'http://gabriellacafe.com/' },
  ],
  dessert: [
    { emoji:'🍫', name:'Chocolat', desc:'Indulge in handcrafted truffles, gourmet chocolates, and rich drinking chocolate.', url:'https://chocolatesantacruz.com/' },
    { emoji:'🥐', name:'Gayles', desc:'Browse display cases filled with cakes, pastries, cookies, and famous fruit tarts.', url:'https://www.gaylesbakery.com/' },
    { emoji:'🍨', name:'Mariannes', desc:'Choose from dozens of legendary homemade ice cream flavors unique to Santa Cruz.', url:'https://mariannesicecream.com/' },
    { emoji:'🥖', name:'The Buttery', desc:'Freshly baked pastries, cookies, croissants, and artisan desserts made daily.', url:'https://www.butterybakery.com/' },
    { emoji:'🧁', name:'Sugar Bakery', desc:'Beautiful cupcakes, cookies, and custom desserts with plenty of sweet choices.', url:'https://www.sugarbakeryco.com/' },
    { emoji:'🍦', name:'Penny Ice Creamery', desc:'Small-batch ice cream made with local ingredients and creative seasonal flavors.', url:'https://www.thepennyicecreamery.com/' },
  ],
};
 
/* ────── STATE ────── */
const state = {
  activities: new Set(),
  lunch:   null,
  dinner:  null,
  dessert: null,
};
 
/* ────── EMAILJS INIT ────── */
emailjs.init(EMAILJS_PUBLIC_KEY);
 
/* ────── SEND EMAIL TO ADMIN ────── */
async function sendAdminEmail() {
  // Guard: catch un-filled placeholders early with a clear message
  if (!EMAILJS_SERVICE_ID  || EMAILJS_SERVICE_ID  === 'YOUR_SERVICE_ID'  ||
      !EMAILJS_TEMPLATE_ID || EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
      !EMAILJS_PUBLIC_KEY  || EMAILJS_PUBLIC_KEY  === 'YOUR_PUBLIC_KEY') {
    throw new Error('EmailJS credentials not set — replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID and YOUR_PUBLIC_KEY in script.js');
  }
 
  const actNames = [...state.activities].map(i =>
    DATA.activities[i].emoji + ' ' + DATA.activities[i].name
  ).join(', ') || 'None selected';
 
  const lunch   = state.lunch   !== null ? DATA.lunch[state.lunch].emoji   + ' ' + DATA.lunch[state.lunch].name   : '—';
  const dinner  = state.dinner  !== null ? DATA.dinner[state.dinner].emoji  + ' ' + DATA.dinner[state.dinner].name  : '—';
  const dessert = state.dessert !== null ? DATA.dessert[state.dessert].emoji + ' ' + DATA.dessert[state.dessert].name : '—';
 
  const templateParams = {
    activities:   actNames,
    lunch:        lunch,
    dinner:       dinner,
    dessert:      dessert,
    submitted_at: new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' }),
  };
 
  console.log('Sending to EmailJS:', EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
  const result = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
  console.log('EmailJS response:', result);
  return result;
}
 
/* ────── SCREENS ────── */
let currentScreen = 0;
const TOTAL_SCREENS = 6;
 
function goTo(index) {
  if (index < 0 || index >= TOTAL_SCREENS) return;
  currentScreen = index;
  document.getElementById('screens').style.transform = `translateX(-${index * 100}vw)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === index));
  document.getElementById('progress-dots').style.opacity = index === 0 ? '0' : '1';
  if (index === 5) animateSummaryRows();
}
 
/* ────── BUILD GRIDS ────── */
function buildGrid(containerId, items, category, multi = false) {
  const grid = document.getElementById(containerId);
  items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'card' + (multi ? '' : ' single');
    card.style.animationDelay = `${i * 0.055}s`;
    const linkHtml = item.url ? `
      <a class="card-link" href="${item.url}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
        Learn more
      </a>` : '';
    card.innerHTML = `
      <span class="card-emoji">${item.emoji}</span>
      <div class="card-name">${item.name}</div>
      <div class="card-desc">${item.desc}</div>
      ${linkHtml}
    `;
    card.addEventListener('click', () => {
      triggerRipple(card);
      selectCard(card, category, i, multi, grid);
    });
    grid.appendChild(card);
  });
}
 
function selectCard(card, category, index, multi, grid) {
  if (multi) {
    card.classList.toggle('selected');
    if (card.classList.contains('selected')) state[category].add(index);
    else state[category].delete(index);
  } else {
    grid.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    state[category] = index;
  }
}
 
function triggerRipple(card) {
  card.classList.remove('ripple');
  void card.offsetWidth;
  card.classList.add('ripple');
  setTimeout(() => card.classList.remove('ripple'), 500);
}
 
/* ────── SUMMARY ────── */
function animateSummaryRows() {
  document.querySelectorAll('.anim-row').forEach((row, i) => {
    row.style.animationDelay = `${i * 0.1}s`;
    row.style.animation = 'none';
    void row.offsetWidth;
    row.style.animation = '';
  });
  updateSummary();
}
 
function updateSummary() {
  const actNames = [...state.activities].map(i => DATA.activities[i].emoji + ' ' + DATA.activities[i].name);
  document.getElementById('sum-activities').textContent = actNames.length ? actNames.join(', ') : '—';
 
  const lunch   = state.lunch   !== null ? DATA.lunch[state.lunch].emoji   + ' ' + DATA.lunch[state.lunch].name   : null;
  const dinner  = state.dinner  !== null ? DATA.dinner[state.dinner].emoji  + ' ' + DATA.dinner[state.dinner].name  : null;
  const dessert = state.dessert !== null ? DATA.dessert[state.dessert].emoji + ' ' + DATA.dessert[state.dessert].name : null;
 
  document.getElementById('sum-lunch').textContent   = lunch   || '—';
  document.getElementById('sum-dinner').textContent  = dinner  || '—';
  document.getElementById('sum-dessert').textContent = dessert || '—';
 
  const ready = lunch && dinner && dessert;
  document.getElementById('send-btn').disabled = !ready;
  document.getElementById('incomplete-note').style.display = ready ? 'none' : 'block';
}
 
/* ────── MODAL ────── */
function openModal() {
  const list = document.getElementById('modal-list');
  list.innerHTML = '';
  if (state.activities.size > 0) {
    const acts = [...state.activities].map(i => DATA.activities[i].emoji + ' ' + DATA.activities[i].name).join(', ');
    addModalItem(list, '🗓️', 'Activities: ' + acts, 0);
  }
  if (state.lunch   !== null) { const l  = DATA.lunch[state.lunch];     addModalItem(list, '☀️', 'Lunch: '   + l.emoji  + ' ' + l.name,  1); }
  if (state.dinner  !== null) { const d  = DATA.dinner[state.dinner];   addModalItem(list, '🌙', 'Dinner: '  + d.emoji  + ' ' + d.name,  2); }
  if (state.dessert !== null) { const ds = DATA.dessert[state.dessert]; addModalItem(list, '🍬', 'Dessert: ' + ds.emoji + ' ' + ds.name, 3); }
  document.getElementById('email-status').textContent = '';
  document.getElementById('modal').classList.add('open');
}
 
function addModalItem(list, icon, text, delay) {
  const li = document.createElement('li');
  li.style.animationDelay = `${delay * 0.1 + 0.2}s`;
  li.innerHTML = `<span>${icon}</span><span>${text}</span>`;
  list.appendChild(li);
}
 
function closeModal() {
  document.getElementById('modal').classList.remove('open');
}
 
document.getElementById('modal').addEventListener('click', e => {
  if (e.target === document.getElementById('modal')) closeModal();
});
 
/* ────── RESPOND ────── */
async function respond(yes) {
  if (!yes) {
    closeModal();
    document.getElementById('response-no').classList.add('show');
    return;
  }
 
  // Disable button and show sending state while email goes out
  const yesBtn = document.getElementById('modal-yes-btn');
  const status = document.getElementById('email-status');
  yesBtn.disabled = true;
  yesBtn.textContent = 'Sending… 💌';
  status.textContent = '';
 
  try {
    await sendAdminEmail();
    status.textContent = '';
  } catch (err) {
    console.error('EmailJS error:', err);
    // Show the real error in the modal so you can debug it
    status.style.color = '#C97F8A';
    status.textContent = '⚠️ ' + (err.text || err.message || JSON.stringify(err));
    yesBtn.disabled = false;
    yesBtn.textContent = "Yes, I'd love to! 🥰";
    return; // Don't proceed until email works
  }
 
  closeModal();
  spawnConfetti();
  document.getElementById('response-yes').classList.add('show');
}
 
/* ────── CONFETTI ────── */
function spawnConfetti() {
  const c = document.getElementById('confetti');
  c.innerHTML = '';
  const colors = ['#C97F8A','#D4A856','#7A9E7E','#EEC5CB','#F0D999','#a8c5aa','#f7b2bb'];
  for (let i = 0; i < 80; i++) {
    const dot = document.createElement('div');
    dot.className = 'confetti-dot';
    const size = 6 + Math.random() * 10;
    dot.style.cssText = `
      left:${Math.random()*100}%; top:-20px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      width:${size}px; height:${size}px;
      border-radius:${Math.random() > 0.5 ? '50%' : '3px'};
      animation-duration:${2+Math.random()*3.5}s;
      animation-delay:${Math.random()*1.5}s;
    `;
    c.appendChild(dot);
  }
}
 
/* ────── PETALS ────── */
(function spawnPetals() {
  const container = document.getElementById('petals');
  const petals = ['🌸','🌺','✿','❀','🌷'];
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = petals[Math.floor(Math.random()*petals.length)];
    p.style.cssText = `
      left:${Math.random()*100}%; top:-40px;
      font-size:${0.7+Math.random()*0.9}rem;
      animation-duration:${9+Math.random()*14}s;
      animation-delay:${Math.random()*14}s;
    `;
    container.appendChild(p);
  }
})();
 
/* ────── PARTICLE CANVAS ────── */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];
 
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
 
  function makeParticle() {
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: 1.2 + Math.random() * 2.5,
      dx: (Math.random() - 0.5) * 0.35,
      dy: -0.15 - Math.random() * 0.35,
      alpha: 0.08 + Math.random() * 0.18,
      color: ['#C97F8A','#D4A856','#7A9E7E','#EEC5CB'][Math.floor(Math.random()*4)],
    };
  }
  for (let i = 0; i < 55; i++) particles.push(makeParticle());
 
  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.y < -10) { Object.assign(p, makeParticle(), { y: H + 10 }); }
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();
 
/* ────── YES HANDLER ────── */
function onYes() {
  document.getElementById('no-btn').style.display = 'none';
  document.getElementById('hero-sub').textContent = "Yay! Now let's build the perfect date 🌸";
  setTimeout(() => goTo(1), 340);
}
 
/* ────── RUNAWAY NO ────── */
const noBtn   = document.getElementById('no-btn');
const heroSub = document.getElementById('hero-sub');
let noAttempts = 0;
 
const taunts = [
  "Are you sure? 🥺", "Think again…", "Please reconsider! 💕",
  "You can't catch me!", "Nope, not today 😄", "Haha, too slow!",
  "Keep trying 😏", "Nice try though!", "I don't think so 💨",
  "You'll say yes eventually 😇",
];
 
function growYesBtn() {
  const maxScale = 20;
  const step     = 1.5;
  const current  = parseFloat(document.getElementById('yes-btn').dataset.scale || '1');
  const next     = Math.min(maxScale, current + step);
  document.getElementById('yes-btn').dataset.scale = next;
  document.getElementById('yes-btn').style.transform = `scale(${next})`;
  document.getElementById('yes-btn').style.boxShadow =
    `0 ${4 + next * 6}px ${20 + next * 14}px rgba(201,127,138,${Math.min(0.3 + next * 0.05, 0.9)})`;
 
  // Hide the counter the moment the button starts growing — it'll be buried anyway
  const noCounter = document.getElementById('no-counter');
  if (noCounter) noCounter.style.display = 'none';
}
 
function runAway() {
  if (noAttempts === 0) {
    const r = noBtn.getBoundingClientRect();
    noBtn.style.position = 'fixed';
    noBtn.style.top      = r.top    + 'px';
    noBtn.style.left     = r.left   + 'px';
    noBtn.style.width    = r.width  + 'px';
    noBtn.style.height   = r.height + 'px';
    noBtn.style.margin   = '0';
    document.body.appendChild(noBtn);
  }
 
  noAttempts++;
 
  const margin = 16;
  const maxX = window.innerWidth  - noBtn.offsetWidth  - margin;
  const maxY = window.innerHeight - noBtn.offsetHeight - margin;
 
  noBtn.style.transition = 'top 0.25s cubic-bezier(0.34,1.56,0.64,1), left 0.25s cubic-bezier(0.34,1.56,0.64,1)';
  noBtn.style.left = (margin + Math.random() * maxX) + 'px';
  noBtn.style.top  = (margin + Math.random() * maxY) + 'px';
 
  if (noAttempts <= taunts.length) heroSub.innerHTML = taunts[noAttempts - 1];
 
  growYesBtn();
}
 
/* ────── RESET ────── */
function reset() {
  document.getElementById('response-yes').classList.remove('show');
  document.getElementById('response-no').classList.remove('show');
  state.activities.clear();
  state.lunch = state.dinner = state.dessert = null;
  document.querySelectorAll('.card.selected').forEach(c => c.classList.remove('selected'));
  noAttempts = 0;
  noBtn.style.cssText = '';
  document.getElementById('hero-buttons').appendChild(noBtn);
  noBtn.style.display = '';
  const yesBtn = document.getElementById('yes-btn');
  yesBtn.style.transform = '';
  yesBtn.style.boxShadow = '';
  yesBtn.dataset.scale = '1';
  yesBtn.disabled = false;
  yesBtn.textContent = 'Yes, absolutely! 🥰';
  document.getElementById('modal-yes-btn').disabled = false;
  document.getElementById('modal-yes-btn').textContent = 'Yes, I\'d love to! 🥰';
  document.getElementById('hero-sub').textContent = "I'd love to take you somewhere truly special. What do you say?";
  goTo(0);
}
 
/* ────── INIT ────── */
buildGrid('activities-grid', DATA.activities, 'activities', true);
buildGrid('lunch-grid',      DATA.lunch,      'lunch',      false);
buildGrid('dinner-grid',     DATA.dinner,     'dinner',     false);
buildGrid('dessert-grid',    DATA.dessert,    'dessert',    false);
goTo(0);