/* =========================================================
   JAVASCRIPT
   ========================================================= */

/* 1. Menu mobile */
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

/* 2. Link ativo da navbar conforme a rolagem */
const links = [...menu.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => s && spy.observe(s));

/* 3. Terminal do hero: digita o comando uma vez e mostra o resultado.
      Para editar o conteúdo, altere o objeto "profile" abaixo. */
const profile = `<span class="d">{</span>
  <span class="k">"nome"</span>: "Samuel de Oliveira Júnior",
  <span class="k">"curso"</span>: "Análise e Desenvolvimento de Sistemas",
  <span class="k">"foco"</span>: ["Analista", "desenvolvimento"],
  <span class="k">"stack"</span>: ["Java", "JavaScript", "Python", "C"],
  <span class="k">"redes"</span>: ["TCP/IP", "DNS", "DHCP", "Active Directory"],
  <span class="k">"busco"</span>: "Oportunidades de crescimento e aprendizado",
<span class="d">}</span>`;
const command = 'cat perfil.json';
const body = document.getElementById('termBody');
const cursor = '<span class="cursor"></span>';
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const prompt = '<span class="p">samuel@portfolio:~$</span> ';

if (reduce) {
  body.innerHTML = prompt + command + '\n' + profile + '\n' + prompt + cursor;
} else {
  let i = 0;
  const type = () => {
    body.innerHTML = prompt + command.slice(0, i) + cursor;
    if (i++ < command.length) return setTimeout(type, 70);
    setTimeout(() => { body.innerHTML = prompt + command + '\n' + profile + '\n' + prompt + cursor; }, 350);
  };
  setTimeout(type, 500);
}

/* 4. Ano do rodapé */
document.getElementById('year').textContent = new Date().getFullYear();


/* 5. Navbar: ganha blur/borda ao rolar a página */
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* 6. Fade-in ao rolar (IntersectionObserver).
      Sem JS ou com "reduzir movimento", o conteúdo aparece normalmente. */
if (!reduce && 'IntersectionObserver' in window) {
  const targets = document.querySelectorAll('section:not(.hero) h2, .section-intro, .about-text, .card, .timeline, .issuer, .closing');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        el.classList.add('in');
        obs.unobserve(el);
        // terminada a entrada, remove as classes para não interferir nos efeitos de hover
        el.addEventListener('transitionend', function done(ev) {
          if (ev.propertyName !== 'opacity') return;
          el.classList.remove('reveal', 'in');
          el.style.transitionDelay = '';
          el.removeEventListener('transitionend', done);
        });
      }
    });
  }, { threshold: 0.12 });
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 70 + 'ms'; // pequeno escalonamento
    io.observe(el);
  });
}
