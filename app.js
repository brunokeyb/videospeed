/* eslint-disable */
const STORAGE_KEY = "ordem-trafego.v1";
const WEEKDAY_NAMES = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

const DEFAULT_STATE = {
  fixed: {
    unidadeSolicitante: "",
    unidadeAdmin: "",
    responsavel: "",
    marca: "",
    chassi: "",
    placa: "",
    tipo: "CARRO",
    condutor: "",
    matricula: "",
    cnh: "",
    natureza: "Urbano",
    horaInicio: "8h",
    horaFim: "17h",
  },
  defaultDemand: "Atendimento a demandas administrativas externas da Secretaria",
  demands: [],
  locations: [],
  signature: null,
  lastPeriod: null,
  current: {
    numero: "",
    dataSolicitacao: "",
    dataInicio: "",
    dataFim: "",
    kmInicial: 0,
    kmFinal: 0,
    servidores: "",
    days: [],
  },
};

function deepMerge(target, source) {
  if (typeof source !== "object" || source === null) return source;
  if (Array.isArray(source)) return source.slice();
  const out = { ...target };
  for (const k of Object.keys(source)) {
    out[k] = deepMerge(target ? target[k] : undefined, source[k]);
  }
  return out;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    return deepMerge(DEFAULT_STATE, JSON.parse(raw));
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const state = loadState();

// ---------- DOM helpers ----------
const $ = (id) => document.getElementById(id);

function todayIso() {
  return Holidays.ymd(new Date());
}

function isoToDate(iso) {
  return new Date(iso + "T00:00:00Z");
}

function dayName(iso) {
  return WEEKDAY_NAMES[isoToDate(iso).getUTCDay()];
}

function formatBR(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y.slice(2)}`;
}

// ---------- Fixed fields binding ----------
const FIXED_FIELDS = [
  ["unidadeSolicitante", "f-unidadeSolicitante"],
  ["unidadeAdmin", "f-unidadeAdmin"],
  ["responsavel", "f-responsavel"],
  ["marca", "f-marca"],
  ["chassi", "f-chassi"],
  ["placa", "f-placa"],
  ["tipo", "f-tipo"],
  ["condutor", "f-condutor"],
  ["matricula", "f-matricula"],
  ["cnh", "f-cnh"],
  ["natureza", "f-natureza"],
  ["horaInicio", "f-horaInicio"],
  ["horaFim", "f-horaFim"],
];

function bindFixed() {
  for (const [key, id] of FIXED_FIELDS) {
    const el = $(id);
    el.value = state.fixed[key] ?? "";
    el.addEventListener("input", () => {
      state.fixed[key] = el.value;
      saveState();
    });
  }
}

// ---------- Current period binding ----------
const CURRENT_FIELDS = [
  ["numero", "f-numero", "text"],
  ["dataSolicitacao", "f-dataSolicitacao", "date"],
  ["dataInicio", "f-dataInicio", "date"],
  ["dataFim", "f-dataFim", "date"],
  ["kmInicial", "f-kmInicial", "number"],
  ["kmFinal", "f-kmFinal", "number"],
  ["servidores", "f-servidores", "text"],
];

function bindCurrent() {
  for (const [key, id, type] of CURRENT_FIELDS) {
    const el = $(id);
    el.value = state.current[key] ?? "";
    el.addEventListener("input", () => {
      state.current[key] = type === "number" ? Number(el.value) : el.value;
      saveState();
      if (key === "kmInicial" || key === "kmFinal") updateKmSummary();
    });
  }
}

function applyLastPeriod() {
  const summary = $("period-summary");
  if (state.lastPeriod) {
    const { dataInicio, dataFim, kmFinal } = state.lastPeriod;
    summary.textContent = `Última ordem: ${formatBR(dataInicio)} a ${formatBR(dataFim)} — KM final: ${kmFinal}`;
    if (!state.current.dataInicio) {
      state.current.dataInicio = Holidays.nextBusinessDay(dataFim);
      $("f-dataInicio").value = state.current.dataInicio;
    }
    if (!state.current.kmInicial) {
      state.current.kmInicial = kmFinal;
      $("f-kmInicial").value = kmFinal;
    }
  } else {
    summary.textContent = "Sem ordem anterior registrada.";
  }
  if (!state.current.dataSolicitacao) {
    state.current.dataSolicitacao = todayIso();
    $("f-dataSolicitacao").value = state.current.dataSolicitacao;
  }
}

// ---------- Days table ----------
function rebuildDaysFromPeriod() {
  const ini = state.current.dataInicio;
  const fim = state.current.dataFim;
  if (!ini || !fim) {
    alert("Informe data inicial e final do período.");
    return;
  }
  if (ini > fim) {
    alert("Data inicial deve ser anterior à data final.");
    return;
  }
  const days = Holidays.businessDaysBetween(ini, fim);
  state.current.days = days.map((iso) => ({
    date: iso,
    horaInicio: state.fixed.horaInicio,
    horaFim: state.fixed.horaFim,
    km: 0,
    locked: false,
    locais: "",
    demanda: state.defaultDemand,
  }));
  saveState();
  renderDays();
  updateKmSummary();
}

function renderDays() {
  const body = $("days-body");
  body.innerHTML = "";
  state.current.days.forEach((day, idx) => {
    const tr = document.createElement("tr");
    if (day.locked) tr.classList.add("locked");
    tr.draggable = true;
    tr.dataset.idx = String(idx);
    tr.innerHTML = `
      <td class="drag-handle">≡</td>
      <td class="col-date"><input type="date" data-k="date" value="${day.date || ""}"></td>
      <td>${day.date ? `"${dayName(day.date)}"` : ""}</td>
      <td class="col-hora"><input type="text" data-k="horaInicio" value="${day.horaInicio || ""}"></td>
      <td class="col-hora"><input type="text" data-k="horaFim" value="${day.horaFim || ""}"></td>
      <td class="col-km"><input type="number" data-k="km" min="0" value="${day.km ?? 0}"></td>
      <td><input type="checkbox" data-k="locked" ${day.locked ? "checked" : ""} title="Travar KM"></td>
      <td class="col-locais"><input type="text" data-k="locais" value="${escapeAttr(day.locais)}" placeholder="Locais separados por vírgula"></td>
      <td class="col-demanda"><input type="text" data-k="demanda" value="${escapeAttr(day.demanda)}"></td>
      <td class="row-actions">
        <button data-act="insert" title="Inserir linha abaixo">+</button>
        <button data-act="delete" title="Excluir" class="danger">×</button>
      </td>
    `;
    body.appendChild(tr);
  });
  bindRowEvents();
}

function escapeAttr(s) {
  return String(s ?? "").replace(/"/g, "&quot;");
}

function bindRowEvents() {
  const body = $("days-body");
  body.querySelectorAll("tr").forEach((tr) => {
    const idx = Number(tr.dataset.idx);
    tr.querySelectorAll("input").forEach((inp) => {
      const k = inp.dataset.k;
      inp.addEventListener("input", () => {
        const day = state.current.days[idx];
        if (k === "locked") {
          day[k] = inp.checked;
          tr.classList.toggle("locked", inp.checked);
        } else if (k === "km") {
          day[k] = Number(inp.value) || 0;
        } else {
          day[k] = inp.value;
        }
        if (k === "date") {
          const span = tr.children[2];
          span.textContent = inp.value ? `"${dayName(inp.value)}"` : "";
        }
        saveState();
        updateKmSummary();
      });
    });
    tr.querySelector('[data-act="insert"]').addEventListener("click", () => {
      const ref = state.current.days[idx];
      const next = {
        date: ref?.date ? Holidays.ymd(new Date(isoToDate(ref.date).getTime() + 86400000)) : todayIso(),
        horaInicio: state.fixed.horaInicio,
        horaFim: state.fixed.horaFim,
        km: 0,
        locked: false,
        locais: "",
        demanda: state.defaultDemand,
      };
      state.current.days.splice(idx + 1, 0, next);
      saveState();
      renderDays();
      updateKmSummary();
    });
    tr.querySelector('[data-act="delete"]').addEventListener("click", () => {
      if (!confirm("Excluir esta linha?")) return;
      state.current.days.splice(idx, 1);
      saveState();
      renderDays();
      updateKmSummary();
    });

    tr.addEventListener("dragstart", (e) => {
      tr.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(idx));
    });
    tr.addEventListener("dragend", () => tr.classList.remove("dragging"));
    tr.addEventListener("dragover", (e) => { e.preventDefault(); });
    tr.addEventListener("drop", (e) => {
      e.preventDefault();
      const from = Number(e.dataTransfer.getData("text/plain"));
      const to = idx;
      if (from === to) return;
      const [moved] = state.current.days.splice(from, 1);
      state.current.days.splice(to, 0, moved);
      saveState();
      renderDays();
    });
  });
}

function redistributeKm() {
  const total = (state.current.kmFinal || 0) - (state.current.kmInicial || 0);
  if (total < 0) {
    alert("KM final deve ser maior ou igual ao KM inicial.");
    return;
  }
  const days = state.current.days;
  if (days.length === 0) {
    alert("Adicione dias antes de redistribuir.");
    return;
  }
  const locked = days.filter((d) => d.locked);
  const unlocked = days.filter((d) => !d.locked);
  const lockedSum = locked.reduce((s, d) => s + (d.km || 0), 0);
  const remaining = total - lockedSum;

  if (unlocked.length === 0) {
    alert(`Todos os dias estão travados. Soma = ${lockedSum}, alvo = ${total}.`);
    return;
  }
  if (remaining < 0) {
    alert(`Dias travados somam ${lockedSum} > ${total} (total).`);
    return;
  }

  const mean = remaining / unlocked.length;
  // Random distribution with ±20% variation
  const raw = unlocked.map(() => mean * (0.8 + Math.random() * 0.4));
  const rawSum = raw.reduce((a, b) => a + b, 0);
  const normalized = raw.map((v) => (v * remaining) / rawSum);
  const rounded = normalized.map((v) => Math.round(v));
  // Fix rounding drift on last day
  const drift = remaining - rounded.reduce((a, b) => a + b, 0);
  rounded[rounded.length - 1] += drift;
  unlocked.forEach((d, i) => { d.km = Math.max(0, rounded[i]); });

  saveState();
  renderDays();
  updateKmSummary();
}

function updateKmSummary() {
  const target = (state.current.kmFinal || 0) - (state.current.kmInicial || 0);
  const sum = state.current.days.reduce((s, d) => s + (d.km || 0), 0);
  const el = $("km-summary");
  const diff = sum - target;
  let msg = `Soma dos KMs: ${sum} / alvo: ${target}`;
  if (diff !== 0) msg += ` (diferença: ${diff > 0 ? "+" : ""}${diff})`;
  el.textContent = msg;
  el.style.color = diff === 0 ? "#070" : "#a00";
}

// ---------- Locations ----------
function renderLocations() {
  const wrap = $("locations-list");
  wrap.innerHTML = "";
  if (state.locations.length === 0) {
    wrap.innerHTML = '<span class="hint">Nenhum local cadastrado.</span>';
    return;
  }
  state.locations.forEach((loc, idx) => {
    const chip = document.createElement("span");
    chip.className = "location-chip";
    chip.innerHTML = `${escapeHtml(loc.name)}${loc.km ? ` (${loc.km}km)` : ""} <button title="Remover">×</button>`;
    chip.querySelector("button").addEventListener("click", () => {
      state.locations.splice(idx, 1);
      saveState();
      renderLocations();
    });
    wrap.appendChild(chip);
  });
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function addLocation() {
  const name = $("loc-name").value.trim();
  if (!name) return;
  const kmStr = $("loc-km").value.trim();
  const km = kmStr ? Number(kmStr) : null;
  state.locations.push({ name, km });
  saveState();
  renderLocations();
  $("loc-name").value = "";
  $("loc-km").value = "";
}

// ---------- Demands ----------
function renderDemands() {
  const wrap = $("demand-templates");
  wrap.innerHTML = "";
  const defaultRow = document.createElement("div");
  defaultRow.className = "demand-row";
  defaultRow.innerHTML = `<span class="badge">PADRÃO</span><input type="text" value="${escapeAttr(state.defaultDemand)}">`;
  defaultRow.querySelector("input").addEventListener("input", (e) => {
    state.defaultDemand = e.target.value;
    saveState();
  });
  wrap.appendChild(defaultRow);

  state.demands.forEach((d, idx) => {
    const row = document.createElement("div");
    row.className = "demand-row";
    row.innerHTML = `<input type="text" value="${escapeAttr(d)}"><button class="danger" title="Remover">×</button>`;
    row.querySelector("input").addEventListener("input", (e) => {
      state.demands[idx] = e.target.value;
      saveState();
    });
    row.querySelector("button").addEventListener("click", () => {
      state.demands.splice(idx, 1);
      saveState();
      renderDemands();
    });
    wrap.appendChild(row);
  });
}

function addDemand() {
  const v = $("demand-name").value.trim();
  if (!v) return;
  state.demands.push(v);
  saveState();
  renderDemands();
  $("demand-name").value = "";
}

// ---------- Signature ----------
function renderSignature() {
  const img = $("signature-preview");
  const empty = $("signature-empty");
  if (state.signature) {
    img.src = state.signature;
    img.style.display = "block";
    empty.style.display = "none";
  } else {
    img.style.display = "none";
    empty.style.display = "block";
  }
}

async function loadSignatureFile(file) {
  const dataUrl = await readFileAsDataURL(file);
  const cleaned = await removeWhiteBackground(dataUrl);
  state.signature = cleaned;
  saveState();
  renderSignature();
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Remove white/light background, keep dark/blue ink strokes.
async function removeWhiteBackground(dataUrl) {
  const img = await loadImage(dataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = id.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    // Brightness 0-255
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (lum > 200) {
      // Transparent
      data[i + 3] = 0;
    } else if (lum > 120) {
      // Semi-transparent edge
      data[i + 3] = Math.round(((200 - lum) / 80) * 255);
    } else {
      // Solid ink, force blue color for consistency
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(id, 0, 0);
  // Crop to bounding box of non-transparent pixels
  const crop = cropToContent(canvas);
  return crop.toDataURL("image/png");
}

function cropToContent(canvas) {
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas;
  const data = ctx.getImageData(0, 0, width, height).data;
  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = data[(y * width + x) * 4 + 3];
      if (a > 20) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < minX || maxY < minY) return canvas;
  const pad = 10;
  const x = Math.max(0, minX - pad);
  const y = Math.max(0, minY - pad);
  const w = Math.min(width - x, maxX - minX + pad * 2);
  const h = Math.min(height - y, maxY - minY + pad * 2);
  const out = document.createElement("canvas");
  out.width = w;
  out.height = h;
  out.getContext("2d").drawImage(canvas, x, y, w, h, 0, 0, w, h);
  return out;
}

// ---------- Export / Import ----------
function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `ordem-trafego-backup-${todayIso()}.json`;
  a.click();
}

function importData(file) {
  const r = new FileReader();
  r.onload = () => {
    try {
      const data = JSON.parse(r.result);
      Object.assign(state, deepMerge(DEFAULT_STATE, data));
      saveState();
      hydrateAll();
      alert("Dados importados com sucesso.");
    } catch (e) {
      alert("Falha ao importar: " + e.message);
    }
  };
  r.readAsText(file);
}

// ---------- Claude prompt ----------
function buildClaudePrompt() {
  const c = state.current;
  const total = (c.kmFinal || 0) - (c.kmInicial || 0);
  const days = c.days.map((d) => ({
    date: d.date,
    weekday: d.date ? dayName(d.date) : "",
    locked: !!d.locked,
    km: d.km,
    locais: d.locais,
    demanda: d.demanda,
  }));
  const locations = state.locations.map((l) => `${l.name}${l.km ? ` (~${l.km}km)` : ""}`).join(", ");
  const demands = [state.defaultDemand, ...state.demands].filter(Boolean).join("; ");

  return `Você é meu assistente para preencher uma Ordem de Tráfego municipal. Preciso que distribua os KMs e gere locais e demandas para cada dia útil do período.

PERÍODO: ${formatBR(c.dataInicio)} a ${formatBR(c.dataFim)}
KM TOTAL A DISTRIBUIR: ${total} km (de ${c.kmInicial} a ${c.kmFinal})
MÉDIA POR DIA: aproximadamente 18-30 km, com variação aleatória natural

DIAS:
${days.map((d, i) => `  ${i + 1}. ${formatBR(d.date)} "${d.weekday}" - KM: ${d.km}${d.locked ? " [TRAVADO]" : ""} - Locais: ${d.locais || "(gerar)"} - Demanda: ${d.demanda || "(usar padrão)"}`).join("\n")}

LOCAIS DISPONÍVEIS: ${locations || "(nenhum cadastrado, sugira bairros de Águas Lindas de Goiás)"}
DEMANDAS DISPONÍVEIS: ${demands}

REGRAS:
- Dias marcados [TRAVADO] mantêm o KM atual; NÃO altere
- Demais dias: distribua o KM restante (total - travados) com variação ±20%, soma exata = ${total - days.filter(d => d.locked).reduce((s, d) => s + d.km, 0)}
- Para locais vazios, escolha 2-3 da lista (ou sugira bairros razoáveis)
- Para demanda vazia, use a padrão: "${state.defaultDemand}"
- Se um dia tem demanda específica, acrescente após a padrão com "; "

RESPONDA APENAS COM JSON neste formato:
{
  "days": [
    { "date": "YYYY-MM-DD", "km": 22, "locais": "Jd. Brasília, Setor 9", "demanda": "${state.defaultDemand}" },
    ...
  ]
}`;
}

function applyClaudeResponse() {
  const raw = $("claude-response").value.trim();
  if (!raw) return;
  try {
    // Try to extract JSON even if there's surrounding text
    const match = raw.match(/\{[\s\S]*\}/);
    const json = JSON.parse(match ? match[0] : raw);
    if (!Array.isArray(json.days)) throw new Error("JSON sem array 'days'.");
    for (const incoming of json.days) {
      const idx = state.current.days.findIndex((d) => d.date === incoming.date);
      if (idx === -1) continue;
      const day = state.current.days[idx];
      if (day.locked) continue;
      if (typeof incoming.km === "number") day.km = incoming.km;
      if (typeof incoming.locais === "string") day.locais = incoming.locais;
      if (typeof incoming.demanda === "string") day.demanda = incoming.demanda;
    }
    saveState();
    renderDays();
    updateKmSummary();
    alert("Resposta aplicada.");
  } catch (e) {
    alert("Erro ao processar resposta: " + e.message);
  }
}

// ---------- PDF generation ----------
const { PDFDocument, StandardFonts, rgb } = PDFLib;

// Coordinates in PDF points (origin: bottom-left), based on the template's label positions
const COORD = {
  numero:           { x: 23,  y: 685, w: 155, size: 10 },
  unidadeSolic:     { x: 183, y: 685, w: 115, size: 10 },
  natUrbanoX:       { x: 395, y: 691, size: 12 },
  natViagemX:       { x: 395, y: 678, size: 12 },
  dataSolic:        { x: 405, y: 685, w: 170, size: 10 },

  marca:            { x: 23,  y: 651, w: 155, size: 10 },
  chassi:           { x: 183, y: 651, w: 115, size: 10 },
  placa:            { x: 303, y: 651, w: 135, size: 10 },
  // CARRO is already printed

  condutor:         { x: 23,  y: 621, w: 275, size: 10 },
  matricula:        { x: 303, y: 621, w: 135, size: 10 },
  cnh:              { x: 443, y: 621, w: 132, size: 10 },

  servidores:       { x: 23,  y: 588, w: 552, size: 10 },
  servico:          { x: 23,  y: 547, w: 552, size: 10 },
  itinerario:       { x: 23,  y: 502, w: 552, h: 130, size: 10, multiline: true },

  saidaData:        { x: 130, y: 339, w: 110, size: 9 },
  saidaHora:        { x: 130, y: 328, w: 110, size: 9 },
  retornoData:      { x: 405, y: 339, w: 170, size: 9 },
  retornoHora:      { x: 405, y: 328, w: 170, size: 9 },

  unidadeAdmin:     { x: 25,  y: 305, w: 240, size: 10 },
  responsavel:      { x: 295, y: 305, w: 280, size: 10 },

  utilSaidaDt:      { x: 85,  y: 258, w: 175, size: 9 },
  utilSaidaKm:      { x: 85,  y: 243, w: 175, size: 11 },
  utilRetornoDt:    { x: 320, y: 258, w: 255, size: 9 },
  utilRetornoKm:    { x: 320, y: 243, w: 255, size: 11 },

  signature:        { cx: 297, y: 160, maxW: 240, maxH: 35 },
};

async function buildPdf() {
  const tpl = await fetch("template.pdf").then((r) => r.arrayBuffer());
  const pdf = await PDFDocument.load(tpl);
  const page = pdf.getPages()[0];
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  const c = state.current;
  const f = state.fixed;

  const draw = (text, coord) => {
    if (text == null || text === "") return;
    const size = fitText(String(text), coord, font);
    page.drawText(String(text), { x: coord.x, y: coord.y, size, font, color: rgb(0, 0, 0) });
  };

  const drawX = (coord) => {
    page.drawText("X", { x: coord.x, y: coord.y, size: coord.size, font, color: rgb(0, 0, 0) });
  };

  // Fixed and current
  draw(c.numero, COORD.numero);
  draw(f.unidadeSolicitante, COORD.unidadeSolic);
  if (f.natureza === "Urbano") drawX(COORD.natUrbanoX); else drawX(COORD.natViagemX);
  draw(formatBR(c.dataSolicitacao), COORD.dataSolic);

  draw(f.marca, COORD.marca);
  draw(f.chassi, COORD.chassi);
  draw(f.placa, COORD.placa);

  draw(f.condutor, COORD.condutor);
  draw(f.matricula, COORD.matricula);
  draw(f.cnh, COORD.cnh);

  draw(c.servidores, COORD.servidores);

  // Itinerary (multiline + auto-shrink)
  const itinerary = buildItineraryText();
  drawMultiline(page, font, itinerary, COORD.itinerario);

  // Serviço (concatenate unique demands used + default)
  const demandSet = new Set([f.defaultDemand].filter(Boolean));
  state.current.days.forEach((d) => { if (d.demanda) demandSet.add(d.demanda); });
  const servico = [state.defaultDemand, ...state.current.days.map((d) => d.demanda).filter((x) => x && x !== state.defaultDemand)]
    .filter((v, i, a) => a.indexOf(v) === i)
    .join("; ");
  draw(servico, COORD.servico);

  // Previsão
  draw(formatBR(c.dataInicio), COORD.saidaData);
  draw(f.horaInicio, COORD.saidaHora);
  draw(formatBR(c.dataFim), COORD.retornoData);
  draw(f.horaFim, COORD.retornoHora);

  draw(f.unidadeAdmin, COORD.unidadeAdmin);
  draw(f.responsavel, COORD.responsavel);

  // Utilização
  draw(`${formatBR(c.dataInicio)} ${f.horaInicio}`, COORD.utilSaidaDt);
  draw(String(c.kmInicial || ""), COORD.utilSaidaKm);
  draw(`${formatBR(c.dataFim)} ${f.horaFim}`, COORD.utilRetornoDt);
  draw(String(c.kmFinal || ""), COORD.utilRetornoKm);

  // Signature
  if (state.signature) {
    const png = await pdf.embedPng(state.signature);
    const sc = COORD.signature;
    let w = png.width;
    let h = png.height;
    const ratio = Math.min(sc.maxW / w, sc.maxH / h);
    w = w * ratio;
    h = h * ratio;
    page.drawImage(png, { x: sc.cx - w / 2, y: sc.y, width: w, height: h });
  }

  return await pdf.save();
}

function buildItineraryText() {
  return state.current.days
    .map((d) => {
      const wd = d.date ? `"${dayName(d.date)}"` : "";
      const dt = d.date ? formatBR(d.date) : "";
      const locais = d.locais || "—";
      const km = d.km != null ? `${d.km}km` : "";
      return `${dt} ${wd}: ${locais} (${km})`;
    })
    .join(" • ");
}

function fitText(text, coord, font) {
  if (!coord.w) return coord.size || 10;
  let size = coord.size || 10;
  while (size > 6 && font.widthOfTextAtSize(text, size) > coord.w) size -= 0.5;
  return size;
}

function drawMultiline(page, font, text, coord) {
  if (!text) return;
  const lines = wrapText(text, coord.w, font, coord.size);
  let size = coord.size;
  let actualLines = lines;
  // Shrink font if it overflows the box
  while (size > 6) {
    actualLines = wrapText(text, coord.w, font, size);
    if (actualLines.length * (size + 2) <= coord.h) break;
    size -= 0.5;
  }
  const lineHeight = size + 2;
  let y = coord.y + coord.h - lineHeight;
  for (const line of actualLines) {
    if (y < coord.y) break;
    page.drawText(line, { x: coord.x, y, size, font, color: rgb(0, 0, 0) });
    y -= lineHeight;
  }
}

function wrapText(text, maxWidth, font, size) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const w of words) {
    const test = current ? current + " " + w : w;
    if (font.widthOfTextAtSize(test, size) <= maxWidth) {
      current = test;
    } else {
      if (current) lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function generatePdf(preview = false) {
  try {
    const bytes = await buildPdf();
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    if (preview) {
      const iframe = $("pdf-preview");
      iframe.src = url;
      iframe.style.display = "block";
    } else {
      const a = document.createElement("a");
      a.href = url;
      const fname = `ordem-trafego-${state.current.dataInicio || todayIso()}_a_${state.current.dataFim || todayIso()}.pdf`;
      a.download = fname;
      a.click();
      // Save as last period after download
      state.lastPeriod = {
        dataInicio: state.current.dataInicio,
        dataFim: state.current.dataFim,
        kmFinal: state.current.kmFinal,
      };
      saveState();
      applyLastPeriod();
    }
  } catch (e) {
    alert("Erro ao gerar PDF: " + e.message);
    console.error(e);
  }
}

// ---------- Wiring ----------
function hydrateAll() {
  bindFixed();
  bindCurrent();
  applyLastPeriod();
  renderDays();
  renderLocations();
  renderDemands();
  renderSignature();
  updateKmSummary();
}

function wireButtons() {
  $("btn-rebuildDays").addEventListener("click", rebuildDaysFromPeriod);
  $("btn-add-row").addEventListener("click", () => {
    state.current.days.push({
      date: todayIso(),
      horaInicio: state.fixed.horaInicio,
      horaFim: state.fixed.horaFim,
      km: 0,
      locked: false,
      locais: "",
      demanda: state.defaultDemand,
    });
    saveState();
    renderDays();
    updateKmSummary();
  });
  $("btn-redistribute").addEventListener("click", redistributeKm);
  $("btn-add-location").addEventListener("click", addLocation);
  $("btn-add-demand").addEventListener("click", addDemand);

  $("file-signature").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) loadSignatureFile(file);
  });
  $("btn-clear-signature").addEventListener("click", () => {
    state.signature = null;
    saveState();
    renderSignature();
  });

  $("btn-generate-pdf").addEventListener("click", () => generatePdf(false));
  $("btn-preview").addEventListener("click", () => generatePdf(true));

  $("btn-claude").addEventListener("click", () => {
    $("claude-card").style.display = "block";
    $("claude-prompt").value = buildClaudePrompt();
    $("claude-card").scrollIntoView({ behavior: "smooth" });
  });
  $("btn-copy-prompt").addEventListener("click", async () => {
    await navigator.clipboard.writeText($("claude-prompt").value);
    alert("Prompt copiado!");
  });
  $("btn-apply-response").addEventListener("click", applyClaudeResponse);

  $("btn-export").addEventListener("click", exportData);
  $("btn-import").addEventListener("click", () => $("file-import").click());
  $("file-import").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) importData(file);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  hydrateAll();
  wireButtons();
});
