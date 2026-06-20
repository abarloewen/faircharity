/* =========================================================================
   FairCharity e.V. — shared site script
   Header/footer injection · DE/EN i18n · mobile menu · reveal · calculators
   ========================================================================= */
(function () {
  "use strict";

  // ---- Path helper (works from any folder depth) ----
  var ROOT = ""; // all pages live at root

  // ---------------------------------------------------------------------
  // Navigation model
  // ---------------------------------------------------------------------
  var NAV = [
    { de: "Home", en: "Home", href: "index.html" },
    { de: "Kurban", en: "Qurban", href: "kurban.html" },
    {
      de: "Projekte", en: "Projects",
      children: [
        { de: "Hilfe zur Selbsthilfe", en: "Empowerment", href: "empowerment.html" },
        { de: "Patenschaft", en: "Sponsorship", href: "patenschaft.html" },
        { de: "Wasserversorgung", en: "Water Supply", href: "wasserversorgung.html" }
      ]
    },
    {
      de: "Religiöse Spenden", en: "Religious Giving",
      children: [
        { de: "Zakat al-Māl", en: "Zakat al-Mal", href: "zakat.html" },
        { de: "Fidya & Kaffara", en: "Fidya & Kaffara", href: "fidyakaffara.html" },
        { de: "Zakat al-Fitr", en: "Zakat al-Fitr", href: "fitr26.html" },
        { de: "Eid Geschenk", en: "Eid Gift", href: "eid26.html" }
      ]
    },
    {
      de: "Über uns", en: "About",
      children: [
        { de: "Transparenz", en: "Transparency", href: "transparenz.html" },
        { de: "Kontakt", en: "Contact", href: "kontakt.html" }
      ]
    }
  ];

  // ---------------------------------------------------------------------
  // Build header
  // ---------------------------------------------------------------------
  function buildHeader() {
    var mount = document.getElementById("site-header");
    if (!mount) return;

    var items = NAV.map(function (n) {
      if (n.children) {
        var subs = n.children.map(function (c) {
          return '<a href="' + ROOT + c.href + '" data-en="' + c.en + '">' + c.de + "</a>";
        }).join("");
        return '<li class="nav-item has-sub"><span class="nav-link" tabindex="0" data-en="' + n.en + '">' + n.de + '</span><div class="dropdown">' + subs + "</div></li>";
      }
      return '<li class="nav-item"><a class="nav-link" href="' + ROOT + n.href + '" data-en="' + n.en + '">' + n.de + "</a></li>";
    }).join("");

    mount.className = "site-header";
    mount.innerHTML =
      '<div class="container nav">' +
        '<a class="logo" href="' + ROOT + 'index.html" aria-label="FairCharity"><img src="' + ROOT + 'assets/img/logo.svg" alt="FairCharity e.V."></a>' +
        '<ul class="nav-menu" role="menubar">' + items + "</ul>" +
        '<div class="lang-switch" role="group" aria-label="Sprache / Language">' +
          '<button data-lang="de">DE</button><button data-lang="en">EN</button>' +
        "</div>" +
        '<a class="btn btn-primary btn-sm nav-cta" href="' + ROOT + 'spenden.html" data-en="❤ Donate">❤ Jetzt Spenden</a>' +
        '<button class="hamburger" aria-label="Menü" aria-expanded="false"><span></span><span></span><span></span></button>' +
      "</div>";

    // Mobile drawer
    var drawerItems = NAV.map(function (n) {
      if (n.children) {
        var head = '<div class="m-group" data-en="' + n.en + '">' + n.de + "</div>";
        var subs = n.children.map(function (c) {
          return '<a href="' + ROOT + c.href + '" data-en="' + c.en + '">' + c.de + "</a>";
        }).join("");
        return head + subs;
      }
      return '<a href="' + ROOT + n.href + '" data-en="' + n.en + '">' + n.de + "</a>";
    }).join("");

    var drawer = document.createElement("div");
    drawer.className = "mobile-drawer";
    drawer.innerHTML =
      '<div class="scrim"></div>' +
      '<div class="mobile-panel">' +
        '<button class="m-close" aria-label="Schließen">×</button>' +
        '<a href="' + ROOT + 'index.html"><img src="' + ROOT + 'assets/img/logo.svg" alt="FairCharity" style="height:40px"></a>' +
        drawerItems +
        '<a class="btn btn-primary" style="margin-top:18px" href="' + ROOT + 'spenden.html" data-en="❤ Donate">❤ Jetzt Spenden</a>' +
      "</div>";
    document.body.appendChild(drawer);

    var burger = mount.querySelector(".hamburger");
    burger.addEventListener("click", function () { drawer.classList.add("open"); });
    drawer.querySelector(".m-close").addEventListener("click", function () { drawer.classList.remove("open"); });
    drawer.querySelector(".scrim").addEventListener("click", function () { drawer.classList.remove("open"); });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { drawer.classList.remove("open"); });
    });

    // language buttons
    mount.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
  }

  // ---------------------------------------------------------------------
  // Build footer
  // ---------------------------------------------------------------------
  function buildFooter() {
    var mount = document.getElementById("site-footer");
    if (!mount) return;
    mount.className = "site-footer";
    mount.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<img class="flogo" src="' + ROOT + 'assets/img/logo-light.svg" alt="FairCharity e.V.">' +
            '<p class="footer-note" data-en="We are changing how help works — transparent, accountable and built to last.">Wir verändern, wie Hilfe funktioniert — transparent, verantwortungsvoll und nachhaltig.</p>' +
            '<div class="footer-iban">IBAN: DE50 4306 0967 1351 3075 00<br>BIC: GENODEM1GLS · GLS Bank</div>' +
          "</div>" +
          '<div>' +
            '<h4 data-en="Projects">Projekte</h4>' +
            '<a href="' + ROOT + 'empowerment.html" data-en="Empowerment">Hilfe zur Selbsthilfe</a>' +
            '<a href="' + ROOT + 'patenschaft.html" data-en="Sponsorship">Patenschaft</a>' +
            '<a href="' + ROOT + 'wasserversorgung.html" data-en="Water Supply">Wasserversorgung</a>' +
            '<a href="' + ROOT + 'kurban.html" data-en="Qurban">Kurban</a>' +
          "</div>" +
          '<div>' +
            '<h4 data-en="Religious Giving">Religiöse Spenden</h4>' +
            '<a href="' + ROOT + 'zakat.html" data-en="Zakat al-Mal">Zakat al-Māl</a>' +
            '<a href="' + ROOT + 'fidyakaffara.html">Fidya &amp; Kaffara</a>' +
            '<a href="' + ROOT + 'fitr26.html" data-en="Zakat al-Fitr">Zakat al-Fitr</a>' +
            '<a href="' + ROOT + 'eid26.html" data-en="Eid Gift">Eid Geschenk</a>' +
          "</div>" +
          '<div>' +
            '<h4 data-en="Organisation">Organisation</h4>' +
            '<a href="' + ROOT + 'transparenz.html" data-en="Transparency">Transparenz</a>' +
            '<a href="' + ROOT + 'kontakt.html" data-en="Contact">Kontakt</a>' +
            '<a href="' + ROOT + 'spenden.html" data-en="Donate">Jetzt Spenden</a>' +
            '<a href="' + ROOT + 'impressum.html">Impressum</a>' +
            '<a href="' + ROOT + 'datenschutz.html" data-en="Privacy">Datenschutz</a>' +
          "</div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          '<span>© ' + new Date().getFullYear() + ' Faircharity e.V. — <span data-en="All rights reserved.">Alle Rechte vorbehalten.</span></span>' +
          '<span data-en="Help with system, responsibility and impact.">Hilfe mit System, Verantwortung und Wirkung.</span>' +
        "</div>" +
      "</div>";
  }

  // ---------------------------------------------------------------------
  // Shared donate section (collapsed accordions, lazy-loaded widgets)
  // ---------------------------------------------------------------------
  var DONATE = [
    { de: "Zakat al-Māl", en: "Zakat al-Mal", flag: "🪙", vz: "ZM", url: "https://spenden.twingle.de/faircharity-e-v/zakat-ul-maal/tw69b1d51a7dcbb/widget" },
    { de: "Zakat al-Fitr 2026", en: "Zakat al-Fitr 2026", flag: "🌙", vz: "Fitr 26", url: "https://spenden.twingle.de/faircharity-e-v/zakat-ul-fitr-26/tw699f696f71e32/widget" },
    { de: "Fidya & Kaffara", en: "Fidya & Kaffara", flag: "⚖️", vz: "F&amp;K", url: null,
      noteDe: "Bitte per Überweisung mit dem Verwendungszweck „F&amp;K“ spenden — oder den genauen Betrag berechnen.",
      noteEn: "Please donate by bank transfer with reference “F&amp;K” — or calculate your exact amount.",
      ctaDe: "🧮 Fidya / Kaffara berechnen", ctaEn: "🧮 Calculate Fidya / Kaffara", ctaHref: "fidyakaffara.html" },
    { de: "Eid Geschenk Ramadan 26", en: "Eid Gift Ramadan 26", flag: "💝", vz: "Eid-R 26", url: "https://spenden.twingle.de/faircharity-e-v/eid-ul-fitr-26/tw69ba054494997/widget" },
    { de: "Patenschaften", en: "Sponsorships", flag: "🤲", vz: "Patenkind", url: "https://spenden.twingle.de/faircharity-e-v/patenschaften/tw69afbb7e27715/widget" },
    { de: "Wasserversorgung", en: "Water supply", flag: "💧", vz: "Wasser", url: "https://spenden.twingle.de/faircharity-e-v/wassertower-fuer-ganze-gemeinden/tw699dcb54b8ea1/widget" },
    { de: "Hilfe zur Selbsthilfe", en: "Help to self-help", flag: "🌱", vz: "HSH", url: "https://spenden.twingle.de/faircharity-e-v/hilfe-zur-selbsthilfe-empowerment/tw69b14626aa520/widget" }
  ];

  function buildDonateSection() {
    var mount = document.getElementById("donate-embed");
    if (!mount) return;

    var items = DONATE.map(function (d) {
      var title = d.de === d.en ? d.de : '<span data-en="' + d.en + '">' + d.de + "</span>";
      var head = '<summary><span class="flag">' + d.flag + "</span>" + title + "</summary>";
      var body;
      if (d.url) {
        body =
          '<div class="acc-body">' +
            '<div class="info-box warn"><span data-en="Bank-transfer reference:">Verwendungszweck bei Überweisung:</span> <span class="vz">' + d.vz + "</span></div>" +
            '<div class="tw-wrap">' +
              '<h3 data-en="💳 Donate online">💳 Online spenden</h3>' +
              '<p class="tw-sub">⬇️ SEPA-Lastschrift · PayPal · <span data-en="Credit card">Kreditkarte</span> ⬇️</p>' +
              '<iframe data-src="' + d.url + '" loading="lazy" title="' + d.de + ' — Spendenformular"></iframe>' +
              '<a class="btn btn-ghost btn-sm tw-fallback" href="' + d.url + '" target="_blank" rel="noopener" data-en="Open form in new tab ↗">Formular im neuen Tab öffnen ↗</a>' +
            "</div>" +
          "</div>";
      } else {
        body =
          '<div class="acc-body">' +
            '<div class="info-box warn"><span data-en="Bank-transfer reference:">Verwendungszweck bei Überweisung:</span> <span class="vz">' + d.vz + "</span></div>" +
            '<p style="margin-top:12px" data-en="' + d.noteEn + '">' + d.noteDe + "</p>" +
            '<a class="btn btn-ghost btn-sm" href="' + d.ctaHref + '" data-en="' + d.ctaEn + '">' + d.ctaDe + "</a>" +
          "</div>";
      }
      return '<details class="acc reveal">' + head + body + "</details>";
    }).join("");

    var sec = document.createElement("section");
    sec.className = "section cream-2 donate-section";
    sec.innerHTML =
      '<div class="container">' +
        '<div class="section-head reveal">' +
          '<span class="eyebrow">💝 <span data-en="Donate online">Online spenden</span></span>' +
          '<h2 data-en="Support a project directly">Unterstütze direkt ein Projekt</h2>' +
          '<p data-en="Pick a cause and give securely by SEPA, PayPal or card — or by bank transfer with the reference shown. Tap a project to open its form.">Wähle ein Anliegen und spende sicher per SEPA, PayPal oder Karte — oder per Überweisung mit dem angegebenen Verwendungszweck. Tippe ein Projekt an, um das Formular zu öffnen.</p>' +
        "</div>" +
        '<div class="donate-list">' + items + "</div>" +
        '<div class="center" style="margin-top:22px"><a class="btn btn-green" href="spenden.html" data-en="See all donation options →">Alle Spendenoptionen ansehen →</a></div>' +
      "</div>";

    mount.parentNode.replaceChild(sec, mount);

    // lazy-load each Twingle widget only when its panel is first opened
    sec.querySelectorAll("details.acc").forEach(function (det) {
      det.addEventListener("toggle", function () {
        if (det.open) {
          var f = det.querySelector("iframe[data-src]");
          if (f) { f.src = f.getAttribute("data-src"); f.removeAttribute("data-src"); }
        }
      });
    });
  }

  // ---------------------------------------------------------------------
  // i18n engine: [data-en] holds English; DE is the original markup
  // ---------------------------------------------------------------------
  function setLang(lang) {
    var en = lang === "en";
    document.querySelectorAll("[data-en]").forEach(function (el) {
      if (el.getAttribute("data-de-store") === null || el.getAttribute("data-de-store") === undefined) {
        // store original German once
        if (!el.hasAttribute("data-de-store")) el.setAttribute("data-de-store", el.innerHTML);
      }
      el.innerHTML = en ? el.getAttribute("data-en") : el.getAttribute("data-de-store");
    });
    // attribute-level translations: data-en-ph for placeholders
    document.querySelectorAll("[data-en-ph]").forEach(function (el) {
      if (!el.hasAttribute("data-de-ph")) el.setAttribute("data-de-ph", el.getAttribute("placeholder") || "");
      el.setAttribute("placeholder", en ? el.getAttribute("data-en-ph") : el.getAttribute("data-de-ph"));
    });
    document.documentElement.classList.toggle("lang-en", en);
    document.documentElement.setAttribute("lang", en ? "en" : "de");
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });
    try { localStorage.setItem("fc_lang", lang); } catch (e) {}
  }

  // ---------------------------------------------------------------------
  // Reveal on scroll
  // ---------------------------------------------------------------------
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  // ---------------------------------------------------------------------
  // Calculators
  // ---------------------------------------------------------------------
  function fmt(n) {
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
  }

  function initZakatCalc() {
    var root = document.getElementById("zakat-calc");
    if (!root) return;
    var ids = ["z-cash", "z-gold", "z-silver", "z-invest", "z-debt"];
    function calc() {
      var v = {};
      ids.forEach(function (id) { v[id] = parseFloat(document.getElementById(id).value) || 0; });
      var net = v["z-cash"] + v["z-gold"] + v["z-silver"] + v["z-invest"] - v["z-debt"];
      if (net < 0) net = 0;
      // Nisab reference (silver-based, conservative) ~ editable
      var nisab = parseFloat(document.getElementById("z-nisab").value) || 0;
      var zak = net >= nisab ? net * 0.025 : 0;
      document.getElementById("z-net").textContent = fmt(net);
      var out = document.getElementById("z-out");
      out.textContent = fmt(zak);
      var note = document.getElementById("z-note");
      if (net < nisab && net > 0) {
        note.setAttribute("data-de-store", "Dein Vermögen liegt unter dem Nisab — aktuell keine Zakat fällig.");
        note.innerHTML = document.documentElement.classList.contains("lang-en")
          ? "Your wealth is below the nisab — no Zakat is currently due."
          : "Dein Vermögen liegt unter dem Nisab — aktuell keine Zakat fällig.";
      } else {
        note.innerHTML = document.documentElement.classList.contains("lang-en")
          ? "Zakat is 2.5% of net zakatable wealth held for one lunar year."
          : "Zakat beträgt 2,5 % des zakatpflichtigen Nettovermögens über ein Mondjahr.";
      }
    }
    root.querySelectorAll("input").forEach(function (i) { i.addEventListener("input", calc); });
    calc();
  }

  function initFidyaCalc() {
    var root = document.getElementById("fidya-calc");
    if (!root) return;
    var BASE = 6, FEE = 0.20; // €6 per meal + 20% delivery
    function calc() {
      var days = parseInt(document.getElementById("f-days").value, 10) || 0;
      var people = parseInt(document.getElementById("f-people").value, 10) || 1;
      var meals = days * people;
      var base = meals * BASE;
      var total = base * (1 + FEE);
      document.getElementById("f-meals").textContent = meals;
      document.getElementById("f-out").textContent = fmt(total);
    }
    root.querySelectorAll("input").forEach(function (i) { i.addEventListener("input", calc); });
    calc();
  }

  function initContactForm() {
    var f = document.getElementById("contact-form");
    if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = document.getElementById("form-ok");
      f.style.display = "none";
      ok.style.display = "block";
    });
  }

  // ---------------------------------------------------------------------
  // Scroll progress bar
  // ---------------------------------------------------------------------
  function initProgressBar() {
    var bar = document.createElement("div");
    bar.id = "fc-progress";
    document.body.appendChild(bar);
    function upd() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? (h.scrollTop || document.body.scrollTop) / max : 0;
      bar.style.width = (p * 100) + "%";
    }
    window.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    upd();
  }

  // ---------------------------------------------------------------------
  // Hero stat count-up
  // ---------------------------------------------------------------------
  function initCounters() {
    var nums = document.querySelectorAll(".hero-stats .num");
    if (!nums.length) return;
    nums.forEach(function (el) {
      var raw = el.textContent.trim();
      var m = raw.match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/);
      if (!m) return;
      var prefix = m[1], target = parseFloat(m[2].replace(",", ".")), suffix = m[3];
      var dur = 1100, start = null;
      function step(ts) {
        if (!start) start = ts;
        var t = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        var val = Math.round(target * eased);
        el.textContent = prefix + val + suffix;
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = prefix + (Number.isInteger(target) ? target : target) + suffix;
      }
      el.textContent = prefix + "0" + suffix;
      requestAnimationFrame(step);
    });
  }

  // ---------------------------------------------------------------------
  // Boot
  // ---------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", function () {
    buildHeader();
    buildFooter();
    buildDonateSection();
    var saved = "de";
    try { saved = localStorage.getItem("fc_lang") || "de"; } catch (e) {}
    setLang(saved);
    initReveal();
    initZakatCalc();
    initFidyaCalc();
    initContactForm();
    initProgressBar();
    initCounters();
  });
})();
