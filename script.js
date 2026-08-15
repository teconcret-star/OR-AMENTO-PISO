const $ = (id) => document.getElementById(id);

const M2_PER_WORKER = 100;
const USERS_STORAGE_KEY = "orcamento_usuarios_v1";
const SESSION_STORAGE_KEY = "orcamento_sessao_v1";
const PROPOSALS_STORAGE_KEY = "propostas_salvas_v1";
const CLIENTS_STORAGE_KEY = "clientes_salvos_v1";
const MACHINE_DB_STORAGE_KEY = "orcamento_banco_estimativas_v1";
const PENDING_SYNC_STORAGE_KEY = "orcamento_firestore_pending_sync_v1";
const LEGACY_DRAFT_STORAGE_KEY = "proposta_rascunho_v1";
const DRAFT_STORAGE_KEY_PREFIX = "proposta_rascunho_usuario_v1_";
const WORKER_MODE_AUTO = "auto";
const WORKER_MODE_MANUAL = "manual";
const CONTRACT_TYPE_LABOR = "mao_de_obra";
const CONTRACT_TYPE_LABOR_MATERIAL = "mao_de_obra_material";
const ROLE_ADMIN = "admin";
const ROLE_SELLER = "seller";
const DEFAULT_FILIAL = "Matriz";
const DEFAULT_ADMIN_USERNAME = "admin";
const DEFAULT_ADMIN_PASSWORD = "password2026";
const OPEN_ACCESS_MODE = true;
const OPEN_ACCESS_USER_EMAIL = "acesso.livre";
const OPEN_ACCESS_USER_NAME = "Acesso Livre";
const PASSWORD_ITERATIONS = 120000;
// Firebase credentials are kept here for optional future use.
// Sync is intentionally disabled at startup (firebaseSyncEnabled = false in init()).
// All data is stored locally in localStorage — no network connection is required.
const FIREBASE_CONFIG = {
 apiKey: "AIzaSyDPBCd-rC-Y9L9DIzFOgWZ0G_B_Ydn5RKM",
  authDomain: "orcapiso.firebaseapp.com",
  databaseURL: "https://orcapiso-default-rtdb.firebaseio.com",
  projectId: "orcapiso",
  storageBucket: "orcapiso.firebasestorage.app",
  messagingSenderId: "966600923508",
  appId: "1:966600923508:web:5f53da4ba834b88a5b3421",
  measurementId: "G-V5YHLBXJB0"
};
const FIRESTORE_COLLECTION = "orcamentoPiso";
const FIRESTORE_USERS_DOC = "users";
const FIRESTORE_PROPOSALS_DOC = "proposals";
const FIRESTORE_CLIENTS_DOC = "clients";
const FIRESTORE_MACHINE_DB_DOC = "machineDatabase";
const FIRESTORE_DRAFT_DOC_PREFIX = "draft_";
const FIRESTORE_USERS_COLLECTION = "usuarios";
const FIRESTORE_PROPOSALS_COLLECTION = "propostas";
const FIRESTORE_CLIENTS_COLLECTION = "clientes";
const FIRESTORE_USERS_SYNC_DOC = "collection_usuarios";
const FIRESTORE_PROPOSALS_SYNC_DOC = "collection_propostas";
const FIRESTORE_CLIENTS_SYNC_DOC = "collection_clientes";
const FIRESTORE_SETTINGS = {
  experimentalAutoDetectLongPolling: true,
  useFetchStreams: false
};
const HEX_BYTE_LENGTH = 2;
const FIREBASE_INIT_CONNECTION_DELAY_MS = 1000;
const FIREBASE_OPERATION_TIMEOUT_MS = 5000;
const FIREBASE_RECONNECT_DELAY_MS = 3000;
const FIREBASE_STATUS_CONNECTED = "connected";
const FIREBASE_STATUS_RECONNECTING = "reconnecting";
const FIREBASE_STATUS_DISCONNECTED = "disconnected";
const FIREBASE_STATUS_LOCAL = "local";
const TABLE_EXPORT_SCHEMA_VERSION = 1;
const PRINT_CLEANUP_RETRY_DELAY_MS = 400;
const IFRAME_CLEANUP_DELAY_MS = 600;
const IFRAME_PRINT_FALLBACK_TIMEOUT_MS = 2000;
// Tall enough to hold any proposal without clipping during off-screen layout measurement.
const IFRAME_MEASURE_HEIGHT_PX = 3000;
// A4 usable height with 8 mm top+bottom margins: (297 − 16) mm × 96 dpi ÷ 25.4 ≈ 1063 px.
const A4_USABLE_HEIGHT_PX = 1063;
const PRESERVE_USERS_CACHE_WARNING = "Lista de usuários vazia ignorada para preservar a sessão ativa.";
const DEFAULT_STANDARD_TEXT =
  "Apresentamos nossa proposta comercial para execução do piso industrial conforme dados da obra informados. Os valores contemplam o escopo acordado para a área indicada e permanecem sujeitos à validação final das condições do local antes do início dos serviços.";
const DEFAULT_IMPOSTO_PERCENTUAL = "1";
const PROPOSAL_STATUS_EM_ANDAMENTO = "em_andamento";
const PROPOSAL_STATUS_FECHADA = "fechada";
const PROPOSAL_STATUS_PERDIDA = "perdida";
const PROPOSAL_STATUS_META = {
  [PROPOSAL_STATUS_EM_ANDAMENTO]: {
    label: "Em andamento",
    className: "proposal-status-em_andamento"
  },
  [PROPOSAL_STATUS_FECHADA]: {
    label: "Fechada",
    className: "proposal-status-fechada"
  },
  [PROPOSAL_STATUS_PERDIDA]: {
    label: "Perdida",
    className: "proposal-status-perdida"
  }
};
const EQUIPAMENTOS_TIPO_PROPRIOS = "proprios";
const EQUIPAMENTOS_TIPO_ALUGADOS = "alugados";
const EQUIPAMENTOS_ALUGADOS_OPCOES = [
  { value: "acabadora_simples", label: "Acabadora simples" },
  { value: "acabadora_dupla", label: "Acabadora dupla" },
  { value: "maquina_corte", label: "Máquina de corte" },
  { value: "maquina_laser", label: "Máquina laser" },
  { value: "nivel_laser", label: "Nível laser" },
  { value: "regua_vibratoria", label: "Régua vibratória" }
];
const MACHINE_DATABASE_FIELD_IDS = [
  "paramRendimentoFacas",
  "paramFacasPorJogo",
  "paramPrecoFaca",
  "paramRendimentoDisco",
  "paramDiscosPorJogo",
  "paramPrecoDisco",
  "paramConsumoMaquinaDupla",
  "paramConsumoMaquinaSimples",
  "paramConsumoMaquinaCorte"
];
const PROPOSAL_SERVICE_COLUMN_LABELS = {
  service: "Serviço",
  valuePerSquareMeter: "Valor por m²",
  total: "Valor total"
};
const DEFAULT_MACHINE_DATABASE = {
  rendimentoFacasM2: 300,
  facasPorJogo: 4,
  precoFaca: 180,
  rendimentoDiscoM2: 500,
  discosPorJogo: 1,
  precoDisco: 220,
  consumoDuplaLitrosM2: 0.11,
  consumoSimplesLitrosM2: 0.08,
  consumoCorteLitrosM2: 0.04
};
/**
 * Preset de referência de mercado para parâmetros por m².
 * Unidades:
 * - rendimento* em m²/unidade
 * - preco* em R$
 * - consumo* em litros/m²
 */
const MACHINE_DATABASE_PRESETS = {
  marketBestPractices: {
    rendimentoFacasM2: 280,
    facasPorJogo: 4,
    precoFaca: 195,
    rendimentoDiscoM2: 470,
    discosPorJogo: 1,
    precoDisco: 235,
    consumoDuplaLitrosM2: 0.12,
    consumoSimplesLitrosM2: 0.085,
    consumoCorteLitrosM2: 0.045
  }
};

let logoDataUrl = "";
let toastTimeoutId;
let editingProposalId = "";
let editingUserId = "";
let editingClientId = "";
let currentUserId = "";
let currentUser = null;
let printProposalPendingCleanup = false;
let printCleanupRetryTimeoutId = null;
let usersCache = [];
let firestoreDb = null;
let firebaseSyncEnabled = false;
let firestoreUnsubscribers = [];
let firestoreSettingsApplied = false;
let firebaseReconnectTimeoutId = null;
let firebaseReconnectPromise = null;
let chartPropostasPorVendedor = null;
let chartValorPorVendedor = null;
let chartParticipacaoVendedor = null;
let chartPropostasPorStatus = null;
let chartValorPorStatus = null;
let idGenerationFallbackCounter = 0;
let pendingSyncCheckIntervalId = null;
const runtimeStorage = new Map();
const pendingSyncQueue = new Map(); // Track failed syncs: docId -> { value, retries, nextRetryTime }
const SYNC_RETRY_DELAYS_MS = [1000, 3000, 5000, 10000, 30000]; // Exponential backoff
const SYNC_MAX_RETRIES = 5;
let documentSyncCheckIntervalId = null;

function generateOpenAccessPassword() {
  if (window.crypto?.getRandomValues) {
    const randomBytes = new Uint8Array(16);
    window.crypto.getRandomValues(randomBytes);
    return Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  return `${Date.now()}_${createUniqueId()}_${Math.random().toString(36).slice(2)}`;
}

function cloneStorageValue(value) {
  if (value === undefined) return undefined;
  if (typeof window.structuredClone === "function") {
    try {
      return window.structuredClone(value);
    } catch {
      // Fallback abaixo.
    }
  }
  return JSON.parse(JSON.stringify(value));
}

function getFirestoreStorageKey(docId) {
  if (docId === FIRESTORE_USERS_DOC || docId === FIRESTORE_USERS_SYNC_DOC) return USERS_STORAGE_KEY;
  if (docId === FIRESTORE_PROPOSALS_DOC || docId === FIRESTORE_PROPOSALS_SYNC_DOC) return PROPOSALS_STORAGE_KEY;
  if (docId === FIRESTORE_CLIENTS_DOC || docId === FIRESTORE_CLIENTS_SYNC_DOC) return CLIENTS_STORAGE_KEY;
  if (docId === FIRESTORE_MACHINE_DB_DOC) return MACHINE_DB_STORAGE_KEY;
  if (docId?.startsWith?.(FIRESTORE_DRAFT_DOC_PREFIX)) {
    const userId = docId.slice(FIRESTORE_DRAFT_DOC_PREFIX.length);
    return userId ? `${DRAFT_STORAGE_KEY_PREFIX}${userId}` : "";
  }
  return "";
}

function normalizePendingSyncEntry(entry) {
  if (!entry || typeof entry !== "object" || !Object.prototype.hasOwnProperty.call(entry, "value")) return null;
  return {
    value: entry.value,
    retries: Math.max(0, Math.min(toNumber(entry.retries), SYNC_MAX_RETRIES)),
    nextRetryTime: Date.now()
  };
}

function readPendingSyncStorage() {
  try {
    const raw = window.localStorage?.getItem?.(PENDING_SYNC_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    removeLegacyStorageItem(PENDING_SYNC_STORAGE_KEY);
    return {};
  }
}

function persistPendingSyncQueue() {
  try {
    if (!window.localStorage) return;
    if (!pendingSyncQueue.size) {
      window.localStorage.removeItem(PENDING_SYNC_STORAGE_KEY);
      return;
    }
    const payload = {};
    for (const [docId, entry] of pendingSyncQueue.entries()) {
      payload[docId] = {
        value: entry.value,
        retries: entry.retries || 0,
        nextRetryTime: entry.nextRetryTime || Date.now()
      };
    }
    window.localStorage.setItem(PENDING_SYNC_STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn("Falha ao persistir fila de sincronização do Firestore:", error);
  }
}

function seedRuntimeStorageFromPendingDoc(docId, value) {
  const storageKey = getFirestoreStorageKey(docId);
  if (!storageKey) return;
  if ((docId === FIRESTORE_USERS_DOC || docId === FIRESTORE_USERS_SYNC_DOC) && Array.isArray(value)) {
    usersCache = normalizeUsersForStorage(value);
    return;
  }
  if (docId === FIRESTORE_MACHINE_DB_DOC && isPlainObject(value)) {
    runtimeStorage.set(storageKey, normalizeMachineDatabase(value));
    return;
  }
  runtimeStorage.set(storageKey, cloneStorageValue(value));
}

function loadPendingSyncQueueFromStorage() {
  const storedQueue = readPendingSyncStorage();
  Object.entries(storedQueue).forEach(([docId, entry]) => {
    const normalizedEntry = normalizePendingSyncEntry(entry);
    if (!normalizedEntry) return;
    pendingSyncQueue.set(docId, normalizedEntry);
    seedRuntimeStorageFromPendingDoc(docId, normalizedEntry.value);
  });
  if (pendingSyncQueue.size) {
    console.log(`[Firebase Sync] ${pendingSyncQueue.size} documento(s) pendente(s) restaurado(s) para sincronização.`);
  }
}

function getPendingSyncValue(docId) {
  if (!pendingSyncQueue.has(docId)) return undefined;
  return cloneStorageValue(pendingSyncQueue.get(docId).value);
}

function getFirestoreCollectionSyncDocId(collectionName) {
  if (collectionName === FIRESTORE_USERS_COLLECTION) return FIRESTORE_USERS_SYNC_DOC;
  if (collectionName === FIRESTORE_PROPOSALS_COLLECTION) return FIRESTORE_PROPOSALS_SYNC_DOC;
  if (collectionName === FIRESTORE_CLIENTS_COLLECTION) return FIRESTORE_CLIENTS_SYNC_DOC;
  return "";
}

function getFirestoreCollectionNameFromSyncDocId(docId) {
  if (docId === FIRESTORE_USERS_SYNC_DOC) return FIRESTORE_USERS_COLLECTION;
  if (docId === FIRESTORE_PROPOSALS_SYNC_DOC) return FIRESTORE_PROPOSALS_COLLECTION;
  if (docId === FIRESTORE_CLIENTS_SYNC_DOC) return FIRESTORE_CLIENTS_COLLECTION;
  return "";
}

function shouldSkipFirestoreSnapshot(docId, snap) {
  return pendingSyncQueue.has(docId) && !snap.metadata?.hasPendingWrites;
}

// Merges Firestore server records with locally-pending records. The server version
// always wins for any record that already exists remotely (same ID). Only records
// from pendingRecords whose IDs are absent from remoteRecords are appended, so
// that genuinely unsynced local additions are not lost while stale overwrites are
// prevented. For records with the same ID, the server copy is authoritative.
function mergeFirestoreCollectionData(remoteRecords, pendingRecords) {
  const base = Array.isArray(remoteRecords) ? remoteRecords : [];
  if (!Array.isArray(pendingRecords) || !pendingRecords.length) return base;
  const remoteIds = new Set(base.map((r) => r?.id).filter(Boolean));
  const unsynced = pendingRecords.filter((r) => r?.id && !remoteIds.has(r.id));
  return unsynced.length > 0 ? [...base, ...unsynced] : base;
}

function markPendingFirestoreSync(docId, value) {
  const existingEntry = pendingSyncQueue.get(docId);
  pendingSyncQueue.set(docId, {
    value,
    retries: existingEntry?.retries || 0,
    nextRetryTime: existingEntry?.nextRetryTime || Date.now() + SYNC_RETRY_DELAYS_MS[0]
  });
  persistPendingSyncQueue();
}

function toNumber(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  const raw = String(value ?? "").trim();
  if (!raw) return 0;

  const normalizedRaw = raw
    .replace(/\s/g, "")
    .replace(/[^\d,.-]/g, "");

  let normalized = normalizedRaw;
  const lastComma = normalized.lastIndexOf(",");
  const lastDot = normalized.lastIndexOf(".");

  if (lastComma >= 0 && lastDot >= 0) {
    normalized = lastComma > lastDot
      ? normalized.replace(/\./g, "").replace(",", ".")
      : normalized.replace(/,/g, "");
  } else if (lastComma >= 0) {
    const commasCount = (normalized.match(/,/g) || []).length;
    normalized = commasCount > 1
      ? normalized.replace(/,/g, "")
      : normalized.replace(",", ".");
  } else if (lastDot >= 0) {
    const dotsCount = (normalized.match(/\./g) || []).length;
    if (dotsCount > 1) {
      normalized = normalized.replace(/\./g, "");
    }
  }

  const number = parseFloat(normalized);
  return Number.isNaN(number) ? 0 : number;
}

function normalizeProposalStatus(value) {
  if (value === PROPOSAL_STATUS_FECHADA) return PROPOSAL_STATUS_FECHADA;
  if (value === PROPOSAL_STATUS_PERDIDA) return PROPOSAL_STATUS_PERDIDA;
  return PROPOSAL_STATUS_EM_ANDAMENTO;
}

function getProposalStatusMeta(status) {
  return PROPOSAL_STATUS_META[normalizeProposalStatus(status)] || PROPOSAL_STATUS_META[PROPOSAL_STATUS_EM_ANDAMENTO];
}

function onlyDigits(value) {
  return (value || "").replace(/\D/g, "");
}

function formatMoney(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function getCssVarColor(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function formatDate(value = new Date()) {
  return new Date(value).toLocaleDateString("pt-BR");
}

function toPositiveIntegerOrFallback(value, fallback = 0) {
  const number = Math.round(toNumber(value));
  return number > 0 ? number : fallback;
}

function pluralize(count, singular, plural) {
  return Number(count) === 1 ? singular : plural;
}

function formatConsumableSetsAndItems(sets, items, itemSingular, itemPlural) {
  return `${sets} ${pluralize(sets, "jogo", "jogos")} / ${items} ${pluralize(items, itemSingular, itemPlural)}`;
}

function getTipoContratacaoLabel(value) {
  const labels = {
    [CONTRACT_TYPE_LABOR]: "Apenas mão de obra",
    [CONTRACT_TYPE_LABOR_MATERIAL]: "Mão de obra e material"
  };
  return labels[value] || labels[CONTRACT_TYPE_LABOR];
}

function createUniqueId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  if (window.crypto?.getRandomValues) {
    const bytes = window.crypto.getRandomValues(new Uint8Array(16));
    return `${Date.now()}-${bytesToHex(bytes)}`;
  }
  idGenerationFallbackCounter += 1;
  const elapsed = Math.floor((window.performance?.now?.() || 0) * 1000);
  return `fallback-${elapsed}-${idGenerationFallbackCounter}`;
}

function normalizeEmail(value) {
  return (value || "").trim().toLowerCase();
}

function normalizeFilterText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function getFilterQuery(fieldId) {
  const field = $(fieldId);
  return normalizeFilterText(field?.value || "");
}

function matchesFilter(values, query) {
  if (!query) return true;
  return normalizeFilterText(values.join(" ")).includes(query);
}

function formatRole(role) {
  if (normalizeUserRole(role) === ROLE_ADMIN) return "Administrador";
  return "Vendedor";
}

function normalizeUserRole(role) {
  return role === ROLE_ADMIN ? role : ROLE_SELLER;
}

function normalizeClientRecord(client = {}) {
  if (!client || typeof client !== "object" || Array.isArray(client)) return null;
  return {
    ...client,
    id: client.id || "",
    name: String(client.name || client.cliente || "").trim(),
    document: String(client.document || client.documento || "").trim(),
    email: normalizeEmail(client.email || ""),
    phone: String(client.phone || client.telefone || "").trim(),
    project: String(client.project || client.obra || "").trim(),
    cep: String(client.cep || "").trim(),
    address: String(client.address || client.endereco || "").trim(),
    ownerId: client.ownerId || "",
    ownerName: String(client.ownerName || "").trim(),
    ownerEmail: normalizeEmail(client.ownerEmail || ""),
    filial: String(client.filial || DEFAULT_FILIAL).trim() || DEFAULT_FILIAL,
    createdAt: toNumber(client.createdAt),
    updatedAt: toNumber(client.updatedAt)
  };
}

function readJsonStorage(key, fallback) {
  try {
    // First try runtime storage (in-memory cache)
    if (runtimeStorage.has(key)) {
      const value = cloneStorageValue(runtimeStorage.get(key));
      return value === undefined ? fallback : value;
    }

    // Fallback to localStorage for persistence across page reloads
    if (window.localStorage) {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const value = JSON.parse(raw);
        // Also cache in runtimeStorage for faster access
        runtimeStorage.set(key, cloneStorageValue(value));
        return value === undefined ? fallback : value;
      }
    }

    return fallback;
  } catch {
    runtimeStorage.delete(key);
    // Also remove corrupted data from localStorage to prevent re-parsing on next read
    if (window.localStorage) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Ignore localStorage removal failures
      }
    }
    return fallback;
  }
}

function writeJsonStorage(key, value) {
  try {
    const cloned = cloneStorageValue(value);
    if (!window.localStorage) throw new Error("localStorage indisponível");
    window.localStorage.setItem(key, JSON.stringify(cloned));
    runtimeStorage.set(key, cloned);
    return true;
  } catch {
    showToast("Falha ao salvar dados no armazenamento local.", true);
    return false;
  }
}

function removeStorageItem(key) {
  runtimeStorage.delete(key);
  // Also remove from localStorage to keep in sync
  if (window.localStorage) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore localStorage removal failures
    }
  }
}

function readLegacyJsonStorage(key, fallback) {
  try {
    const raw = window.localStorage?.getItem?.(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    removeLegacyStorageItem(key);
    return fallback;
  }
}

function removeLegacyStorageItem(key) {
  try {
    window.localStorage?.removeItem?.(key);
  } catch {
    // Ignora falhas ao limpar legado.
  }
}

function clearLegacyDraftStorage(userId = currentUserId) {
  if (userId) {
    removeLegacyStorageItem(getDraftStorageKey(userId));
  }
  removeLegacyStorageItem(LEGACY_DRAFT_STORAGE_KEY);
}

function getDraftFirestoreDocId(userId = currentUserId) {
  return userId ? `${FIRESTORE_DRAFT_DOC_PREFIX}${userId}` : "";
}

function toTimestampMillis(value) {
  if (value?.toMillis) {
    return value.toMillis();
  }
  if (value == null || value === "") {
    return null;
  }
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

function createFirestoreServerTimestamp() {
  return window.firebase?.firestore?.FieldValue?.serverTimestamp?.() || null;
}

function normalizeDraftPayload(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const snapshot = value.snapshot && typeof value.snapshot === "object" && !Array.isArray(value.snapshot)
    ? value.snapshot
    : value;
  const updatedAtClient = toTimestampMillis(value.updatedAtClient) ?? toTimestampMillis(value.updatedAt) ?? Date.now();
  const updatedAtServer = toTimestampMillis(value.updatedAtServer);
  return {
    updatedAt: updatedAtClient,
    updatedAtClient,
    updatedAtServer,
    pendingSync: (updatedAtServer === null || updatedAtServer === undefined) ? Boolean(value.pendingSync) : false,
    snapshot
  };
}

function readDraftPayloadFromStorage(userId = currentUserId) {
  if (!userId) return null;
  return normalizeDraftPayload(readJsonStorage(getDraftStorageKey(userId), null));
}

function writeDraftPayloadToStorage(payload, userId = currentUserId) {
  if (!userId) return false;
  const normalized = normalizeDraftPayload(payload);
  if (!normalized) return false;
  return writeJsonStorage(getDraftStorageKey(userId), normalized);
}

function updateFirebaseStatus(status) {
  const el = $("firebaseStatus");
  if (!el) return;
  if (status === FIREBASE_STATUS_LOCAL) {
    el.textContent = "💾 Armazenamento local: ativo";
    el.className = "firebase-status firebase-status-ok";
    el.title = "Dados salvos neste dispositivo";
    return;
  }
  const normalizedStatus = status === true
    ? FIREBASE_STATUS_CONNECTED
    : status === false
      ? FIREBASE_STATUS_DISCONNECTED
      : status;
  if (normalizedStatus === FIREBASE_STATUS_CONNECTED) {
    el.textContent = "☁ Firebase: conectado";
    el.className = "firebase-status firebase-status-ok";
    el.title = "Dados sincronizados com o servidor";
    return;
  }
  if (normalizedStatus === FIREBASE_STATUS_RECONNECTING) {
    el.textContent = "☁ Firebase: reconectando…";
    el.className = "firebase-status firebase-status-syncing";
    el.title = "Conexão com o servidor instável — tentando restabelecer sem perder dados";
    return;
  }
  el.textContent = "⚠ Firebase: desconectado";
  el.className = "firebase-status firebase-status-off";
  el.title = "Sem conexão com o servidor — alterações de tabelas ficam na fila local e serão enviadas ao reconectar";
}

function clearFirestoreListeners() {
  firestoreUnsubscribers.forEach((unsub) => unsub());
  firestoreUnsubscribers = [];
}

function clearFirebaseReconnectTimeout() {
  if (firebaseReconnectTimeoutId == null) return;
  window.clearTimeout(firebaseReconnectTimeoutId);
  firebaseReconnectTimeoutId = null;
}

function retryPendingFirestoreSync(docId, value) {
  const collectionName = getFirestoreCollectionNameFromSyncDocId(docId);
  if (collectionName) {
    syncFirestoreCollectionRecords(collectionName, value);
    return;
  }
  syncFirestoreDoc(docId, value);
}

function startPendingSyncCheck() {
  // Periodically check and sync pending draft data and failed document syncs
  if (documentSyncCheckIntervalId) return;

  documentSyncCheckIntervalId = window.setInterval(() => {
    // Sync pending drafts
    if (currentUserId && firebaseSyncEnabled && firestoreDb) {
      const draftPayload = readDraftPayloadFromStorage();
      if (draftPayload?.pendingSync) {
        console.log("[Firebase Sync] Tentando sincronizar rascunho pendente...");
        syncFirestoreDraftPayload(draftPayload);
      }
    }

    // Retry failed document syncs
    if (firebaseSyncEnabled && firestoreDb && pendingSyncQueue.size > 0) {
      const now = Date.now();
      for (const [docId, entry] of pendingSyncQueue.entries()) {
        if (now >= entry.nextRetryTime) {
          console.log(`[Firebase Sync] Retentando sincronizar ${docId} (tentativa ${entry.retries + 1}/${SYNC_MAX_RETRIES})...`);
          retryPendingFirestoreSync(docId, entry.value);
        }
      }
    }
  }, 5000); // Check every 5 seconds for faster retry detection
}

function stopPendingSyncCheck() {
  if (documentSyncCheckIntervalId) {
    window.clearInterval(documentSyncCheckIntervalId);
    documentSyncCheckIntervalId = null;
  }
  if (pendingSyncCheckIntervalId) {
    window.clearInterval(pendingSyncCheckIntervalId);
    pendingSyncCheckIntervalId = null;
  }
}

function refreshAppFromStorage() {
  refreshCurrentUser();
  renderUsersTable();
  renderClientsTable();
  populateProposalClientSelect();
  updateSessionInfo();
  updateAppVisibility();
  renderizarTabelaPropostas();
  renderDashboard();
}

function isFirebaseConnectionReady() {
  return Boolean(firebaseSyncEnabled && firestoreDb);
}

async function reconnectFirebase() {
  if (firebaseReconnectPromise) return firebaseReconnectPromise;

  firebaseReconnectPromise = (async () => {
    const connected = initializeFirebaseConnection();
    if (!connected) return false;
    try {
      // Allow Firestore client time to establish network connection before reading documents
      await new Promise((resolve) => setTimeout(resolve, FIREBASE_INIT_CONNECTION_DELAY_MS));
      await bootstrapStorageFromFirebase();
      subscribeFirestoreChanges();

      // Flush pending sync queue after successful reconnection
      if (pendingSyncQueue.size > 0) {
        console.log(`[Firebase Sync] Sincronizando ${pendingSyncQueue.size} documentos da fila de retentativa...`);
        for (const [docId, entry] of pendingSyncQueue.entries()) {
          console.log(`[Firebase Sync] Sincronizando ${docId} da fila de retentativa...`);
          retryPendingFirestoreSync(docId, entry.value);
        }
      }

      if (currentUserId) {
        startPendingSyncCheck();
        refreshAppFromStorage();
        await carregarRascunhoLocal();
      } else {
        await restoreSession();
      }
      updateFirebaseStatus(FIREBASE_STATUS_CONNECTED);
      return true;
    } catch (error) {
      handleFirebaseConnectionError("Falha ao sincronizar dados após reconectar Firebase:", error);
      return false;
    } finally {
      firebaseReconnectPromise = null;
    }
  })();

  return firebaseReconnectPromise;
}

function scheduleFirebaseReconnect() {
  if (firebaseReconnectTimeoutId != null) return;
  if (!window.firebase?.firestore) {
    updateFirebaseStatus(FIREBASE_STATUS_DISCONNECTED);
    return;
  }
  updateFirebaseStatus(FIREBASE_STATUS_RECONNECTING);
  firebaseReconnectTimeoutId = window.setTimeout(async () => {
    firebaseReconnectTimeoutId = null;
    try {
      const connected = await reconnectFirebase();
      if (!connected) scheduleFirebaseReconnect();
    } catch (error) {
      handleFirebaseConnectionError("Falha ao tentar reconectar Firebase automaticamente:", error);
      scheduleFirebaseReconnect();
    }
  }, FIREBASE_RECONNECT_DELAY_MS);
}

function handleFirebaseConnectionError(message, error) {
  console.error(message, error);
  firestoreDb = null;
  firebaseSyncEnabled = false;
  clearFirestoreListeners();
  if (!window.firebase?.firestore || window.navigator?.onLine === false) {
    updateFirebaseStatus(FIREBASE_STATUS_DISCONNECTED);
  } else {
    updateFirebaseStatus(FIREBASE_STATUS_RECONNECTING);
  }
  scheduleFirebaseReconnect();
}

function withTimeout(promise, timeoutMs, timeoutMessage) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => {
      reject(new Error(timeoutMessage));
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise])
    .finally(() => window.clearTimeout(timeoutId));
}

function handleFirebaseSyncError(docId, error, value) {
  // Non-fatal: sync failed but connection is still valid
  console.warn(`Falha ao sincronizar ${docId}, agendando retentativa:`, error);

  if (!pendingSyncQueue.has(docId)) {
    pendingSyncQueue.set(docId, {
      value: value,
      retries: 0,
      nextRetryTime: Date.now() + SYNC_RETRY_DELAYS_MS[0]
    });
    console.log(`[Firebase Sync] Adicionado à fila de retentativa: ${docId}`);
  } else {
    const entry = pendingSyncQueue.get(docId);
    entry.value = value; // Update with latest value
    entry.retries = Math.min(entry.retries + 1, SYNC_MAX_RETRIES);
    const delayIndex = Math.min(entry.retries, SYNC_RETRY_DELAYS_MS.length - 1);
    entry.nextRetryTime = Date.now() + SYNC_RETRY_DELAYS_MS[delayIndex];
    console.log(`[Firebase Sync] Retentativa ${entry.retries}/${SYNC_MAX_RETRIES} para ${docId}, próxima em ${SYNC_RETRY_DELAYS_MS[delayIndex]}ms`);
  }
  persistPendingSyncQueue();

  // Don't disable Firebase on individual sync failures
  // Just schedule a reconnect check if offline
  if (!firebaseSyncEnabled) {
    scheduleFirebaseReconnect();
  }
}

function getUserCreatorName(user = {}) {
  return user.createdByName || "Sistema";
}

function canDeleteUser(user, actor = currentUser) {
  if (!isAdmin(actor) || !user) return false;
  if (user.id === actor.id) return false;
  if (isAdmin(actor)) return user.createdBy === actor.id;
  return false;
}

function isPlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function shouldPreserveUsersCache(normalizedUsers) {
  // Evita substituir um cache válido por lista vazia durante leituras transitórias do Firestore.
  return Boolean(
    currentUserId
    && currentUser
    && normalizedUsers?.length === 0
    && usersCache.length
  );
}

function shouldFallbackToInMemoryUser(storedUser) {
  // Se o Firestore caiu após o login, mantém o usuário já validado em memória até a reconexão.
  return Boolean(
    !storedUser
    && currentUser
    && !firebaseSyncEnabled
    && (isAdmin(currentUser) || currentUser.active)
  );
}

function initializeFirebaseConnection() {
  if (!window.firebase?.firestore) {
    console.warn("[Firebase Init] Firebase Firestore SDK não carregado");
    updateFirebaseStatus(false);
    return false;
  }

  try {
    console.log("[Firebase Init] Inicializando Firebase...");
    if (!window.firebase.apps?.length) {
      console.debug("[Firebase Init] Inicializando app Firebase com config...");
      window.firebase.initializeApp(FIREBASE_CONFIG);
    }
    firestoreDb = window.firebase.firestore();
    if (!firestoreSettingsApplied) {
      console.debug("[Firebase Init] Aplicando configurações Firestore...");
      firestoreDb.settings(FIRESTORE_SETTINGS);
      firestoreSettingsApplied = true;
    }
    firebaseSyncEnabled = true;
    clearFirebaseReconnectTimeout();
    console.log("[Firebase Init] ✓ Firebase inicializado; aguardando sincronização inicial");
    updateFirebaseStatus(FIREBASE_STATUS_RECONNECTING);
    return true;
  } catch (error) {
    console.error("[Firebase Init] ✗ Erro ao inicializar Firebase:", error?.code, error?.message);
    handleFirebaseConnectionError("Falha ao inicializar Firebase:", error);
    return false;
  }
}

function getFirestoreDoc(docId) {
  if (!firebaseSyncEnabled || !firestoreDb) return null;
  return firestoreDb.collection(FIRESTORE_COLLECTION).doc(docId);
}

function getFirestoreCollection(collectionName) {
  if (!firebaseSyncEnabled || !firestoreDb) return null;
  return firestoreDb.collection(collectionName);
}

function sortFirestoreCollectionRecords(collectionName, records) {
  const list = Array.isArray(records) ? [...records] : [];
  if (collectionName === FIRESTORE_USERS_COLLECTION) {
    return list.sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "pt-BR"));
  }
  if (collectionName === FIRESTORE_PROPOSALS_COLLECTION) {
    return list.sort((a, b) => toNumber(b.timestamp) - toNumber(a.timestamp));
  }
  if (collectionName === FIRESTORE_CLIENTS_COLLECTION) {
    return list.sort((a, b) => toNumber(b.updatedAt || b.createdAt) - toNumber(a.updatedAt || a.createdAt));
  }
  return list;
}

function chooseFirestoreCollectionSource(collectionRecords, legacyRecords) {
  if (Array.isArray(collectionRecords) && collectionRecords.length > 0) return collectionRecords;
  if (Array.isArray(legacyRecords) && legacyRecords.length > 0) return legacyRecords;
  return Array.isArray(collectionRecords) ? collectionRecords : null;
}

async function readFirestoreDoc(docId, fallback) {
  const ref = getFirestoreDoc(docId);
  if (!ref) {
    console.warn(`[Firebase Read] Não foi possível obter referência para ${docId}`);
    return fallback;
  }
  try {
    console.debug(`[Firebase Read] Lendo ${docId}...`);
    const snap = await withTimeout(
      ref.get(),
      FIREBASE_OPERATION_TIMEOUT_MS,
      `Tempo esgotado ao ler ${docId}`
    );
    if (snap.exists) {
      console.log(`[Firebase Read] ✓ Sucesso ao ler ${docId}`);
      return snap.data()?.data ?? fallback;
    } else {
      console.debug(`[Firebase Read] Documento não existe: ${docId}, usando fallback`);
      return fallback;
    }
  } catch (error) {
    console.warn(`[Firebase Read] ✗ Erro ao ler ${docId}:`, error?.code, error?.message);
    if (error?.code === "unavailable" || window.navigator?.onLine === false) {
      scheduleFirebaseReconnect();
    }
    return fallback;
  }
}

async function readFirestoreCollectionRecords(collectionName, fallback = []) {
  const ref = getFirestoreCollection(collectionName);
  if (!ref) {
    console.warn(`[Firebase Read] Não foi possível obter referência para a coleção ${collectionName}`);
    return fallback;
  }
  try {
    console.debug(`[Firebase Read] Lendo coleção ${collectionName}...`);
    const snap = await withTimeout(
      ref.get(),
      FIREBASE_OPERATION_TIMEOUT_MS,
      `Tempo esgotado ao ler coleção ${collectionName}`
    );
    const records = [];
    snap.forEach((docSnap) => {
      records.push({ id: docSnap.id, ...docSnap.data() });
    });
    console.log(`[Firebase Read] ✓ Sucesso ao ler coleção ${collectionName}`);
    return sortFirestoreCollectionRecords(collectionName, records);
  } catch (error) {
    console.warn(`[Firebase Read] ✗ Erro ao ler coleção ${collectionName}:`, error?.code, error?.message);
    if (error?.code === "unavailable" || window.navigator?.onLine === false) {
      scheduleFirebaseReconnect();
    }
    return fallback;
  }
}

function syncFirestoreDoc(docId, value) {
  if (!firebaseSyncEnabled) return;
  const ref = getFirestoreDoc(docId);
  if (!ref) {
    console.debug(`[Firebase Sync] Firestore não conectado, adicionando ${docId} à fila de retentativa`);
    handleFirebaseSyncError(docId, new Error("Firestore not connected"), value);
    return;
  }

  console.debug(`[Firebase Sync] Sincronizando ${docId}...`);
  markPendingFirestoreSync(docId, value);
  withTimeout(
    ref.set({ data: value }),
    FIREBASE_OPERATION_TIMEOUT_MS,
    `Tempo esgotado ao sincronizar ${docId}`
  )
    .then(() => {
      console.log(`[Firebase Sync] ✓ Sucesso ao sincronizar ${docId}`);
      // Remove from retry queue on success
      if (pendingSyncQueue.has(docId)) {
        pendingSyncQueue.delete(docId);
        persistPendingSyncQueue();
        console.log(`[Firebase Sync] Removido ${docId} da fila de retentativa`);
      }
    })
    .catch((error) => {
      console.warn(`[Firebase Sync] ✗ Erro ao sincronizar ${docId}:`, error?.code, error?.message);
      handleFirebaseSyncError(docId, error, value);
    });
}

function syncFirestoreCollectionRecords(collectionName, records) {
  const syncDocId = getFirestoreCollectionSyncDocId(collectionName);
  let generatedMissingIds = false;
  const list = (Array.isArray(records) ? records : []).map((record) => {
    if (record?.id) return record;
    generatedMissingIds = true;
    const baseRecord = record && typeof record === "object" ? record : {};
    return { ...baseRecord, id: createUniqueId() };
  });
  if (generatedMissingIds) {
    if (collectionName === FIRESTORE_USERS_COLLECTION) {
      usersCache = normalizeUsersForStorage(list);
    } else if (collectionName === FIRESTORE_PROPOSALS_COLLECTION) {
      writeJsonStorage(PROPOSALS_STORAGE_KEY, list);
    } else if (collectionName === FIRESTORE_CLIENTS_COLLECTION) {
      writeJsonStorage(CLIENTS_STORAGE_KEY, list);
    }
  }
  const ref = getFirestoreCollection(collectionName);
  if (!firebaseSyncEnabled) return Promise.resolve();
  if (!ref) {
    console.debug(`[Firebase Sync] Firestore não conectado, adicionando coleção ${collectionName} à fila de retentativa`);
    if (syncDocId) handleFirebaseSyncError(syncDocId, new Error("Firestore not connected"), list);
    return Promise.resolve();
  }

  if (!syncDocId) return Promise.resolve();
  console.debug(`[Firebase Sync] Sincronizando coleção ${collectionName}...`);
  markPendingFirestoreSync(syncDocId, list);

  const writePromise = ref.get().then((snap) => {
    const batch = firestoreDb.batch();
    const currentIds = new Set();
    snap.forEach((docSnap) => currentIds.add(docSnap.id));

    list.forEach((record) => {
      currentIds.delete(record.id);
      batch.set(ref.doc(record.id), record);
    });

    currentIds.forEach((id) => {
      batch.delete(ref.doc(id));
    });

    return batch.commit();
  });

  return withTimeout(
    writePromise,
    FIREBASE_OPERATION_TIMEOUT_MS,
    `Tempo esgotado ao sincronizar coleção ${collectionName}`
  )
    .then(() => {
      console.log(`[Firebase Sync] ✓ Sucesso ao sincronizar coleção ${collectionName}`);
      if (pendingSyncQueue.has(syncDocId)) {
        pendingSyncQueue.delete(syncDocId);
        persistPendingSyncQueue();
        console.log(`[Firebase Sync] Removido ${syncDocId} da fila de retentativa`);
      }
    })
    .catch((error) => {
      console.warn(`[Firebase Sync] ✗ Erro ao sincronizar coleção ${collectionName}:`, error?.code, error?.message);
      handleFirebaseSyncError(syncDocId, error, list);
    });
}

function removeLegacyAggregateFirestoreDocs() {
  [FIRESTORE_USERS_DOC, FIRESTORE_PROPOSALS_DOC, FIRESTORE_CLIENTS_DOC].forEach((docId) => {
    const ref = getFirestoreDoc(docId);
    if (!ref) return;
    ref.delete().catch((error) => {
      console.warn(`Falha ao remover documento legado ${docId}:`, error);
    });
  });
}

function syncFirestoreDocAsync(docId, value) {
  return new Promise((resolve) => {
    const ref = getFirestoreDoc(docId);
    if (!ref) {
      console.debug(`[Firebase Sync] Firestore não conectado, agendando retentativa para ${docId}`);
      handleFirebaseSyncError(docId, new Error("Firestore not connected"), value);
      resolve();
      return;
    }

    console.debug(`[Firebase Sync] Sincronizando ${docId} (async)...`);
    markPendingFirestoreSync(docId, value);
    withTimeout(
      ref.set({ data: value }),
      FIREBASE_OPERATION_TIMEOUT_MS,
      `Tempo esgotado ao sincronizar ${docId}`
    )
      .then(() => {
        console.log(`[Firebase Sync] ✓ Sucesso ao sincronizar ${docId} (async)`);
        if (pendingSyncQueue.has(docId)) {
          pendingSyncQueue.delete(docId);
          persistPendingSyncQueue();
          console.log(`[Firebase Sync] Removido ${docId} da fila de retentativa`);
        }
        resolve();
      })
      .catch((error) => {
        console.warn(`[Firebase Sync] ✗ Erro ao sincronizar ${docId} (async):`, error?.code, error?.message);
        handleFirebaseSyncError(docId, error, value);
        resolve();
      });
  });
}


async function readFirestoreDraftPayload(userId = currentUserId) {
  const docId = getDraftFirestoreDocId(userId);
  if (!docId) return null;
  const ref = getFirestoreDoc(docId);
  if (!ref) return null;
  try {
    const snap = await withTimeout(
      ref.get(),
      FIREBASE_OPERATION_TIMEOUT_MS,
      `Tempo esgotado ao ler ${docId}`
    );
    if (!snap.exists) return null;
    const data = snap.data() || {};
    return normalizeDraftPayload({
      ...(data.data && typeof data.data === "object" ? data.data : {}),
      updatedAtServer: data.updatedAtServer
    });
  } catch (error) {
    console.warn(`[Firebase Read] ✗ Erro ao ler ${docId}:`, error?.code, error?.message);
    if (error?.code === "unavailable" || window.navigator?.onLine === false) {
      scheduleFirebaseReconnect();
    }
    return null;
  }
}

function syncFirestoreDraftPayload(payload, userId = currentUserId) {
  if (!firebaseSyncEnabled) return;
  const docId = getDraftFirestoreDocId(userId);
  const normalized = normalizeDraftPayload(payload);
  if (!docId || !normalized) return;
  const ref = getFirestoreDoc(docId);
  if (!ref) {
    scheduleFirebaseReconnect();
    return;
  }
  const serverTimestamp = createFirestoreServerTimestamp();
  if (!serverTimestamp) {
    scheduleFirebaseReconnect();
    return;
  }
  withTimeout(
    ref.set({
      data: {
        updatedAt: normalized.updatedAtClient,
        updatedAtClient: normalized.updatedAtClient,
        pendingSync: false,
        snapshot: normalized.snapshot
      },
      updatedAtServer: serverTimestamp
    }),
    FIREBASE_OPERATION_TIMEOUT_MS,
    `Tempo esgotado ao sincronizar ${docId}`
  ).catch((error) => {
    console.warn(`Falha ao sincronizar ${docId}:`, error);
    // Ensure the draft is marked as pending sync in local storage if sync fails
    const payloadWithPending = {
      ...normalized,
      pendingSync: true,
      updatedAtClient: normalized.updatedAtClient
    };
    writeDraftPayloadToStorage(payloadWithPending, userId);
    if (error?.code === "unavailable" || window.navigator?.onLine === false) {
      scheduleFirebaseReconnect();
    }
  });
}


function clearFirestoreDraft(userId = currentUserId) {
  const docId = getDraftFirestoreDocId(userId);
  if (!docId) return;
  removeStorageItem(getDraftStorageKey(userId));
  clearLegacyDraftStorage(userId);
  const ref = getFirestoreDoc(docId);
  if (!ref) return;
  ref.delete().catch((error) => {
    console.warn(`Falha ao remover ${docId}:`, error);
  });
}

function subscribeFirestoreChanges() {
  clearFirestoreListeners();

  if (!firebaseSyncEnabled || !firestoreDb) return;

  const col = firestoreDb.collection(FIRESTORE_COLLECTION);
  const initializeDocument = (docId, defaultValue) => {
    col.doc(docId).get().then((snap) => {
      if (!snap.exists) {
        col.doc(docId).set({ data: defaultValue }).catch((error) => {
          console.warn(`Falha ao inicializar documento ${docId}:`, error);
        });
      }
    }).catch((error) => {
      console.warn(`Falha ao verificar documento ${docId}:`, error);
    });
  };

  initializeDocument(FIRESTORE_MACHINE_DB_DOC, readJsonStorage(MACHINE_DB_STORAGE_KEY, DEFAULT_MACHINE_DATABASE));

  const subscribeRecordCollection = (collectionName, onRecords, errorMessage) => {
    const collectionRef = getFirestoreCollection(collectionName);
    if (!collectionRef) return;
    firestoreUnsubscribers.push(
      collectionRef.onSnapshot((snapshot) => {
        const records = [];
        snapshot.forEach((docSnap) => {
          records.push({ id: docSnap.id, ...docSnap.data() });
        });
        const sorted = sortFirestoreCollectionRecords(collectionName, records);
        // When the server confirms the snapshot, update the pending entry so that
        // stale retries don't overwrite newer server data. Only records absent
        // from the server (genuinely unsynced) are kept in the pending value.
        if (!snapshot.metadata.fromCache && !snapshot.metadata.hasPendingWrites) {
          const syncDocId = getFirestoreCollectionSyncDocId(collectionName);
          if (syncDocId && pendingSyncQueue.has(syncDocId)) {
            const entry = pendingSyncQueue.get(syncDocId);
            const merged = mergeFirestoreCollectionData(sorted, entry.value);
            pendingSyncQueue.set(syncDocId, { ...entry, value: merged });
            persistPendingSyncQueue();
          }
        }
        onRecords(sorted);
      }, (error) => {
        handleFirebaseConnectionError(errorMessage, error);
      })
    );
  };

  subscribeRecordCollection(FIRESTORE_USERS_COLLECTION, (records) => {
    const normalizedUsers = normalizeUsersForStorage(records);
    if (shouldPreserveUsersCache(normalizedUsers)) {
      console.warn(PRESERVE_USERS_CACHE_WARNING);
      return;
    }
    usersCache = normalizedUsers;
    removeLegacyStorageItem(USERS_STORAGE_KEY);
    if (currentUserId) {
      refreshCurrentUser();
      renderUsersTable();
      renderClientsTable();
      populateProposalClientSelect();
      updateSessionInfo();
      updateAppVisibility();
    }
  }, "Erro ao escutar usuários:");

  subscribeRecordCollection(FIRESTORE_PROPOSALS_COLLECTION, (records) => {
    writeJsonStorage(PROPOSALS_STORAGE_KEY, records);
    removeLegacyStorageItem(PROPOSALS_STORAGE_KEY);
    if (currentUserId) {
      renderizarTabelaPropostas();
      renderDashboard();
    }
  }, "Erro ao escutar propostas:");

  subscribeRecordCollection(FIRESTORE_CLIENTS_COLLECTION, (records) => {
    writeJsonStorage(CLIENTS_STORAGE_KEY, records);
    removeLegacyStorageItem(CLIENTS_STORAGE_KEY);
    if (currentUserId) {
      renderClientsTable();
      populateProposalClientSelect();
    }
  }, "Erro ao escutar clientes:");

  firestoreUnsubscribers.push(
    col.doc(FIRESTORE_MACHINE_DB_DOC).onSnapshot((snap) => {
      if (!snap.exists) return;
      if (shouldSkipFirestoreSnapshot(FIRESTORE_MACHINE_DB_DOC, snap)) return;
      const data = snap.data()?.data;
      if (!data || typeof data !== "object" || Array.isArray(data)) return;
      writeJsonStorage(MACHINE_DB_STORAGE_KEY, normalizeMachineDatabase(data));
      removeLegacyStorageItem(MACHINE_DB_STORAGE_KEY);
    }, (error) => {
      handleFirebaseConnectionError("Erro ao escutar banco de máquinas:", error);
    })
  );

  const draftDocId = getDraftFirestoreDocId();
  if (!draftDocId) return;

  firestoreUnsubscribers.push(
    col.doc(draftDocId).onSnapshot((snap) => {
      if (!snap.exists) {
        removeStorageItem(getDraftStorageKey());
        clearLegacyDraftStorage();
        updateDraftStatus("Rascunho limpo.");
        return;
      }
      if (snap.metadata?.hasPendingWrites) return;

      const data = snap.data() || {};
      const payload = normalizeDraftPayload({
        ...(data.data && typeof data.data === "object" ? data.data : {}),
        updatedAtServer: data.updatedAtServer
      });
      if (!payload) return;

      const localPayload = readDraftPayloadFromStorage();
      if (
        localPayload?.pendingSync
        && localPayload.updatedAtClient !== null
        && localPayload.updatedAtClient !== undefined
        && localPayload.updatedAtClient > payload.updatedAtClient
      ) return;

      writeDraftPayloadToStorage(payload);
      clearLegacyDraftStorage();
      if (!currentUserId) return;

      if (JSON.stringify(payload.snapshot) !== JSON.stringify(proposalFieldsSnapshot())) {
        applyProposalSnapshot(payload.snapshot);
      }
      updateDraftStatus("Rascunho sincronizado com o Firestore.");
    }, (error) => {
      handleFirebaseConnectionError("Erro ao escutar rascunho:", error);
    })
  );
}

async function bootstrapStorageFromFirebase() {
  if (!firebaseSyncEnabled) return;

  try {
    const [
      usersCollection,
      proposalsCollection,
      clientsCollection,
      machineDb,
      legacyUsersDoc,
      legacyProposalsDoc,
      legacyClientsDoc
    ] = await Promise.all([
      readFirestoreCollectionRecords(FIRESTORE_USERS_COLLECTION, []),
      readFirestoreCollectionRecords(FIRESTORE_PROPOSALS_COLLECTION, []),
      readFirestoreCollectionRecords(FIRESTORE_CLIENTS_COLLECTION, []),
      readFirestoreDoc(FIRESTORE_MACHINE_DB_DOC, null),
      readFirestoreDoc(FIRESTORE_USERS_DOC, null),
      readFirestoreDoc(FIRESTORE_PROPOSALS_DOC, null),
      readFirestoreDoc(FIRESTORE_CLIENTS_DOC, null)
    ]);

    const pendingUsers = getPendingSyncValue(FIRESTORE_USERS_SYNC_DOC) ?? getPendingSyncValue(FIRESTORE_USERS_DOC);
    const remoteUsers = chooseFirestoreCollectionSource(usersCollection, legacyUsersDoc);
    if (Array.isArray(pendingUsers) || Array.isArray(remoteUsers)) {
      // Always start from server data; only add locally-pending records not yet on the server.
      const mergedUsers = mergeFirestoreCollectionData(remoteUsers, pendingUsers);
      const normalizedUsers = normalizeUsersForStorage(mergedUsers);
      if (shouldPreserveUsersCache(normalizedUsers)) {
        console.warn(PRESERVE_USERS_CACHE_WARNING);
      } else {
        usersCache = normalizedUsers;
      }
    } else {
      const legacyUsers = readLegacyJsonStorage(USERS_STORAGE_KEY, null);
      if (legacyUsers && Array.isArray(legacyUsers) && legacyUsers.length) {
        usersCache = normalizeUsersForStorage(legacyUsers);
      } else if (!usersCache.length) {
        usersCache = [];
      }
    }
    removeLegacyStorageItem(USERS_STORAGE_KEY);

    const pendingProposals = getPendingSyncValue(FIRESTORE_PROPOSALS_SYNC_DOC) ?? getPendingSyncValue(FIRESTORE_PROPOSALS_DOC);
    const remoteProposals = chooseFirestoreCollectionSource(proposalsCollection, legacyProposalsDoc);
    if (Array.isArray(pendingProposals) || Array.isArray(remoteProposals)) {
      // Always start from server data; only add locally-pending records not yet on the server.
      writeJsonStorage(PROPOSALS_STORAGE_KEY, mergeFirestoreCollectionData(remoteProposals, pendingProposals));
    } else {
      const legacyProposals = readLegacyJsonStorage(PROPOSALS_STORAGE_KEY, null);
      const currentProposals = readJsonStorage(PROPOSALS_STORAGE_KEY, []);
      if (legacyProposals && Array.isArray(legacyProposals) && legacyProposals.length) {
        writeJsonStorage(PROPOSALS_STORAGE_KEY, legacyProposals);
      } else if (currentProposals.length) {
        writeJsonStorage(PROPOSALS_STORAGE_KEY, currentProposals);
      } else {
        writeJsonStorage(PROPOSALS_STORAGE_KEY, []);
      }
    }
    removeLegacyStorageItem(PROPOSALS_STORAGE_KEY);

    const pendingClients = getPendingSyncValue(FIRESTORE_CLIENTS_SYNC_DOC) ?? getPendingSyncValue(FIRESTORE_CLIENTS_DOC);
    const remoteClients = chooseFirestoreCollectionSource(clientsCollection, legacyClientsDoc);
    if (Array.isArray(pendingClients) || Array.isArray(remoteClients)) {
      // Always start from server data; only add locally-pending records not yet on the server.
      writeJsonStorage(CLIENTS_STORAGE_KEY, mergeFirestoreCollectionData(remoteClients, pendingClients));
    } else {
      const legacyClients = readLegacyJsonStorage(CLIENTS_STORAGE_KEY, null);
      const currentClients = readJsonStorage(CLIENTS_STORAGE_KEY, []);
      if (legacyClients && Array.isArray(legacyClients) && legacyClients.length) {
        writeJsonStorage(CLIENTS_STORAGE_KEY, legacyClients);
      } else if (currentClients.length) {
        writeJsonStorage(CLIENTS_STORAGE_KEY, currentClients);
      } else {
        writeJsonStorage(CLIENTS_STORAGE_KEY, []);
      }
    }
    removeLegacyStorageItem(CLIENTS_STORAGE_KEY);

    // Initialize or restore machine database and ensure Firestore document exists
    let normalizedMachineDb;
    const pendingMachineDb = getPendingSyncValue(FIRESTORE_MACHINE_DB_DOC);
    if (isPlainObject(pendingMachineDb) || isPlainObject(machineDb)) {
      normalizedMachineDb = normalizeMachineDatabase(isPlainObject(pendingMachineDb) ? pendingMachineDb : machineDb);
    } else {
      const legacyMachineDb = readLegacyJsonStorage(MACHINE_DB_STORAGE_KEY, null);
      const currentMachineDb = readJsonStorage(MACHINE_DB_STORAGE_KEY, null);
      if (isPlainObject(legacyMachineDb)) {
        normalizedMachineDb = normalizeMachineDatabase(legacyMachineDb);
      } else if (isPlainObject(currentMachineDb)) {
        normalizedMachineDb = normalizeMachineDatabase(currentMachineDb);
      } else {
        normalizedMachineDb = DEFAULT_MACHINE_DATABASE;
      }
    }
    writeJsonStorage(MACHINE_DB_STORAGE_KEY, normalizedMachineDb);
    removeLegacyStorageItem(MACHINE_DB_STORAGE_KEY);

    // Sync all data to Firestore in parallel to ensure documents exist
    await Promise.all([
      syncFirestoreCollectionRecords(FIRESTORE_USERS_COLLECTION, usersCache),
      syncFirestoreCollectionRecords(FIRESTORE_PROPOSALS_COLLECTION, readJsonStorage(PROPOSALS_STORAGE_KEY, [])),
      syncFirestoreCollectionRecords(FIRESTORE_CLIENTS_COLLECTION, readJsonStorage(CLIENTS_STORAGE_KEY, [])),
      syncFirestoreDocAsync(FIRESTORE_MACHINE_DB_DOC, normalizedMachineDb)
    ]);
    removeLegacyAggregateFirestoreDocs();
  } catch (error) {
    console.error("Falha ao carregar dados do Firebase:", error);
  }
}

function showToast(message, isError = false) {
  const toast = $("toast");
  toast.textContent = message;
  toast.hidden = false;
  toast.classList.toggle("error", isError);

  clearTimeout(toastTimeoutId);
  toastTimeoutId = window.setTimeout(() => {
    toast.hidden = true;
  }, 2800);
}

function updateDraftStatus(message, isError = false) {
  const status = $("draftStatus");
  status.textContent = message;
  status.classList.toggle("error", isError);
}

async function hashLegacyPassword(password) {
  const data = new TextEncoder().encode(password);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byteValue) => byteValue.toString(16).padStart(HEX_BYTE_LENGTH, "0"))
    .join("");
}

function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((byteValue) => byteValue.toString(16).padStart(HEX_BYTE_LENGTH, "0"))
    .join("");
}

function hexToBytes(hex) {
  const pairs = hex.match(new RegExp(`.{1,${HEX_BYTE_LENGTH}}`, "g")) || [];
  return new Uint8Array(pairs.map((pair) => parseInt(pair, 16)));
}

function createPasswordSalt() {
  return bytesToHex(window.crypto.getRandomValues(new Uint8Array(16)));
}

async function derivePasswordHash(password, saltHex, iterations = PASSWORD_ITERATIONS) {
  const data = new TextEncoder().encode(password);
  const key = await window.crypto.subtle.importKey("raw", data, "PBKDF2", false, ["deriveBits"]);
  const derivedBits = await window.crypto.subtle.deriveBits({
    name: "PBKDF2",
    hash: "SHA-256",
    salt: hexToBytes(saltHex),
    iterations
  }, key, 256);
  return Array.from(new Uint8Array(derivedBits))
    .map((byteValue) => byteValue.toString(16).padStart(HEX_BYTE_LENGTH, "0"))
    .join("");
}

async function createPasswordCredentials(password) {
  const passwordSalt = createPasswordSalt();
  const passwordHash = await derivePasswordHash(password, passwordSalt);
  return {
    passwordHash,
    passwordSalt,
    passwordIterations: PASSWORD_ITERATIONS
  };
}

async function verifyPassword(user, password) {
  if (user.passwordSalt) {
    const derivedHash = await derivePasswordHash(password, user.passwordSalt, user.passwordIterations || PASSWORD_ITERATIONS);
    return derivedHash === user.passwordHash;
  }

  const legacyHash = await hashLegacyPassword(password);
  return legacyHash === user.passwordHash;
}

function getTextoPadraoProposta() {
  return $("propostaTextoPadrao").value.trim() || DEFAULT_STANDARD_TEXT;
}

function formatarCep(value) {
  const digits = onlyDigits(value).slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function formatarDocumento(value) {
  const digits = onlyDigits(value).slice(0, 14);
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function formatarTelefone(value) {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d{1,4})$/, "$1-$2");
  }
  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
}

function calcularFuncionariosPorMetragem(metragem) {
  return metragem > 0 ? Math.ceil(metragem / M2_PER_WORKER) : 0;
}

function getModoFuncionarios() {
  return $("modoFuncionarios").value === WORKER_MODE_MANUAL ? WORKER_MODE_MANUAL : WORKER_MODE_AUTO;
}

function atualizarModoFuncionarios({ preserveManualValue = true } = {}) {
  const modo = getModoFuncionarios();
  const funcionariosEl = $("funcionarios");
  const funcionariosAutomaticos = calcularFuncionariosPorMetragem(toNumber($("metragem").value));

  funcionariosEl.readOnly = modo !== WORKER_MODE_MANUAL;

  if (modo === WORKER_MODE_MANUAL) {
    $("infoFuncionarios").textContent = "Modo manual: informe a quantidade desejada para esta obra.";

    if (!preserveManualValue || !funcionariosEl.value) {
      funcionariosEl.value = funcionariosAutomaticos;
    }
  } else {
    $("infoFuncionarios").textContent = "Regra automática: 1 funcionário a cada 100 m²";
    funcionariosEl.value = funcionariosAutomaticos;
  }
}

function atualizarCampoPisoTela({ preserveValueWhenDisabled = false } = {}) {
  const pisoTelaEl = $("pisoTela");
  const valorTelaM2El = $("valorTelaM2");
  const infoPisoTelaEl = $("infoPisoTela");
  if (!pisoTelaEl || !valorTelaM2El || !infoPisoTelaEl) return;
  const comTela = pisoTelaEl.value === "com_tela";
  valorTelaM2El.disabled = !comTela;
  if (!comTela && !preserveValueWhenDisabled) {
    valorTelaM2El.value = "";
  }
  infoPisoTelaEl.textContent = comTela
    ? "Informe o valor por m² da tela para somar ao custo final do piso."
    : "Disponível apenas quando o piso for com tela.";
}

function atualizarCampoCuraQuimica({ preserveValueWhenDisabled = false } = {}) {
  const curaQuimicaEl = $("curaQuimica");
  const valorCuraM2El = $("valorCuraM2");
  const infoCuraQuimicaEl = $("infoCuraQuimica");
  if (!curaQuimicaEl || !valorCuraM2El || !infoCuraQuimicaEl) return;
  const comCura = curaQuimicaEl.value !== "sem_cura";
  valorCuraM2El.disabled = !comCura;
  if (!comCura && !preserveValueWhenDisabled) {
    valorCuraM2El.value = "";
  }
  infoCuraQuimicaEl.textContent = comCura
    ? "Informe o valor por m² da cura química para somar ao custo final do piso."
    : "Disponível apenas quando a cura química for selecionada.";
}

function getEquipamentosTipo() {
  return $("equipamentosTipo").value === EQUIPAMENTOS_TIPO_ALUGADOS
    ? EQUIPAMENTOS_TIPO_ALUGADOS
    : EQUIPAMENTOS_TIPO_PROPRIOS;
}

function sanitizeEquipamentoAlugadoTipo(value) {
  return EQUIPAMENTOS_ALUGADOS_OPCOES.some((item) => item.value === value)
    ? value
    : EQUIPAMENTOS_ALUGADOS_OPCOES[0].value;
}

function parseEquipamentosAlugadosItems(raw) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => ({
      tipo: sanitizeEquipamentoAlugadoTipo(item?.tipo),
      diaria: toNumber(item?.diaria)
    }));
  } catch {
    return [];
  }
}

function getEquipamentosAlugadosItemsSnapshot() {
  return parseEquipamentosAlugadosItems($("equipamentosAlugadosItems").value);
}

function setEquipamentosAlugadosItemsSnapshot(items) {
  $("equipamentosAlugadosItems").value = JSON.stringify(
    (items || []).map((item) => ({
      tipo: sanitizeEquipamentoAlugadoTipo(item?.tipo),
      diaria: toNumber(item?.diaria)
    }))
  );
}

function buildEquipamentosAlugadosOptions(selectedValue) {
  return EQUIPAMENTOS_ALUGADOS_OPCOES
    .map((item) => `<option value="${escapeHtml(item.value)}"${item.value === selectedValue ? " selected" : ""}>${escapeHtml(item.label)}</option>`)
    .join("");
}

function createEquipamentoAlugadoItem(item = {}) {
  const tipo = sanitizeEquipamentoAlugadoTipo(item.tipo);
  const diaria = toNumber(item.diaria);
  const idSuffix = createUniqueId().replaceAll("-", "");
  const tipoId = `equipamentoAlugadoTipo_${idSuffix}`;
  const diariaId = `equipamentoAlugadoDiaria_${idSuffix}`;
  const totalId = `equipamentoAlugadoTotal_${idSuffix}`;
  const row = document.createElement("div");
  row.className = "equipamento-item";
  row.innerHTML = `
    <div class="field">
      <label for="${tipoId}">Equipamento</label>
      <select id="${tipoId}" class="equipamento-alugado-tipo">
        ${buildEquipamentosAlugadosOptions(tipo)}
      </select>
    </div>
    <div class="field">
      <label for="${diariaId}">Valor da diária (R$)</label>
      <input id="${diariaId}" type="number" class="equipamento-alugado-diaria" min="0" step="0.01" placeholder="0.00" />
    </div>
    <div class="field">
      <label for="${totalId}">Total do item</label>
      <input id="${totalId}" type="text" class="equipamento-alugado-total" value="${formatMoney(0)}" readonly />
    </div>
    <button type="button" class="btn btn-danger btn-inline" data-action="excluir-equipamento" aria-label="Excluir item de equipamento alugado">Excluir</button>
  `;
  if (diaria > 0) {
    row.querySelector(".equipamento-alugado-diaria").value = diaria;
  }
  return row;
}

function readEquipamentosAlugadosFromUI({ dias = toNumber($("dias").value), updateTotals = true } = {}) {
  const rows = Array.from(document.querySelectorAll("#equipamentosAlugadosList .equipamento-item"));
  return rows.map((row) => {
    const tipo = sanitizeEquipamentoAlugadoTipo(row.querySelector(".equipamento-alugado-tipo")?.value);
    const diaria = toNumber(row.querySelector(".equipamento-alugado-diaria")?.value);
    const totalItem = diaria * dias;
    if (updateTotals) {
      const totalField = row.querySelector(".equipamento-alugado-total");
      if (totalField) totalField.value = formatMoney(totalItem);
    }
    return { tipo, diaria, totalItem };
  });
}

function renderEquipamentosAlugadosItems(items = []) {
  const list = $("equipamentosAlugadosList");
  const normalizedItems = (items || [])
    .map((item) => ({
      tipo: sanitizeEquipamentoAlugadoTipo(item.tipo),
      diaria: toNumber(item.diaria)
    }));

  list.innerHTML = "";
  normalizedItems.forEach((item) => {
    list.appendChild(createEquipamentoAlugadoItem(item));
  });
  const itemsFromUI = readEquipamentosAlugadosFromUI({ updateTotals: true });
  setEquipamentosAlugadosItemsSnapshot(itemsFromUI);
}

function atualizarCampoEquipamentosAlugados({ preserveValuesWhenHidden = true, syncFromSnapshot = false } = {}) {
  const section = $("equipamentosAlugadosSection");
  const alugados = getEquipamentosTipo() === EQUIPAMENTOS_TIPO_ALUGADOS;
  if (!section) return;

  section.hidden = !alugados;

  if (alugados && (syncFromSnapshot || !$("equipamentosAlugadosList").children.length)) {
    renderEquipamentosAlugadosItems(getEquipamentosAlugadosItemsSnapshot());
  }

  if (!alugados && !preserveValuesWhenHidden) {
    renderEquipamentosAlugadosItems([]);
    $("equipamentosAlugadosObservacao").value = "";
  }
}

async function buscarDadosCep(cep) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  if (!response.ok) throw new Error("Falha ao consultar CEP.");
  const data = await response.json();
  if (data.erro) throw new Error("CEP não encontrado.");
  return data;
}

async function preencherEnderecoPorCepInput({ cepFieldId, enderecoFieldId, labelErro, alertOnError = true }) {
  const cepEl = $(cepFieldId);
  const enderecoEl = $(enderecoFieldId);
  const cep = onlyDigits(cepEl.value).slice(0, 8);

  if (cep.length !== 8) {
    if (alertOnError) showToast(`Informe um CEP válido de 8 dígitos para ${labelErro}.`, true);
    return false;
  }

  try {
    const dados = await buscarDadosCep(cep);
    const endereco = [dados.logradouro, dados.bairro, `${dados.localidade}/${dados.uf}`]
      .filter(Boolean)
      .join(" - ");
    cepEl.value = formatarCep(cep);
    enderecoEl.value = endereco || enderecoEl.value;
    return true;
  } catch (error) {
    if (alertOnError) showToast(error.message || "Não foi possível buscar o CEP.", true);
    return false;
  }
}

async function preencherEnderecosPorCep() {
  const preenchido = await preencherEnderecoPorCepInput({
    cepFieldId: "cep",
    enderecoFieldId: "endereco",
    labelErro: "a obra",
    alertOnError: false
  });

  if (preenchido) {
    showToast("Endereço atualizado com sucesso.");
  } else {
    showToast("Não foi possível preencher o endereço da obra. Revise o CEP informado.", true);
  }
}

function getUsers() {
  usersCache = normalizeUsersForStorage(readJsonStorage(USERS_STORAGE_KEY, usersCache));
  return usersCache;
}

function saveUsers(list) {
  const normalizedList = normalizeUsersForStorage(list);
  usersCache = normalizedList;
  const success = writeJsonStorage(USERS_STORAGE_KEY, normalizedList);
  syncFirestoreCollectionRecords(FIRESTORE_USERS_COLLECTION, normalizedList);
  return success;
}

function getSavedProposals() {
  return readJsonStorage(PROPOSALS_STORAGE_KEY, []);
}

function saveProposals(list) {
  const success = writeJsonStorage(PROPOSALS_STORAGE_KEY, list);
  if (success) syncFirestoreCollectionRecords(FIRESTORE_PROPOSALS_COLLECTION, list);
  return success;
}

function getSavedClients() {
  return readJsonStorage(CLIENTS_STORAGE_KEY, [])
    .map(normalizeClientRecord)
    .filter(Boolean);
}

function saveClients(list) {
  const normalized = list
    .map(normalizeClientRecord)
    .filter(Boolean);
  const success = writeJsonStorage(CLIENTS_STORAGE_KEY, normalized);
  if (success) syncFirestoreCollectionRecords(FIRESTORE_CLIENTS_COLLECTION, normalized);
  return success;
}

function normalizeMachineDatabase(data = {}) {
  const rendimentoFacasM2 = toNumber(data.rendimentoFacasM2) > 0
    ? toNumber(data.rendimentoFacasM2)
    : DEFAULT_MACHINE_DATABASE.rendimentoFacasM2;
  const facasPorJogo = toPositiveIntegerOrFallback(data.facasPorJogo, DEFAULT_MACHINE_DATABASE.facasPorJogo);
  const precoFaca = Math.max(0, toNumber(data.precoFaca));
  const rendimentoDiscoM2 = toNumber(data.rendimentoDiscoM2) > 0
    ? toNumber(data.rendimentoDiscoM2)
    : DEFAULT_MACHINE_DATABASE.rendimentoDiscoM2;
  const discosPorJogo = toPositiveIntegerOrFallback(data.discosPorJogo, DEFAULT_MACHINE_DATABASE.discosPorJogo);
  const precoDisco = Math.max(0, toNumber(data.precoDisco));
  const consumoDuplaLitrosM2 = Math.max(0, toNumber(data.consumoDuplaLitrosM2));
  const consumoSimplesLitrosM2 = Math.max(0, toNumber(data.consumoSimplesLitrosM2));
  const consumoCorteLitrosM2 = Math.max(0, toNumber(data.consumoCorteLitrosM2));
  return {
    rendimentoFacasM2,
    facasPorJogo,
    precoFaca,
    rendimentoDiscoM2,
    discosPorJogo,
    precoDisco,
    consumoDuplaLitrosM2,
    consumoSimplesLitrosM2,
    consumoCorteLitrosM2
  };
}

function getMachineDatabase() {
  const stored = readJsonStorage(MACHINE_DB_STORAGE_KEY, null);
  return normalizeMachineDatabase(stored || DEFAULT_MACHINE_DATABASE);
}

function saveMachineDatabase(data) {
  const normalized = normalizeMachineDatabase(data);
  const success = writeJsonStorage(MACHINE_DB_STORAGE_KEY, normalized);
  if (success) syncFirestoreDoc(FIRESTORE_MACHINE_DB_DOC, normalized);
  return success;
}

function buildTablesExportPayload() {
  return {
    schemaVersion: TABLE_EXPORT_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    source: "local_storage",
    data: {
      users: getUsers(),
      proposals: getSavedProposals(),
      clients: getSavedClients(),
      machineDatabase: getMachineDatabase()
    }
  };
}

function getTablesExportFilename() {
  const now = new Date();
  const timestamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("-") + "_" + [
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0")
  ].join("-");
  return `orcamento-tabelas-${timestamp}.json`;
}

function exportarTabelas() {
  if (!isAdmin()) {
    showToast("Somente administradores podem exportar as tabelas.", true);
    return;
  }
  try {
    const payload = buildTablesExportPayload();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = getTablesExportFilename();
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("Tabelas exportadas com sucesso.");
  } catch (error) {
    console.error("Falha ao exportar tabelas:", error);
    showToast("Não foi possível exportar as tabelas.", true);
  }
}

function getImportTablesInput() {
  return $("inputImportarTabelas");
}

function abrirImportacaoTabelas() {
  if (!isAdmin()) {
    showToast("Somente administradores podem importar tabelas.", true);
    return;
  }
  const input = getImportTablesInput();
  if (!input) return;
  input.value = "";
  input.click();
}

function normalizeTablesImportPayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;
  const data = payload.data && typeof payload.data === "object" && !Array.isArray(payload.data)
    ? payload.data
    : payload;
  const users = Array.isArray(data.users) ? normalizeUsersForStorage(data.users) : null;
  const proposals = Array.isArray(data.proposals) ? data.proposals : null;
  const clients = Array.isArray(data.clients)
    ? data.clients.map(normalizeClientRecord).filter(Boolean)
    : null;
  const machineDatabase = isPlainObject(data.machineDatabase)
    ? normalizeMachineDatabase(data.machineDatabase)
    : null;
  if (!users && !proposals && !clients && !machineDatabase) return null;
  return { users, proposals, clients, machineDatabase };
}

async function importarTabelas(event) {
  if (!isAdmin()) {
    showToast("Somente administradores podem importar tabelas.", true);
    return;
  }
  const input = event?.target;
  const file = input?.files?.[0];
  if (!file) return;

  try {
    const content = await file.text();
    const parsed = JSON.parse(content);
    const normalized = normalizeTablesImportPayload(parsed);
    if (!normalized) {
      showToast("Arquivo inválido para importação de tabelas.", true);
      return;
    }

    if (normalized.users) saveUsers(normalized.users);
    if (normalized.proposals) saveProposals(normalized.proposals);
    if (normalized.clients) saveClients(normalized.clients);
    if (normalized.machineDatabase) saveMachineDatabase(normalized.machineDatabase);
    await ensureAdminExists();

    const currentUserInImportedData = getUsers().find((item) => item.id === currentUserId && item.active);
    if (!currentUserInImportedData) {
      handleLogout({ silent: true });
      showToast("Importação concluída. Faça login novamente para continuar.");
      return;
    }
    currentUser = mergeUserProfile(currentUserInImportedData);

    applyMachineDatabaseToForm();
    renderUsersTable();
    renderClientsTable();
    populateProposalClientSelect();
    renderizarTabelaPropostas();
    renderDashboard();
    updateSessionInfo();
    showToast("Tabelas importadas com sucesso.");
  } catch (error) {
    console.error("Falha ao importar tabelas:", error);
    showToast("Não foi possível importar as tabelas.", true);
  } finally {
    if (input) input.value = "";
  }
}

function applyMachineDatabaseToForm() {
  applyMachineDatabaseValuesToForm(getMachineDatabase());
}

function applyMachineDatabaseValuesToForm(data) {
  const db = normalizeMachineDatabase(data);
  $("paramRendimentoFacas").value = db.rendimentoFacasM2 > 0 ? String(db.rendimentoFacasM2) : "";
  $("paramFacasPorJogo").value = db.facasPorJogo > 0 ? String(db.facasPorJogo) : "";
  $("paramPrecoFaca").value = db.precoFaca > 0 ? String(db.precoFaca) : "";
  $("paramRendimentoDisco").value = db.rendimentoDiscoM2 > 0 ? String(db.rendimentoDiscoM2) : "";
  $("paramDiscosPorJogo").value = db.discosPorJogo > 0 ? String(db.discosPorJogo) : "";
  $("paramPrecoDisco").value = db.precoDisco > 0 ? String(db.precoDisco) : "";
  $("paramConsumoMaquinaDupla").value = db.consumoDuplaLitrosM2 > 0 ? String(db.consumoDuplaLitrosM2) : "";
  $("paramConsumoMaquinaSimples").value = db.consumoSimplesLitrosM2 > 0 ? String(db.consumoSimplesLitrosM2) : "";
  $("paramConsumoMaquinaCorte").value = db.consumoCorteLitrosM2 > 0 ? String(db.consumoCorteLitrosM2) : "";
}

function limparFormularioBancoDadosEstimativas() {
  MACHINE_DATABASE_FIELD_IDS.forEach((id) => {
    if ($(id)) $(id).value = "";
  });
}

function aplicarEstimativaMercadoPreCadastrada() {
  if (!isAdmin()) {
    showToast("Somente administradores podem aplicar estimativas pré-cadastradas.", true);
    return;
  }
  const presetId = $("presetEstimativaMercado").value;
  const preset = MACHINE_DATABASE_PRESETS[presetId];
  if (!preset) {
    showToast("Estimativa pré-cadastrada não encontrada.", true);
    return;
  }

  applyMachineDatabaseValuesToForm(preset);
  calcularOrcamento();
  salvarRascunhoLocal();
  showToast("Estimativa de mercado aplicada. Ajuste e salve os parâmetros se desejar.");
}

function readMachineDatabaseFromForm() {
  return {
    rendimentoFacasM2: toNumber($("paramRendimentoFacas").value),
    facasPorJogo: Math.max(0, Math.round(toNumber($("paramFacasPorJogo").value))),
    precoFaca: toNumber($("paramPrecoFaca").value),
    rendimentoDiscoM2: toNumber($("paramRendimentoDisco").value),
    discosPorJogo: Math.max(0, Math.round(toNumber($("paramDiscosPorJogo").value))),
    precoDisco: toNumber($("paramPrecoDisco").value),
    consumoDuplaLitrosM2: toNumber($("paramConsumoMaquinaDupla").value),
    consumoSimplesLitrosM2: toNumber($("paramConsumoMaquinaSimples").value),
    consumoCorteLitrosM2: toNumber($("paramConsumoMaquinaCorte").value)
  };
}

function getDraftStorageKey(userId = currentUserId) {
  return `${DRAFT_STORAGE_KEY_PREFIX}${userId}`;
}

function getSession() {
  return readJsonStorage(SESSION_STORAGE_KEY, null);
}

function normalizeSessionUserId(userId) {
  const normalized = String(userId || "").trim();
  return /^[A-Za-z0-9_-]+$/.test(normalized) ? normalized : "";
}

function writeBrowserSession(session) {
  try {
    if (!window.localStorage) throw new Error("localStorage unavailable");
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    return true;
  } catch (error) {
    console.warn("Falha ao persistir sessão no navegador:", error);
    showToast("Sessão ativa apenas nesta aba. Ao recarregar, será necessário entrar novamente.", true);
    return false;
  }
}

function saveSession(userId) {
  const sessionUserId = normalizeSessionUserId(userId);
  if (!sessionUserId) return false;

  removeLegacyStorageItem(SESSION_STORAGE_KEY);
  const session = { userId: sessionUserId };
  const success = writeJsonStorage(SESSION_STORAGE_KEY, session);
  if (!success) return false;

  const browserSuccess = writeBrowserSession(session);
  return browserSuccess;
}

function clearSession() {
  removeStorageItem(SESSION_STORAGE_KEY);
  removeLegacyStorageItem(SESSION_STORAGE_KEY);
}

function isAdmin(user = currentUser) {
  return normalizeUserRole(user?.role) === ROLE_ADMIN;
}

function isSeller(user = currentUser) {
  return normalizeUserRole(user?.role) === ROLE_SELLER;
}

function podeGerenciarUsuarios(user = currentUser) {
  return isAdmin(user);
}

function aplicarFiltroRole(lista) {
  if (!currentUser || isAdmin()) return lista;
  return lista.filter((r) => r.ownerId === currentUserId);
}

function requireAdminForUserManagement() {
  if (podeGerenciarUsuarios()) return true;
  showToast("Somente administradores podem gerenciar usuários.", true);
  return false;
}

function normalizeUsersForStorage(list = []) {
  const adminUsers = list
    .filter((user) => normalizeUserRole(user?.role) === ROLE_ADMIN)
    .sort((a, b) => toNumber(a.createdAt) - toNumber(b.createdAt));
  const fallbackCreator = adminUsers[0] || null;
  const usersById = new Map(list.map((user) => [user?.id, user]));

  return list.map((user) => {
    if (!user || typeof user !== "object") return user;

    const nextUser = {
      ...user,
      role: normalizeUserRole(user.role),
      filial: String(user.filial || DEFAULT_FILIAL).trim() || DEFAULT_FILIAL,
      active: normalizeUserRole(user.role) === ROLE_ADMIN ? true : Boolean(user.active)
    };

    if (!nextUser.createdByName) {
      const creatorUser = nextUser.createdBy ? usersById.get(nextUser.createdBy) : null;
      if (creatorUser) {
        nextUser.createdByName = creatorUser.name || "Administrador";
        nextUser.createdByEmail = creatorUser.email || "";
      } else if (fallbackCreator && nextUser.id === fallbackCreator.id) {
        nextUser.createdBy = null;
        nextUser.createdByName = "Sistema";
        nextUser.createdByEmail = "";
      } else if (fallbackCreator && nextUser.id !== fallbackCreator.id) {
        nextUser.createdBy = fallbackCreator.id;
        nextUser.createdByName = fallbackCreator.name || "Administrador";
        nextUser.createdByEmail = fallbackCreator.email || "";
      }
    }

    return nextUser;
  });
}

function getCurrentUserFromStorage() {
  return getUsers().find((item) => item.id === currentUserId) || null;
}

function buildDefaultProfile(user = {}) {
  return {
    nomeVendedor: user.name || "",
    telefoneVendedor: "",
    emailVendedor: user.email || "",
    empresa: "",
    cnpj: "",
    enderecoEmpresa: "",
    logoDataUrl: ""
  };
}

function mergeUserProfile(user) {
  return {
    ...user,
    profile: {
      ...buildDefaultProfile(user),
      ...(user.profile || {})
    }
  };
}

function refreshCurrentUser() {
  if (!currentUserId) {
    currentUser = null;
    return null;
  }

  const storedUser = getCurrentUserFromStorage();
  if (shouldFallbackToInMemoryUser(storedUser)) {
    return currentUser;
  }

  if (!storedUser || !storedUser.active) {
    void handleLogout({ silent: true });
    return null;
  }

  currentUser = mergeUserProfile(storedUser);
  currentUserId = currentUser.id;
  return currentUser;
}

async function ensureAdminExists() {
  const users = getUsers();
  if (users.length) return;

  const now = Date.now();
  const adminUser = {
    id: createUniqueId(),
    name: "Administrador",
    email: DEFAULT_ADMIN_USERNAME,
    role: ROLE_ADMIN,
    filial: DEFAULT_FILIAL,
    active: true,
    ...(await createPasswordCredentials(DEFAULT_ADMIN_PASSWORD)),
    mustChangePassword: true,
    profile: buildDefaultProfile({
      name: "Administrador",
      email: DEFAULT_ADMIN_USERNAME
    }),
    createdBy: null,
    createdByName: "Sistema",
    createdByEmail: "",
    createdAt: now,
    updatedAt: now
  };

  saveUsers([adminUser]);
}

async function ensureDefaultAdminAccess(email, password) {
  if (email !== DEFAULT_ADMIN_USERNAME || password !== DEFAULT_ADMIN_PASSWORD) {
    return null;
  }

  const users = getUsers();
  const index = users.findIndex((user) => user.email === DEFAULT_ADMIN_USERNAME);
  const now = Date.now();

  if (index >= 0) {
    const recoveredUser = {
      ...users[index],
      name: users[index].name || "Administrador",
      email: DEFAULT_ADMIN_USERNAME,
      role: ROLE_ADMIN,
      filial: DEFAULT_FILIAL,
      active: true,
      ...(await createPasswordCredentials(DEFAULT_ADMIN_PASSWORD)),
      mustChangePassword: true,
      profile: {
        ...buildDefaultProfile({
          name: users[index].name || "Administrador",
          email: DEFAULT_ADMIN_USERNAME
        }),
        ...(users[index].profile || {})
      },
      updatedAt: now
    };
    const nextUsers = users.map((user, userIndex) => (userIndex === index ? recoveredUser : user));
    if (!saveUsers(nextUsers)) return null;
    return nextUsers[index];
  }

  const adminUser = {
    id: createUniqueId(),
    name: "Administrador",
    email: DEFAULT_ADMIN_USERNAME,
    role: ROLE_ADMIN,
    filial: DEFAULT_FILIAL,
    active: true,
    ...(await createPasswordCredentials(DEFAULT_ADMIN_PASSWORD)),
    mustChangePassword: true,
    profile: buildDefaultProfile({
      name: "Administrador",
      email: DEFAULT_ADMIN_USERNAME
    }),
    createdBy: null,
    createdByName: "Sistema",
    createdByEmail: "",
    createdAt: now,
    updatedAt: now
  };

  if (!saveUsers([adminUser, ...users])) return null;
  return adminUser;
}

async function ensureOpenAccessUser() {
  const users = getUsers();
  const existingOpenAccessUserIndex = users.findIndex((user) => user.email === OPEN_ACCESS_USER_EMAIL);
  if (existingOpenAccessUserIndex >= 0) {
    const existingOpenAccessUser = {
      ...users[existingOpenAccessUserIndex],
      name: OPEN_ACCESS_USER_NAME,
      role: ROLE_ADMIN,
      filial: DEFAULT_FILIAL,
      active: true,
      mustChangePassword: false,
      updatedAt: Date.now()
    };
    const nextUsers = users.map((user, index) => (index === existingOpenAccessUserIndex ? existingOpenAccessUser : user));
    if (!saveUsers(nextUsers)) return null;
    return existingOpenAccessUser;
  }

  const now = Date.now();
  const openAccessUser = {
    id: createUniqueId(),
    name: OPEN_ACCESS_USER_NAME,
    email: OPEN_ACCESS_USER_EMAIL,
    role: ROLE_ADMIN,
    filial: DEFAULT_FILIAL,
    active: true,
    ...(await createPasswordCredentials(generateOpenAccessPassword())),
    mustChangePassword: false,
    profile: buildDefaultProfile({
      name: OPEN_ACCESS_USER_NAME,
      email: OPEN_ACCESS_USER_EMAIL
    }),
    createdBy: null,
    createdByName: "Sistema",
    createdByEmail: "",
    createdAt: now,
    updatedAt: now
  };

  if (!saveUsers([openAccessUser, ...users])) return null;
  return openAccessUser;
}

function updateSessionInfo() {
  const securityNoticeEl = $("securityNotice");
  if (!currentUser) {
    $("sessionUserName").textContent = "-";
    $("sessionUserMeta").textContent = "-";
    const senhaUsuarioEmailEl = $("senhaUsuarioEmail");
    if (senhaUsuarioEmailEl) senhaUsuarioEmailEl.value = "";
    if (securityNoticeEl) securityNoticeEl.hidden = true;
    return;
  }

  $("sessionUserName").textContent = currentUser.name;
  const filialInfo = currentUser.filial ? ` • ${currentUser.filial}` : "";
  $("sessionUserMeta").textContent = `${formatRole(currentUser.role)}${filialInfo} • ${currentUser.email} • ${currentUser.active ? "Ativo" : "Inativo"}`;
  const senhaUsuarioEmailEl = $("senhaUsuarioEmail");
  if (senhaUsuarioEmailEl) senhaUsuarioEmailEl.value = currentUser.email || "";
  const shouldShowSecurityNotice = !OPEN_ACCESS_MODE && currentUser.mustChangePassword;
  if (securityNoticeEl) securityNoticeEl.hidden = !shouldShowSecurityNotice;
  if (shouldShowSecurityNotice && securityNoticeEl) {
    securityNoticeEl.textContent = "Para sua segurança, altere sua senha provisória em Meu Perfil.";
  }
}

function updateTabVisibility() {
  const admin = isAdmin();
  const manager = isAdmin();
  const adminOnlyButtons = document.querySelectorAll(".tab-btn[data-admin-only='true']");
  adminOnlyButtons.forEach((button) => {
    button.hidden = !admin;
  });

  const managerButtons = document.querySelectorAll(".tab-btn[data-manager-only='true']");
  managerButtons.forEach((button) => {
    button.hidden = !manager;
  });

  document.querySelectorAll("[data-admin-only-block='true']").forEach((block) => {
    block.hidden = !admin;
  });

  const activeButton = document.querySelector(".tab-btn.active");
  if (activeButton?.hidden) {
    const firstVisibleButton = Array.from(document.querySelectorAll(".tab-btn")).find((button) => !button.hidden);
    if (firstVisibleButton) {
      activateTab(firstVisibleButton.dataset.tab);
    }
  }
}

function updateAppVisibility() {
  const authenticated = Boolean(currentUser);
  document.body.classList.toggle("auth-view", !authenticated);
  const authSection = $("authSection");
  if (authSection) authSection.hidden = OPEN_ACCESS_MODE || authenticated;
  const appContent = $("appContent");
  if (appContent) appContent.hidden = !authenticated;
}

function applyOpenAccessModeUI() {
  if (!OPEN_ACCESS_MODE) return;
  const authSection = $("authSection");
  if (authSection) authSection.hidden = true;
  const loginForm = $("loginForm");
  if (loginForm) {
    loginForm.querySelectorAll("input, button").forEach((field) => {
      field.disabled = true;
    });
  }
  const passwordCard = $("passwordForm")?.closest(".card");
  if (passwordCard) passwordCard.hidden = true;
  const userPasswordField = $("usuarioSenha")?.closest(".field");
  if (userPasswordField) userPasswordField.hidden = true;
  const securityNotice = $("securityNotice");
  if (securityNotice) securityNotice.hidden = true;
  const forcedPasswordOverlay = $("changePasswordOverlay");
  if (forcedPasswordOverlay) forcedPasswordOverlay.hidden = true;
  const logoutButton = $("btnLogout");
  if (logoutButton) logoutButton.hidden = true;
}

function activateTab(tabId) {
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabId);
  });

  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId);
  });
}

function getProfileFromForm() {
  return {
    nomeVendedor: $("perfilNomeVendedor").value.trim(),
    telefoneVendedor: $("perfilTelefoneVendedor").value.trim(),
    emailVendedor: $("perfilEmailVendedor").value.trim(),
    empresa: $("perfilEmpresa").value.trim(),
    cnpj: $("perfilCnpj").value.trim(),
    enderecoEmpresa: $("perfilEndereco").value.trim(),
    logoDataUrl
  };
}

function applyProfileToForm(profile = {}) {
  const mergedProfile = {
    ...buildDefaultProfile(currentUser || {}),
    ...profile
  };

  $("perfilNomeVendedor").value = mergedProfile.nomeVendedor || "";
  $("perfilTelefoneVendedor").value = mergedProfile.telefoneVendedor || "";
  $("perfilEmailVendedor").value = mergedProfile.emailVendedor || "";
  $("perfilEmpresa").value = mergedProfile.empresa || "";
  $("perfilCnpj").value = mergedProfile.cnpj || "";
  $("perfilEndereco").value = mergedProfile.enderecoEmpresa || "";
  $("perfilLogo").value = "";
  logoDataUrl = mergedProfile.logoDataUrl || "";
  atualizarPreviaPerfil();
}

function atualizarPreviaPerfil() {
  const profile = getProfileFromForm();
  const prevLogo = $("prevLogo");

  $("prevEmpresa").textContent = profile.empresa || "Sua empresa";
  $("prevEmpresaCnpj").textContent = `CNPJ: ${profile.cnpj || "-"}`;
  $("prevEmpresaEndereco").textContent = `Endereço: ${profile.enderecoEmpresa || "-"}`;
  $("prevVendedorNome").textContent = profile.nomeVendedor || currentUser?.name || "-";
  $("prevVendedorContato").textContent = profile.telefoneVendedor || "-";
  $("prevVendedorEmail").textContent = profile.emailVendedor || currentUser?.email || "-";

  if (profile.logoDataUrl) {
    prevLogo.src = profile.logoDataUrl;
    prevLogo.alt = profile.empresa ? `Logo da empresa ${profile.empresa}` : "Logo da empresa";
    prevLogo.hidden = false;
  } else {
    prevLogo.hidden = true;
    prevLogo.removeAttribute("src");
  }
}

function resetPasswordForm() {
  const senhaAtualEl = $("senhaAtual");
  const novaSenhaEl = $("novaSenha");
  const confirmarNovaSenhaEl = $("confirmarNovaSenha");
  if (senhaAtualEl) senhaAtualEl.value = "";
  if (novaSenhaEl) novaSenhaEl.value = "";
  if (confirmarNovaSenhaEl) confirmarNovaSenhaEl.value = "";
}

function loadCurrentUserProfile() {
  if (!refreshCurrentUser()) {
    applyProfileToForm({});
    return;
  }

  applyProfileToForm(currentUser.profile || buildDefaultProfile(currentUser));
  resetPasswordForm();
}

function getVisibleProposals() {
  const allProposals = getSavedProposals();
  if (isAdmin()) return allProposals;
  return allProposals.filter((item) => item.ownerId === currentUserId);
}

function getProposalById(id) {
  return getVisibleProposals().find((item) => item.id === id) || null;
}

function getVisibleClients() {
  const allClients = getSavedClients();
  if (isAdmin()) return allClients;
  return allClients.filter((item) => item.ownerId === currentUserId);
}

function getClientById(id) {
  return getVisibleClients().find((item) => item.id === id) || null;
}

function proposalFieldsSnapshot() {
  const ids = [
    "propostaClienteId",
    "cliente",
    "documento",
    "email",
    "telefone",
    "obra",
    "cep",
    "endereco",
    "metragem",
    "distancia",
    "consumo",
    "precoCombustivel",
    "pedagio",
    "quantidadeVeiculos",
    "consumoCaminhao",
    "pedagioCaminhao",
    "viagensCaminhao",
    "quantidadeCaminhoes",
    "gastoLogisticoPessoal",
    "gastoLogisticoMaquinario",
    "paramRendimentoFacas",
    "paramFacasPorJogo",
    "paramPrecoFaca",
    "paramRendimentoDisco",
    "paramDiscosPorJogo",
    "paramPrecoDisco",
    "paramConsumoMaquinaDupla",
    "paramConsumoMaquinaSimples",
    "paramConsumoMaquinaCorte",
    "modoFuncionarios",
    "funcionarios",
    "valorDia",
    "dias",
    "diasPreparacao",
    "funcionariosPreparacao",
    "diasConcretagem",
    "funcionariosConcretagem",
    "diasAcabamento",
    "funcionariosAcabamento",
    "quantidadeDiaristas",
    "valorDiarista",
    "quantidadeHorasExtras",
    "valorHoraExtra",
    "encargos",
    "alimentacaoFuncionario",
    "hotelFuncionario",
    "terraplanagemTotal",
    "pisoTela",
    "valorTelaM2",
    "curaQuimica",
    "valorCuraM2",
    "tipoContratacao",
    "preparoLajeMaoObraM2",
    "preparoLajeMaterialM2",
    "pisoIntertravadoMaoObraM2",
    "pisoIntertravadoMaterialM2",
    "concretoM2",
    "fibraM2",
    "agregadoMineralM2",
    "endurecedorM2",
    "juntaPuM2",
    "labioPolimericoM2",
    "pinturaEpoxiM2",
    "servicoAdicionalValor",
    "servicoAdicionalDescricao",
    "equipamentosTipo",
    "equipamentosAlugadosItems",
    "equipamentosAlugadosObservacao",
    "locacaoManualValor",
    "locacaoManualDescricao",
    "outrosCustos",
    "lucro",
    "impostoPercentual",
    "viagens",
    "propostaTitulo",
    "propostaNumero",
    "propostaValidade",
    "propostaCidade",
    "propostaPagamento",
    "propostaPrazo",
    "propostaResponsavel",
    "propostaStatus",
    "propostaStatusObservacao",
    "propostaTextoPadrao",
    "propostaObservacoes"
  ];

  return ids.reduce((acc, id) => {
    acc[id] = $(id).value;
    return acc;
  }, {});
}

function applyProposalSnapshot(snapshot = {}) {
  if (snapshot.propostaClienteId && $("propostaClienteId")) {
    $("propostaClienteId").dataset.snapshotValue = snapshot.propostaClienteId;
  }
  Object.keys(snapshot).forEach((id) => {
    if ($(id)) $(id).value = snapshot[id];
  });
  populateProposalClientSelect();
  atualizarModoFuncionarios();
  atualizarCampoPisoTela({ preserveValueWhenDisabled: true });
  atualizarCampoCuraQuimica({ preserveValueWhenDisabled: true });
  atualizarCampoEquipamentosAlugados({ preserveValuesWhenHidden: true, syncFromSnapshot: true });
  atualizarCampoStatusProposta({ preserveValueWhenHidden: true });
  calcularOrcamento();
}

function atualizarCampoStatusProposta({ preserveValueWhenHidden = true } = {}) {
  const status = normalizeProposalStatus($("propostaStatus").value);
  const observacaoField = $("propostaStatusObservacaoField");
  const observacaoInput = $("propostaStatusObservacao");
  const statusPerdida = status === PROPOSAL_STATUS_PERDIDA;

  $("propostaStatus").value = status;
  observacaoField.hidden = !statusPerdida;
  observacaoInput.disabled = !statusPerdida;
  if (!statusPerdida && !preserveValueWhenHidden) {
    observacaoInput.value = "";
  }
}

function renderizarTabelaPropostas() {
  const tbody = $("tabelaPropostasBody");
  const list = getVisibleProposals();
  const showOwner = isAdmin();
  const query = getFilterQuery("filtroTabelaPropostas");
  const filteredList = list.filter((item) => {
    const statusMeta = getProposalStatusMeta(item.status || item.snapshot?.propostaStatus);
    const rowData = [item.titulo, item.cliente, item.data, statusMeta.label, item.ownerName, item.ownerEmail, item.filial];
    return matchesFilter(rowData, query);
  });

  $("colunaPropostaVendedor").hidden = !showOwner;
  $("propostasTituloSecao").textContent = showOwner ? "Todas as propostas geradas" : "Minhas propostas salvas";
  tbody.innerHTML = "";

  if (!filteredList.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = showOwner ? 6 : 5;
    cell.textContent = query ? "Nenhuma proposta encontrada para o filtro informado." : "Nenhuma proposta salva.";
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  const fragment = document.createDocumentFragment();

  filteredList.forEach((item) => {
    const row = document.createElement("tr");
    const titulo = document.createElement("td");
    titulo.textContent = item.titulo || "-";

    const cliente = document.createElement("td");
    cliente.textContent = item.cliente || "-";

    const data = document.createElement("td");
    data.textContent = item.data || "-";

    const status = document.createElement("td");
    const statusMeta = getProposalStatusMeta(item.status || item.snapshot?.propostaStatus);
    const statusBadge = document.createElement("span");
    statusBadge.className = `proposal-status ${statusMeta.className}`;
    statusBadge.textContent = statusMeta.label;
    status.appendChild(statusBadge);

    const vendedor = document.createElement("td");
    vendedor.textContent = item.ownerName || "Sistema";
    vendedor.hidden = !showOwner;

    const actions = document.createElement("td");
    actions.className = "table-actions";

    const btnEditar = document.createElement("button");
    btnEditar.className = "btn btn-table btn-secondary";
    btnEditar.dataset.action = "editar-proposta";
    btnEditar.dataset.id = item.id;
    btnEditar.textContent = "Editar";

    const btnExcluir = document.createElement("button");
    btnExcluir.className = "btn btn-table btn-danger";
    btnExcluir.dataset.action = "excluir-proposta";
    btnExcluir.dataset.id = item.id;
    btnExcluir.textContent = "Excluir";

    actions.append(btnEditar, btnExcluir);
    row.append(titulo, cliente, data, status);
    if (showOwner) row.appendChild(vendedor);
    row.appendChild(actions);
    fragment.appendChild(row);
  });

  tbody.appendChild(fragment);
}

function renderDashboard() {
  if (!isAdmin()) return;

  const allUsers = getUsers().map(mergeUserProfile);
  const users = allUsers;
  const sellers = users.filter((user) => user.role === ROLE_SELLER);
  const allProposals = getSavedProposals();
  const proposals = allProposals;
  const sellersByEmail = new Map(
    sellers
      .map((seller) => [normalizeEmail(seller.email), seller.id])
      .filter(([email]) => email)
  );
  const sellersByName = new Map(
    sellers
      .map((seller) => [normalizeFilterText(seller.name), seller.id])
      .filter(([name]) => name)
  );
  const getSellerIdFromProposal = (proposal) =>
    proposal.ownerId
    || sellersByEmail.get(normalizeEmail(proposal.ownerEmail))
    || sellersByName.get(normalizeFilterText(proposal.ownerName))
    || "";
  const statusSummary = {
    [PROPOSAL_STATUS_EM_ANDAMENTO]: { count: 0, value: 0 },
    [PROPOSAL_STATUS_PERDIDA]: { count: 0, value: 0 },
    [PROPOSAL_STATUS_FECHADA]: { count: 0, value: 0 }
  };
  proposals.forEach((item) => {
    const normalizedStatus = normalizeProposalStatus(item.status || item.snapshot?.propostaStatus);
    if (!statusSummary[normalizedStatus]) return;
    statusSummary[normalizedStatus].count += 1;
    statusSummary[normalizedStatus].value += toNumber(item.total);
  });
  const tbody = $("tabelaDashboardBody");
  const query = getFilterQuery("filtroTabelaDashboard");

  $("dashboardTotalVendedores").textContent = String(sellers.length);
  $("dashboardVendedoresAtivos").textContent = String(sellers.filter((user) => user.active).length);
  $("dashboardTotalPropostas").textContent = String(proposals.length);
  $("dashboardValorGlobal").textContent = formatMoney(
    proposals.reduce((acc, item) => acc + toNumber(item.total), 0)
  );
  $("dashboardStatusEmAndamentoQtd").textContent = `${statusSummary[PROPOSAL_STATUS_EM_ANDAMENTO].count} propostas`;
  $("dashboardStatusEmAndamentoValor").textContent = formatMoney(statusSummary[PROPOSAL_STATUS_EM_ANDAMENTO].value);
  $("dashboardStatusPerdidaQtd").textContent = `${statusSummary[PROPOSAL_STATUS_PERDIDA].count} propostas`;
  $("dashboardStatusPerdidaValor").textContent = formatMoney(statusSummary[PROPOSAL_STATUS_PERDIDA].value);
  $("dashboardStatusFechadaQtd").textContent = `${statusSummary[PROPOSAL_STATUS_FECHADA].count} propostas`;
  $("dashboardStatusFechadaValor").textContent = formatMoney(statusSummary[PROPOSAL_STATUS_FECHADA].value);

  tbody.innerHTML = "";

  if (!sellers.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.textContent = "Nenhum vendedor cadastrado.";
    row.appendChild(cell);
    tbody.appendChild(row);
    renderDashboardCharts([], [], [], statusSummary);
    return;
  }

  const fragment = document.createDocumentFragment();
  const chartLabels = [];
  const chartPropostas = [];
  const chartValores = [];

  sellers.forEach((seller) => {
    const sellerProposals = proposals.filter((item) => getSellerIdFromProposal(item) === seller.id);
    const totalValue = sellerProposals.reduce((acc, item) => acc + toNumber(item.total), 0);
    const averageTicket = sellerProposals.length ? totalValue / sellerProposals.length : 0;
    const latestTimestamp = sellerProposals.reduce((latest, item) => Math.max(latest, toNumber(item.timestamp)), 0);
    chartLabels.push(seller.name);
    chartPropostas.push(sellerProposals.length);
    chartValores.push(totalValue);
    const rowData = [
      seller.name,
      seller.active ? "Ativo" : "Inativo",
      String(sellerProposals.length),
      formatMoney(totalValue),
      formatMoney(averageTicket),
      latestTimestamp ? formatDate(latestTimestamp) : "-"
    ];
    if (!matchesFilter(rowData, query)) return;
    const row = document.createElement("tr");

    rowData.forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    fragment.appendChild(row);
  });

  if (!fragment.childNodes.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.textContent = "Nenhum resultado encontrado para o filtro informado.";
    row.appendChild(cell);
    tbody.appendChild(row);
  } else {
    tbody.appendChild(fragment);
  }

  renderDashboardCharts(chartLabels, chartPropostas, chartValores, statusSummary);
}

function renderDashboardCharts(labels, propostas, valores, statusSummary = {}) {
  if (typeof Chart === "undefined") return;

  const CHART_COLORS = [
    "#16a34a", "#2563eb", "#d97706", "#dc2626", "#7c3aed",
    "#0891b2", "#be185d", "#059669", "#1d4ed8", "#b45309"
  ];

  const canvasPropostas = $("chartPropostasPorVendedor");
  const canvasValor = $("chartValorPorVendedor");
  const canvasParticipacao = $("chartParticipacaoVendedor");
  const canvasPropostasStatus = $("chartPropostasPorStatus");
  const canvasValorStatus = $("chartValorPorStatus");

  if (!canvasPropostas || !canvasValor || !canvasParticipacao) return;

  const bgColors = labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]);

  if (chartPropostasPorVendedor) {
    chartPropostasPorVendedor.destroy();
  }
  chartPropostasPorVendedor = new Chart(canvasPropostas, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Propostas",
        data: propostas,
        backgroundColor: bgColors,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
    }
  });

  if (chartValorPorVendedor) {
    chartValorPorVendedor.destroy();
  }
  chartValorPorVendedor = new Chart(canvasValor, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Valor total (R$)",
        data: valores,
        backgroundColor: bgColors,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (v) => `R$ ${formatNumber(v)}`
          }
        }
      }
    }
  });

  if (chartParticipacaoVendedor) {
    chartParticipacaoVendedor.destroy();
    chartParticipacaoVendedor = null;
  }
  const totalGlobal = valores.reduce((a, b) => a + b, 0);
  if (totalGlobal <= 0) {
    canvasParticipacao.parentElement.dataset.noData = "true";
    canvasParticipacao.style.display = "none";
    let msg = canvasParticipacao.parentElement.querySelector(".chart-no-data");
    if (!msg) {
      msg = document.createElement("p");
      msg.className = "chart-no-data";
      msg.textContent = "Nenhum valor registrado para exibir participação.";
      canvasParticipacao.parentElement.appendChild(msg);
    }
    msg.hidden = false;
  } else {
    canvasParticipacao.style.display = "";
    const noDataMsg = canvasParticipacao.parentElement.querySelector(".chart-no-data");
    if (noDataMsg) noDataMsg.hidden = true;
    chartParticipacaoVendedor = new Chart(canvasParticipacao, {
      type: "doughnut",
      data: {
        labels,
        datasets: [{
          data: valores,
          backgroundColor: bgColors
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const pct = ((ctx.parsed / totalGlobal) * 100).toFixed(1);
                return `${ctx.label}: ${pct}%`;
              }
            }
          }
        }
      }
    });
  }

  const statusOrder = [PROPOSAL_STATUS_EM_ANDAMENTO, PROPOSAL_STATUS_PERDIDA, PROPOSAL_STATUS_FECHADA];
  const statusLabels = statusOrder.map((status) => PROPOSAL_STATUS_META[status].label);
  const statusQuantidades = statusOrder.map((status) => statusSummary[status]?.count || 0);
  const statusValores = statusOrder.map((status) => toNumber(statusSummary[status]?.value));
  const statusColors = [
    getCssVarColor("--status-em-andamento", "#facc15"),
    getCssVarColor("--status-perdida", "#f87171"),
    getCssVarColor("--status-fechada", "#4ade80")
  ];

  if (canvasPropostasStatus) {
    if (chartPropostasPorStatus) {
      chartPropostasPorStatus.destroy();
    }
    chartPropostasPorStatus = new Chart(canvasPropostasStatus, {
      type: "bar",
      data: {
        labels: statusLabels,
        datasets: [{
          label: "Quantidade",
          data: statusQuantidades,
          backgroundColor: statusColors,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
      }
    });
  }

  if (canvasValorStatus) {
    if (chartValorPorStatus) {
      chartValorPorStatus.destroy();
    }
    chartValorPorStatus = new Chart(canvasValorStatus, {
      type: "bar",
      data: {
        labels: statusLabels,
        datasets: [{
          label: "Valor (R$)",
          data: statusValores,
          backgroundColor: statusColors,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (v) => `R$ ${formatNumber(v)}`
            }
          }
        }
      }
    });
  }
}

function getUserFormData() {
  const role = normalizeUserRole($("usuarioTipo").value);
  const usuarioSenhaEl = $("usuarioSenha");
  return {
    name: $("usuarioNome").value.trim(),
    email: normalizeEmail($("usuarioEmail").value),
    role,
    filial: DEFAULT_FILIAL,
    active: $("usuarioAtivo").checked,
    password: usuarioSenhaEl ? usuarioSenhaEl.value : ""
  };
}

function atualizarCampoAtivoUsuarioPorTipo() {
  const isAdminType = $("usuarioTipo").value === ROLE_ADMIN;
  $("usuarioAtivo").disabled = isAdminType;
  if (isAdminType) {
    $("usuarioAtivo").checked = true;
  }
}

function resetUserForm() {
  editingUserId = "";
  $("usuarioNome").value = "";
  $("usuarioEmail").value = "";
  $("usuarioTipo").value = ROLE_SELLER;
  if ($("usuarioFilial")) {
    $("usuarioFilial").value = DEFAULT_FILIAL;
    $("usuarioFilial").disabled = true;
  }
  const usuarioSenhaEl = $("usuarioSenha");
  if (usuarioSenhaEl) usuarioSenhaEl.value = "";
  $("usuarioAtivo").checked = true;
  $("usuarioAtivo").disabled = false;
  $("btnSalvarUsuario").textContent = "Salvar usuário";
}

function renderUsersTable() {
  if (!podeGerenciarUsuarios()) return;

  const tbody = $("tabelaUsuariosBody");
  const users = getUsers();

  const query = getFilterQuery("filtroTabelaUsuarios");
  tbody.innerHTML = "";

  const colCount = 7;

  if (!users.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = colCount;
    cell.textContent = "Nenhum usuário cadastrado.";
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  const fragment = document.createDocumentFragment();

  users.forEach((user) => {
    const rowData = [
      user.name || "-",
      user.email || "-",
      formatRole(user.role),
      user.filial || "-",
      user.active ? "Ativo" : "Inativo",
      getUserCreatorName(user)
    ];
    if (!matchesFilter(rowData, query)) return;

    const row = document.createElement("tr");
    const actions = document.createElement("td");
    actions.className = "table-actions";

    const btnEditar = document.createElement("button");
    btnEditar.className = "btn btn-table btn-secondary";
    btnEditar.dataset.action = "editar-usuario";
    btnEditar.dataset.id = user.id;
    btnEditar.textContent = "Editar";

    const btnAlternar = document.createElement("button");
    btnAlternar.className = `btn btn-table ${user.active ? "btn-danger" : "btn-secondary"}`;
    btnAlternar.dataset.action = "alternar-usuario";
    btnAlternar.dataset.id = user.id;
    btnAlternar.textContent = user.active ? "Inativar" : "Ativar";
    if (user.role === ROLE_ADMIN) {
      btnAlternar.textContent = "Sempre ativo";
      btnAlternar.className = "btn btn-table btn-secondary";
      btnAlternar.disabled = true;
    }

    const btnExcluir = document.createElement("button");
    btnExcluir.className = "btn btn-table btn-danger";
    btnExcluir.dataset.action = "excluir-usuario";
    btnExcluir.dataset.id = user.id;
    btnExcluir.textContent = "Excluir";
    btnExcluir.disabled = !canDeleteUser(user);
    if (btnExcluir.disabled) {
      btnExcluir.title = !podeGerenciarUsuarios()
        ? "Somente administradores podem excluir usuários."
        : user.id === currentUserId
          ? "Você não pode excluir o próprio usuário."
          : "Somente quem cadastrou este usuário pode excluí-lo.";
    }

    actions.append(btnEditar, btnAlternar, btnExcluir);

    rowData.forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    row.appendChild(actions);
    fragment.appendChild(row);
  });

  if (!fragment.childNodes.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = colCount;
    cell.textContent = "Nenhum usuário encontrado para o filtro informado.";
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  tbody.appendChild(fragment);
}

function carregarUsuarioPorId(id) {
  if (!requireAdminForUserManagement()) return;

  const user = getUsers().find((item) => item.id === id);
  if (!user) return;

  editingUserId = id;
  $("usuarioNome").value = user.name || "";
  $("usuarioEmail").value = user.email || "";
  $("usuarioTipo").value = normalizeUserRole(user.role);
  if ($("usuarioFilial")) {
    $("usuarioFilial").value = user.filial || DEFAULT_FILIAL;
    $("usuarioFilial").disabled = true;
  }
  $("usuarioAtivo").checked = Boolean(user.active);
  const usuarioSenhaEl = $("usuarioSenha");
  if (usuarioSenhaEl) usuarioSenhaEl.value = "";
  atualizarCampoAtivoUsuarioPorTipo();
  $("btnSalvarUsuario").textContent = "Atualizar usuário";
  activateTab("tabUsuarios");
  showToast("Usuário carregado para edição.");
}

function countActiveAdmins(users) {
  return users.filter((user) => user.role === ROLE_ADMIN && user.active).length;
}

async function salvarUsuario(event) {
  event?.preventDefault();
  if (!requireAdminForUserManagement()) return;

  const formData = getUserFormData();
  const formPassword = formData.password.trim();
  const users = getUsers();

  if (!formData.name || !formData.email) {
    showToast("Informe nome e e-mail do usuário.", true);
    return;
  }

  if (!OPEN_ACCESS_MODE && !editingUserId && formPassword.length < 6) {
    showToast("Defina uma senha com pelo menos 6 caracteres.", true);
    return;
  }

  const duplicatedUser = users.find((user) => user.email === formData.email && user.id !== editingUserId);
  if (duplicatedUser) {
    showToast("Já existe um usuário cadastrado com este e-mail.", true);
    return;
  }

  if (editingUserId === currentUserId && isAdmin() && (!formData.active || formData.role !== ROLE_ADMIN)) {
    showToast("O administrador logado não pode remover o próprio acesso administrativo.", true);
    return;
  }

  const now = Date.now();
  const creatingUser = !editingUserId;

  const activeValue = formData.role === ROLE_ADMIN ? true : formData.active;

  if (editingUserId) {
    const index = users.findIndex((user) => user.id === editingUserId);
    if (index < 0) {
      showToast("Usuário não encontrado.", true);
      return;
    }

    const currentRole = users[index].role;
    if (currentRole === ROLE_ADMIN && formData.role !== ROLE_ADMIN) {
      showToast("Administradores não podem ter o tipo alterado.", true);
      return;
    }

    if (currentRole !== ROLE_ADMIN && formData.role === ROLE_ADMIN) {
      showToast("Não é permitido promover usuários para administrador.", true);
      return;
    }

    const updatedUser = {
      ...users[index],
      name: formData.name,
      email: formData.email,
      role: formData.role,
      filial: DEFAULT_FILIAL,
      active: activeValue,
      updatedAt: now,
      profile: {
        ...buildDefaultProfile({ name: formData.name, email: formData.email }),
        ...(users[index].profile || {}),
        nomeVendedor: formData.name,
        emailVendedor: formData.email
      }
    };

    if (!OPEN_ACCESS_MODE && formPassword) {
      if (formPassword.length < 6) {
        showToast("A nova senha deve ter pelo menos 6 caracteres.", true);
        return;
      }
      Object.assign(updatedUser, await createPasswordCredentials(formPassword), {
        mustChangePassword: true
      });
    }

    const nextUsers = users.map((user) => (user.id === editingUserId ? updatedUser : user));
    if (!countActiveAdmins(nextUsers)) {
      showToast("Mantenha ao menos um administrador ativo.", true);
      return;
    }

    if (!saveUsers(nextUsers)) return;
  } else {
    const user = {
      id: createUniqueId(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      filial: DEFAULT_FILIAL,
      active: activeValue,
      ...(await createPasswordCredentials(OPEN_ACCESS_MODE ? generateOpenAccessPassword() : formPassword)),
      mustChangePassword: !OPEN_ACCESS_MODE,
      profile: buildDefaultProfile({ name: formData.name, email: formData.email }),
      createdBy: currentUserId,
      createdByName: currentUser?.name || "Administrador",
      createdByEmail: currentUser?.email || "",
      createdAt: now,
      updatedAt: now
    };

    if (!saveUsers([user, ...users])) return;
  }

  refreshCurrentUser();
  updateSessionInfo();
  resetUserForm();
  renderUsersTable();
  renderDashboard();
  showToast("Usuário salvo com sucesso.");
}

function alternarStatusUsuario(id) {
  if (!requireAdminForUserManagement()) return;

  const users = getUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) return;

  const targetUser = users[index];
  if (targetUser.role === ROLE_ADMIN) {
    showToast("Administrador deve permanecer ativo.", true);
    return;
  }

  const nextUsers = users.map((user) => user.id === id ? { ...user, active: !user.active, updatedAt: Date.now() } : user);
  if (!countActiveAdmins(nextUsers)) {
    showToast("Mantenha ao menos um administrador ativo.", true);
    return;
  }

  if (!saveUsers(nextUsers)) return;
  renderUsersTable();
  renderDashboard();
  showToast(`Usuário ${targetUser.active ? "inativado" : "ativado"} com sucesso.`);
}

function excluirUsuarioPorId(id) {
  if (!requireAdminForUserManagement()) return;

  const users = getUsers();
  const targetUser = users.find((user) => user.id === id);
  if (!targetUser) {
    showToast("Usuário não encontrado.", true);
    return;
  }

  if (targetUser.id === currentUserId) {
    showToast("Você não pode excluir o próprio usuário.", true);
    return;
  }

  if (!canDeleteUser(targetUser)) {
    showToast("Somente quem cadastrou este usuário pode excluí-lo.", true);
    return;
  }

  const reassignedUsers = users
    .filter((user) => user.id !== id)
    .map((user) => {
      if (user.createdBy !== id) return user;
      return {
        ...user,
        createdBy: currentUserId,
        createdByName: currentUser?.name || "Administrador",
        createdByEmail: currentUser?.email || "",
        updatedAt: Date.now()
      };
    });

  if (!countActiveAdmins(reassignedUsers)) {
    showToast("Mantenha ao menos um administrador ativo.", true);
    return;
  }

  if (!saveUsers(reassignedUsers)) return;
  if (editingUserId === id) {
    resetUserForm();
  }
  renderUsersTable();
  renderDashboard();
  showToast("Usuário excluído com sucesso.");
}

function salvarPerfil() {
  if (!refreshCurrentUser()) return;

  const users = getUsers();
  const index = users.findIndex((user) => user.id === currentUserId);
  if (index < 0) return;

  const profile = getProfileFromForm();
  users[index] = {
    ...users[index],
    updatedAt: Date.now(),
    profile: {
      ...buildDefaultProfile(users[index]),
      ...profile
    }
  };

  if (!saveUsers(users)) return;
  refreshCurrentUser();
  atualizarPreviaPerfil();
  renderizarTabelaPropostas();
  renderDashboard();
  showToast("Perfil salvo com sucesso.");
}

function limparPerfil() {
  logoDataUrl = "";
  applyProfileToForm(buildDefaultProfile(currentUser || {}));
  showToast("Campos do perfil limpos.");
}

function pushServiceLine(lines, label, total, metragem, { includeZero = false } = {}) {
  const normalizedTotal = Math.max(0, toNumber(total));
  if (!includeZero && normalizedTotal === 0) return;
  lines.push({
    label,
    total: normalizedTotal,
    valorM2: metragem > 0 ? normalizedTotal / metragem : 0
  });
}

function renderServicosDetalhados(lines) {
  const tbody = $("prevServicosDetalhados");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (!lines.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 3;
    cell.textContent = "Serviços conforme escopo informado.";
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  const fragment = document.createDocumentFragment();
  lines.forEach((item) => {
    const row = document.createElement("tr");
    [
      { label: PROPOSAL_SERVICE_COLUMN_LABELS.service, value: item.label },
      { label: PROPOSAL_SERVICE_COLUMN_LABELS.valuePerSquareMeter, value: formatMoney(item.valorM2) },
      { label: PROPOSAL_SERVICE_COLUMN_LABELS.total, value: formatMoney(item.total) }
    ].forEach((column) => {
      const cell = document.createElement("td");
      cell.dataset.label = column.label;
      cell.textContent = column.value;
      row.appendChild(cell);
    });
    fragment.appendChild(row);
  });
  tbody.appendChild(fragment);
}

function calcularOrcamento() {
  const cliente = $("cliente").value.trim() || "-";
  const obra = $("obra").value.trim() || "-";
  const documento = $("documento").value.trim() || "-";
  const telefone = $("telefone").value.trim() || "-";
  const endereco = $("endereco").value.trim() || "-";
  const metragem = toNumber($("metragem").value);
  const distancia = toNumber($("distancia").value);
  const consumo = toNumber($("consumo").value);
  const precoCombustivel = toNumber($("precoCombustivel").value);
  const pedagio = toNumber($("pedagio").value);
  const viagens = toNumber($("viagens").value);
  const quantidadeVeiculosDigitada = parseInt($("quantidadeVeiculos").value, 10);
  const quantidadeVeiculos = quantidadeVeiculosDigitada > 0 ? quantidadeVeiculosDigitada : 1;
  const consumoCaminhao = toNumber($("consumoCaminhao").value);
  const pedagioCaminhao = toNumber($("pedagioCaminhao").value);
  const viagensCaminhao = toNumber($("viagensCaminhao").value);
  const quantidadeCaminhoes = toPositiveIntegerOrFallback($("quantidadeCaminhoes").value, 0);
  const gastoLogisticoPessoal = toNumber($("gastoLogisticoPessoal").value);
  const gastoLogisticoMaquinario = toNumber($("gastoLogisticoMaquinario").value);
  const valorDia = toNumber($("valorDia").value);
  const dias = toNumber($("dias").value);
  const diasPreparacao = toNumber($("diasPreparacao").value);
  const funcionariosPreparacao = toPositiveIntegerOrFallback($("funcionariosPreparacao").value, 0);
  const diasConcretagem = toNumber($("diasConcretagem").value);
  const funcionariosConcretagem = toPositiveIntegerOrFallback($("funcionariosConcretagem").value, 0);
  const diasAcabamento = toNumber($("diasAcabamento").value);
  const funcionariosAcabamento = toPositiveIntegerOrFallback($("funcionariosAcabamento").value, 0);
  const quantidadeDiaristas = toPositiveIntegerOrFallback($("quantidadeDiaristas").value, 0);
  const valorDiarista = toNumber($("valorDiarista").value);
  const quantidadeHorasExtras = toNumber($("quantidadeHorasExtras").value);
  const valorHoraExtra = toNumber($("valorHoraExtra").value);
  const encargos = toNumber($("encargos").value);
  const alimentacaoFuncionario = toNumber($("alimentacaoFuncionario").value);
  const hotelFuncionario = toNumber($("hotelFuncionario").value);
  const terraplanagemTotal = toNumber($("terraplanagemTotal").value);
  const pisoComTela = $("pisoTela").value === "com_tela";
  const valorTelaM2 = pisoComTela ? toNumber($("valorTelaM2").value) : 0;
  const custoTelaTotal = metragem > 0 ? valorTelaM2 * metragem : 0;
  const curaQuimicaTipo = $("curaQuimica").value;
  const comCuraQuimica = curaQuimicaTipo !== "sem_cura";
  const valorCuraM2 = comCuraQuimica ? toNumber($("valorCuraM2").value) : 0;
  const custoCuraQuimica = metragem > 0 ? valorCuraM2 * metragem : 0;
  const equipamentosTipo = getEquipamentosTipo();
  const equipamentosAlugados = equipamentosTipo === EQUIPAMENTOS_TIPO_ALUGADOS
    ? readEquipamentosAlugadosFromUI({ dias, updateTotals: true })
    : [];
  setEquipamentosAlugadosItemsSnapshot(equipamentosAlugados);
  const custoEquipamentosAlugados = equipamentosAlugados
    .reduce((total, item) => total + item.totalItem, 0);
  const locacaoManualValor = toNumber($("locacaoManualValor").value);
  const locacaoManualDescricao = $("locacaoManualDescricao").value.trim();
  const tipoContratacao = $("tipoContratacao").value;
  const preparoLajeMaoObraM2 = toNumber($("preparoLajeMaoObraM2").value);
  const preparoLajeMaterialM2 = toNumber($("preparoLajeMaterialM2").value);
  const pisoIntertravadoMaoObraM2 = toNumber($("pisoIntertravadoMaoObraM2").value);
  const pisoIntertravadoMaterialM2 = toNumber($("pisoIntertravadoMaterialM2").value);
  const concretoM2 = toNumber($("concretoM2").value);
  const fibraM2 = toNumber($("fibraM2").value);
  const agregadoMineralM2 = toNumber($("agregadoMineralM2").value);
  const endurecedorM2 = toNumber($("endurecedorM2").value);
  const juntaPuM2 = toNumber($("juntaPuM2").value);
  const labioPolimericoM2 = toNumber($("labioPolimericoM2").value);
  const pinturaEpoxiM2 = toNumber($("pinturaEpoxiM2").value);
  const servicoAdicionalValor = toNumber($("servicoAdicionalValor").value);
  const servicoAdicionalDescricao = $("servicoAdicionalDescricao").value.trim();
  const outrosCustos = toNumber($("outrosCustos").value);
  const lucroPercentual = toNumber($("lucro").value);
  const impostoPercentual = toNumber($("impostoPercentual").value);
  const machineDb = readMachineDatabaseFromForm();
  const funcionariosAutomaticos = calcularFuncionariosPorMetragem(metragem);
  const modoFuncionarios = getModoFuncionarios();
  const funcionariosSelecionados =
    modoFuncionarios === WORKER_MODE_MANUAL
      ? Math.max(0, Math.round(toNumber($("funcionarios").value)))
      : funcionariosAutomaticos;

  if (modoFuncionarios === WORKER_MODE_AUTO) {
    $("funcionarios").value = funcionariosAutomaticos;
  } else {
    $("funcionarios").value = funcionariosSelecionados;
  }

  const multiplicadorViagens = viagens > 0 ? viagens : 1;
  const distanciaTotal = distancia * multiplicadorViagens;
  const custoCombustivel = consumo > 0 ? ((distanciaTotal / consumo) * precoCombustivel) * quantidadeVeiculos : 0;
  const custoPedagio = pedagio * multiplicadorViagens * quantidadeVeiculos;
  const multiplicadorViagensCaminhao = viagensCaminhao;
  const distanciaTotalCaminhao = distancia * multiplicadorViagensCaminhao;
  const custoCombustivelCaminhao = consumoCaminhao > 0
    ? ((distanciaTotalCaminhao / consumoCaminhao) * precoCombustivel) * quantidadeCaminhoes
    : 0;
  const custoPedagioCaminhao = pedagioCaminhao * multiplicadorViagensCaminhao * quantidadeCaminhoes;
  const custoDeslocamento =
    custoCombustivel
    + custoPedagio
    + custoCombustivelCaminhao
    + custoPedagioCaminhao
    + gastoLogisticoPessoal
    + gastoLogisticoMaquinario;
  const atividadePersonDays =
    (funcionariosPreparacao * diasPreparacao)
    + (funcionariosConcretagem * diasConcretagem)
    + (funcionariosAcabamento * diasAcabamento);
  const usaCronogramaAtividades = atividadePersonDays > 0;
  const funcionariosPico = usaCronogramaAtividades
    ? Math.max(funcionariosPreparacao, funcionariosConcretagem, funcionariosAcabamento)
    : funcionariosSelecionados;
  const funcionarioDias = usaCronogramaAtividades ? atividadePersonDays : funcionariosSelecionados * dias;
  const diaristaDias = quantidadeDiaristas * dias;
  const totalPessoaDias = funcionarioDias + diaristaDias;
  const custoMaoDeObraFuncionarios = funcionarioDias * valorDia;
  const custoDiaristas = diaristaDias * valorDiarista;
  const custoHorasExtras = quantidadeHorasExtras * valorHoraExtra;
  const custoMaoDeObra = custoMaoDeObraFuncionarios + custoDiaristas + custoHorasExtras;
  const custoAlimentacao = totalPessoaDias * alimentacaoFuncionario;
  const custoHotel = totalPessoaDias * hotelFuncionario;
  const jogosFacasEstimados = metragem > 0 && machineDb.rendimentoFacasM2 > 0
    ? Math.ceil(metragem / machineDb.rendimentoFacasM2)
    : 0;
  const jogosDiscosEstimados = metragem > 0 && machineDb.rendimentoDiscoM2 > 0
    ? Math.ceil(metragem / machineDb.rendimentoDiscoM2)
    : 0;
  const facasEstimadas = jogosFacasEstimados * machineDb.facasPorJogo;
  const discosEstimados = jogosDiscosEstimados * machineDb.discosPorJogo;
  const custoFacas = facasEstimadas * machineDb.precoFaca;
  const custoDiscos = discosEstimados * machineDb.precoDisco;
  const consumoTotalMaquinasPorM2 =
    machineDb.consumoDuplaLitrosM2
    + machineDb.consumoSimplesLitrosM2
    + machineDb.consumoCorteLitrosM2;
  const litrosCombustivelMaquinas = metragem * consumoTotalMaquinasPorM2;
  const custoCombustivelMaquinas = litrosCombustivelMaquinas * precoCombustivel;
  const custoPreparoLaje = metragem * (preparoLajeMaoObraM2 + preparoLajeMaterialM2);
  const custoPisoIntertravado = metragem * (pisoIntertravadoMaoObraM2 + pisoIntertravadoMaterialM2);
  const custoConcreto = metragem * concretoM2;
  const custoFibra = metragem * fibraM2;
  const custoAgregadoMineral = metragem * agregadoMineralM2;
  const custoEndurecedor = metragem * endurecedorM2;
  const custoJuntaPu = metragem * juntaPuM2;
  const custoLabioPolimerico = metragem * labioPolimericoM2;
  const custoPinturaEpoxi = metragem * pinturaEpoxiM2;
  const custoAtividadesMateriais =
    custoPreparoLaje
    + custoPisoIntertravado
    + custoConcreto
    + custoFibra
    + custoAgregadoMineral
    + custoEndurecedor
    + custoJuntaPu
    + custoLabioPolimerico
    + custoPinturaEpoxi
    + servicoAdicionalValor;
  const subtotal =
    custoDeslocamento
    + custoMaoDeObra
    + custoAlimentacao
    + custoHotel
    + custoFacas
    + custoDiscos
    + custoCombustivelMaquinas
    + encargos
    + terraplanagemTotal
    + custoTelaTotal
    + custoEquipamentosAlugados
    + custoCuraQuimica
    + locacaoManualValor
    + custoAtividadesMateriais
    + outrosCustos;
  const valorLucro = subtotal * (lucroPercentual / 100);
  const totalComLucro = subtotal + valorLucro;
  const valorImposto = totalComLucro * (impostoPercentual / 100);
  const total = totalComLucro;
  const valorM2 = metragem > 0 ? total / metragem : 0;
  const profile = getProfileFromForm();

  $("resCliente").textContent = cliente;
  $("resObra").textContent = `OBRA: ${obra}`;
  $("resArea").textContent = `${formatNumber(metragem)} m²`;
  $("prevClienteDocumento").textContent = `CPF/CNPJ: ${documento}`;
  $("prevClienteTelefone").textContent = `Telefone: ${telefone}`;
  $("prevEnderecoObra").textContent = `Endereço da obra: ${endereco}`;
  $("prevResponsavel").textContent = `A/C: ${$("propostaResponsavel").value.trim() || "-"}`;
  $("prevLocalData").textContent = [$("propostaCidade").value.trim(), formatDate()].filter(Boolean).join(", ");
  $("prevNumeroProposta").textContent = `Proposta Nº ${$("propostaNumero").value.trim() || "-"}`;

  $("resCombustivel").textContent = formatMoney(custoCombustivel);
  $("resPedagio").textContent = formatMoney(custoPedagio);
  $("resDeslocamento").textContent = formatMoney(custoDeslocamento);
  $("resMaoDeObra").textContent = formatMoney(custoMaoDeObra);
  $("resFuncionarios").textContent = usaCronogramaAtividades
    ? `${funcionariosPico} (pico) / ${formatNumber(funcionarioDias)} ${pluralize(funcionarioDias, "funcionário-dia", "funcionários-dia")}`
    : String(funcionariosSelecionados);
  $("resAlimentacao").textContent = formatMoney(custoAlimentacao);
  $("resHotel").textContent = formatMoney(custoHotel);
  $("resFacasQtd").textContent = formatConsumableSetsAndItems(jogosFacasEstimados, facasEstimadas, "faca", "facas");
  $("resFacasCusto").textContent = formatMoney(custoFacas);
  $("resDiscosQtd").textContent = formatConsumableSetsAndItems(jogosDiscosEstimados, discosEstimados, "disco", "discos");
  $("resDiscosCusto").textContent = formatMoney(custoDiscos);
  $("resCombustivelMaquinasLitros").textContent = `${formatNumber(litrosCombustivelMaquinas)} L`;
  $("resCombustivelMaquinas").textContent = formatMoney(custoCombustivelMaquinas);
  $("resEncargos").textContent = formatMoney(encargos);
  $("resOutros").textContent = formatMoney(outrosCustos + locacaoManualValor + custoAtividadesMateriais);
  $("resEquipamentosAlugados").textContent = formatMoney(custoEquipamentosAlugados);
  $("resCuraQuimica").textContent = formatMoney(custoCuraQuimica);
  $("resSubtotal").textContent = formatMoney(subtotal);
  $("resLucro").textContent = formatMoney(valorLucro);
  $("resImposto").textContent = formatMoney(valorImposto);
  $("resTotal").textContent = formatMoney(total);
  $("resValorM2").textContent = formatMoney(valorM2);

  $("prevTitulo").textContent = $("propostaTitulo").value.trim() || "Proposta Comercial";
  $("prevValidade").textContent = $("propostaValidade").value.trim() || "-";
  $("prevPrazo").textContent = $("propostaPrazo").value.trim() || "-";
  $("prevPagamento").textContent = $("propostaPagamento").value.trim() || "-";
  $("prevTextoPadrao").textContent = getTextoPadraoProposta();
  $("prevObservacoes").textContent = `Observações: ${$("propostaObservacoes").value.trim() || "-"}`;
  $("prevVendedorNome").textContent = profile.nomeVendedor || currentUser?.name || "-";
  $("prevTipoContratacao").textContent = getTipoContratacaoLabel(tipoContratacao);
  const servicosComplementaresCliente = [
    { label: "Colocação de armação/tela", total: custoTelaTotal },
    { label: "Fornecimento e aplicação de cura química", total: custoCuraQuimica },
    { label: "Preparação de laje (chaveamento)", total: custoPreparoLaje },
    { label: "Colocação de pisos intertravados", total: custoPisoIntertravado },
    { label: "Fornecimento e aplicação de concreto", total: custoConcreto },
    { label: "Fornecimento e aplicação de fibra", total: custoFibra },
    { label: "Fornecimento e aplicação de agregado mineral", total: custoAgregadoMineral },
    { label: "Fornecimento e aplicação de endurecedor", total: custoEndurecedor },
    { label: "Fornecimento e aplicação de junta de PU", total: custoJuntaPu },
    { label: "Fornecimento e aplicação de lábio polimérico", total: custoLabioPolimerico },
    { label: "Pintura à base de epóxi", total: custoPinturaEpoxi },
    { label: servicoAdicionalDescricao || "Serviço adicional", total: servicoAdicionalValor }
  ];
  const totalServicosComplementaresCliente = servicosComplementaresCliente
    .reduce((acc, item) => acc + item.total, 0);
  const servicosDetalhados = [];
  pushServiceLine(
    servicosDetalhados,
    "Execução do piso industrial",
    Math.max(0, total - totalServicosComplementaresCliente),
    metragem
  );
  servicosComplementaresCliente.forEach((item) => {
    pushServiceLine(servicosDetalhados, item.label, item.total, metragem);
  });
  renderServicosDetalhados(servicosDetalhados);
  atualizarPreviaPerfil();

  return {
    cliente,
    obra,
    metragem,
    total,
    valorM2,
    funcionariosPico
  };
}

function atualizarTextoBotaoProposta() {
  $("btnSalvarProposta").textContent = editingProposalId ? "Atualizar proposta" : "Salvar proposta";
}

function getClientFormData() {
  return {
    name: $("clientNome").value.trim(),
    document: $("clientDocumento").value.trim(),
    email: normalizeEmail($("clientEmail").value),
    phone: $("clientTelefone").value.trim(),
    project: $("clientObra").value.trim(),
    cep: $("clientCep").value.trim(),
    address: $("clientEndereco").value.trim()
  };
}

function applyClientToForm(client = {}) {
  $("clientNome").value = client.name || "";
  $("clientDocumento").value = client.document || "";
  $("clientEmail").value = client.email || "";
  $("clientTelefone").value = client.phone || "";
  $("clientObra").value = client.project || "";
  $("clientCep").value = client.cep || "";
  $("clientEndereco").value = client.address || "";
}

function resetClientForm() {
  editingClientId = "";
  applyClientToForm({});
  $("btnSalvarCliente").textContent = "Salvar cliente";
}

function applyClientToProposal(client) {
  if (!client) return;
  $("propostaClienteId").value = client.id || "";
  $("cliente").value = client.name || "";
  $("documento").value = client.document || "";
  $("email").value = client.email || "";
  $("telefone").value = client.phone || "";
  $("obra").value = client.project || "";
  $("cep").value = client.cep || "";
  $("endereco").value = client.address || "";
}

function clearProposalClientFields() {
  $("propostaClienteId").value = "";
  $("cliente").value = "";
  $("documento").value = "";
  $("email").value = "";
  $("telefone").value = "";
  $("obra").value = "";
  $("cep").value = "";
  $("endereco").value = "";
}

function populateProposalClientSelect() {
  const select = $("propostaClienteId");
  if (!select) return;
  const currentValue = select.value;
  const clients = getVisibleClients().sort((a, b) => (a.name || "").localeCompare(b.name || "", "pt-BR"));

  select.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = clients.length
    ? "Selecione um cliente cadastrado"
    : "Nenhum cliente cadastrado.";
  select.appendChild(placeholder);

  clients.forEach((client) => {
    const option = document.createElement("option");
    option.value = client.id;
    const clientName = client.name || "Cliente sem nome";
    option.textContent = client.project ? `${clientName} - ${client.project}` : clientName;
    select.appendChild(option);
  });

  if (clients.some((client) => client.id === currentValue)) {
    select.value = currentValue;
    return;
  }

  const snapshotValue = String(select.dataset.snapshotValue || "");
  if (clients.some((client) => client.id === snapshotValue)) {
    select.value = snapshotValue;
    delete select.dataset.snapshotValue;
    return;
  }

  select.value = "";
  delete select.dataset.snapshotValue;
}

function renderClientsTable() {
  const tbody = $("tabelaClientesBody");
  if (!tbody) return;

  const clients = getVisibleClients();
  const query = getFilterQuery("filtroTabelaClientes");
  const showOwner = isAdmin();
  const filteredList = clients.filter((client) => matchesFilter([
    client.name,
    client.document,
    client.email,
    client.phone,
    client.project,
    client.ownerName
  ], query));

  $("colunaClienteVendedor").hidden = !showOwner;
  $("clientesTituloSecao").textContent = showOwner ? "Todos os clientes cadastrados" : "Meus clientes cadastrados";
  tbody.innerHTML = "";

  if (!filteredList.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = showOwner ? 7 : 6;
    cell.textContent = query ? "Nenhum cliente encontrado para o filtro informado." : "Nenhum cliente cadastrado.";
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  const fragment = document.createDocumentFragment();

  filteredList.forEach((client) => {
    const row = document.createElement("tr");
    const values = [
      client.name || "-",
      client.document || "-",
      client.phone || "-",
      client.project || "-",
      client.address || "-"
    ];

    values.forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    if (showOwner) {
      const ownerCell = document.createElement("td");
      ownerCell.textContent = client.ownerName || "Sistema";
      row.appendChild(ownerCell);
    }

    const actions = document.createElement("td");
    actions.className = "table-actions";

    const btnEditar = document.createElement("button");
    btnEditar.className = "btn btn-table btn-secondary";
    btnEditar.dataset.action = "editar-cliente";
    btnEditar.dataset.id = client.id;
    btnEditar.textContent = "Editar";

    const btnExcluir = document.createElement("button");
    btnExcluir.className = "btn btn-table btn-danger";
    btnExcluir.dataset.action = "excluir-cliente";
    btnExcluir.dataset.id = client.id;
    btnExcluir.textContent = "Excluir";

    actions.append(btnEditar, btnExcluir);
    row.appendChild(actions);
    fragment.appendChild(row);
  });

  tbody.appendChild(fragment);
}

function carregarClientePorId(id) {
  const client = getClientById(id);
  if (!client) {
    showToast("Cliente não encontrado.", true);
    return;
  }

  editingClientId = id;
  applyClientToForm(client);
  $("btnSalvarCliente").textContent = "Atualizar cliente";
  activateTab("tabClientes");
  showToast("Cliente carregado para edição.");
}

function excluirClientePorId(id) {
  const clients = getSavedClients();
  const targetClient = clients.find((client) => client.id === id);
  if (!targetClient) return;

  if (!isAdmin() && targetClient.ownerId !== currentUserId) {
    showToast("Você não pode excluir clientes de outro usuário.", true);
    return;
  }

  const nextClients = clients.filter((client) => client.id !== id);
  if (!saveClients(nextClients)) return;
  if (editingClientId === id) {
    resetClientForm();
  }
  if ($("propostaClienteId").value === id) {
    clearProposalClientFields();
  }
  renderClientsTable();
  populateProposalClientSelect();
  calcularOrcamento();
  salvarRascunhoLocal();
  showToast("Cliente excluído com sucesso.");
}

async function salvarCliente(event) {
  event?.preventDefault();
  if (!refreshCurrentUser()) return;

  const formData = getClientFormData();
  if (!formData.name) {
    showToast("Informe ao menos o nome do cliente.", true);
    return;
  }

  const clients = getSavedClients();
  const now = Date.now();

  if (editingClientId) {
    const index = clients.findIndex((client) => client.id === editingClientId);
    if (index < 0) {
      showToast("Cliente não encontrado.", true);
      return;
    }
    if (!isAdmin() && clients[index].ownerId !== currentUserId) {
      showToast("Você não pode editar clientes de outro usuário.", true);
      return;
    }

    clients[index] = {
      ...clients[index],
      ...formData,
      filial: DEFAULT_FILIAL,
      updatedAt: now
    };
  } else {
    clients.unshift({
      id: createUniqueId(),
      ...formData,
      ownerId: currentUserId,
      ownerName: currentUser?.name || "",
      ownerEmail: currentUser?.email || "",
      filial: DEFAULT_FILIAL,
      createdAt: now,
      updatedAt: now
    });
  }

  if (!saveClients(clients)) return;

  const currentSelectedClientId = $("propostaClienteId").value;
  const updatedClientId = editingClientId ? editingClientId : clients[0]?.id;
  const updatedClient = clients.find((client) => client.id === updatedClientId);

  resetClientForm();
  renderClientsTable();
  populateProposalClientSelect();
  if (updatedClient && currentSelectedClientId === updatedClient.id) {
    applyClientToProposal(updatedClient);
    calcularOrcamento();
    salvarRascunhoLocal();
  }
  showToast("Cliente salvo com sucesso.");
}

function limparCampos() {
  const ids = [
    "propostaClienteId",
    "cliente",
    "documento",
    "email",
    "telefone",
    "obra",
    "cep",
    "endereco",
    "metragem",
    "distancia",
    "consumo",
    "precoCombustivel",
    "pedagio",
    "viagens",
    "quantidadeVeiculos",
    "consumoCaminhao",
    "pedagioCaminhao",
    "viagensCaminhao",
    "quantidadeCaminhoes",
    "gastoLogisticoPessoal",
    "gastoLogisticoMaquinario",
    "paramRendimentoFacas",
    "paramFacasPorJogo",
    "paramPrecoFaca",
    "paramRendimentoDisco",
    "paramDiscosPorJogo",
    "paramPrecoDisco",
    "paramConsumoMaquinaDupla",
    "paramConsumoMaquinaSimples",
    "paramConsumoMaquinaCorte",
    "modoFuncionarios",
    "funcionarios",
    "valorDia",
    "dias",
    "diasPreparacao",
    "funcionariosPreparacao",
    "diasConcretagem",
    "funcionariosConcretagem",
    "diasAcabamento",
    "funcionariosAcabamento",
    "quantidadeDiaristas",
    "valorDiarista",
    "quantidadeHorasExtras",
    "valorHoraExtra",
    "encargos",
    "alimentacaoFuncionario",
    "hotelFuncionario",
    "terraplanagemTotal",
    "pisoTela",
    "valorTelaM2",
    "curaQuimica",
    "valorCuraM2",
    "tipoContratacao",
    "preparoLajeMaoObraM2",
    "preparoLajeMaterialM2",
    "pisoIntertravadoMaoObraM2",
    "pisoIntertravadoMaterialM2",
    "concretoM2",
    "fibraM2",
    "agregadoMineralM2",
    "endurecedorM2",
    "juntaPuM2",
    "labioPolimericoM2",
    "pinturaEpoxiM2",
    "servicoAdicionalValor",
    "servicoAdicionalDescricao",
    "equipamentosTipo",
    "equipamentosAlugadosItems",
    "equipamentosAlugadosObservacao",
    "locacaoManualValor",
    "locacaoManualDescricao",
    "outrosCustos",
    "lucro",
    "impostoPercentual",
    "propostaTitulo",
    "propostaNumero",
    "propostaValidade",
    "propostaCidade",
    "propostaPagamento",
    "propostaPrazo",
    "propostaResponsavel",
    "propostaStatus",
    "propostaStatusObservacao",
    "propostaTextoPadrao",
    "propostaObservacoes"
  ];

  ids.forEach((id) => {
    $(id).value = "";
  });

  $("viagens").value = 1;
  $("quantidadeVeiculos").value = 1;
  $("viagensCaminhao").value = 0;
  $("quantidadeCaminhoes").value = 0;
  $("modoFuncionarios").value = WORKER_MODE_AUTO;
  $("pisoTela").value = "sem_tela";
  $("curaQuimica").value = "sem_cura";
  $("tipoContratacao").value = CONTRACT_TYPE_LABOR;
  $("equipamentosTipo").value = EQUIPAMENTOS_TIPO_PROPRIOS;
  $("impostoPercentual").value = DEFAULT_IMPOSTO_PERCENTUAL;
  $("propostaStatus").value = PROPOSAL_STATUS_EM_ANDAMENTO;
  $("propostaTextoPadrao").value = DEFAULT_STANDARD_TEXT;
  editingProposalId = "";
  atualizarModoFuncionarios({ preserveManualValue: false });
  atualizarCampoPisoTela({ preserveValueWhenDisabled: false });
  atualizarCampoCuraQuimica({ preserveValueWhenDisabled: false });
  atualizarCampoEquipamentosAlugados({ preserveValuesWhenHidden: false, syncFromSnapshot: true });
  atualizarCampoStatusProposta({ preserveValueWhenHidden: false });
  atualizarTextoBotaoProposta();
  if (currentUserId) {
    removeStorageItem(getDraftStorageKey());
    clearFirestoreDraft();
  }
  updateDraftStatus("Rascunho limpo.");
  calcularOrcamento();
  showToast("Campos limpos com sucesso.");
}

function salvarBancoDadosEstimativas(event) {
  event?.preventDefault();
  if (!isAdmin()) return;

  const nextDb = readMachineDatabaseFromForm();
  if (!saveMachineDatabase(nextDb)) return;

  calcularOrcamento();
  salvarRascunhoLocal();
  showToast("Parâmetros manuais salvos.");
}

function restaurarBancoDadosEstimativas() {
  if (!isAdmin()) return;
  if (!saveMachineDatabase(DEFAULT_MACHINE_DATABASE)) return;

  applyMachineDatabaseToForm();
  calcularOrcamento();
  salvarRascunhoLocal();
  showToast("Parâmetros restaurados para o padrão.");
}

function salvarRascunhoLocal() {
  if (!currentUserId) return;

  const payload = {
    updatedAt: Date.now(),
    pendingSync: true,
    snapshot: proposalFieldsSnapshot()
  };
  const saved = writeDraftPayloadToStorage(payload);
  if (saved) {
    syncFirestoreDraftPayload(payload);
    const time = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    });
    updateDraftStatus(`Rascunho salvo automaticamente às ${time} neste dispositivo.`);
  }
}

async function carregarRascunhoLocal() {
  if (!currentUserId) {
    updateDraftStatus("Faça login para salvar o rascunho automaticamente.");
    return;
  }

  let localPayload = readDraftPayloadFromStorage();

  if (!localPayload) {
    const legacySnapshot = readLegacyJsonStorage(LEGACY_DRAFT_STORAGE_KEY, null);
    if (legacySnapshot) {
      localPayload = normalizeDraftPayload(legacySnapshot);
      writeDraftPayloadToStorage(localPayload);
      removeLegacyStorageItem(LEGACY_DRAFT_STORAGE_KEY);
    }
  }

  const firestorePayload = firebaseSyncEnabled ? await readFirestoreDraftPayload() : null;
  const shouldSyncLocalToFirestore = Boolean(localPayload && (localPayload.pendingSync || !firestorePayload));
  const payload = localPayload?.pendingSync
    ? localPayload
    : (firestorePayload || localPayload);

  if (!payload) {
    updateDraftStatus("Os dados do orçamento ficam salvos automaticamente neste dispositivo.");
    return;
  }

  writeDraftPayloadToStorage(payload);
  if (shouldSyncLocalToFirestore) {
    syncFirestoreDraftPayload(localPayload);
  }

  applyProposalSnapshot(payload.snapshot);
  updateDraftStatus("Rascunho restaurado do armazenamento local.");
}

async function salvarProposta() {
  if (!refreshCurrentUser()) return;

  const resumo = calcularOrcamento();
  if (resumo.total <= 0) {
    showToast("Preencha os valores da proposta antes de salvar.", true);
    return;
  }

  const list = getSavedProposals();
  const now = Date.now();
  const existingProposal = editingProposalId ? list.find((item) => item.id === editingProposalId) : null;
  const propostaStatus = normalizeProposalStatus($("propostaStatus").value);
  const propostaStatusObservacao = $("propostaStatusObservacao").value.trim();
  if (propostaStatus === PROPOSAL_STATUS_PERDIDA && !propostaStatusObservacao) {
    showToast("Informe a observação da perda quando o status for Perdida.", true);
    return;
  }
  const propostaAtualizada = {
    titulo: $("propostaTitulo").value.trim() || "Proposta sem título",
    clienteId: $("propostaClienteId").value || "",
    cliente: $("cliente").value.trim() || "Cliente não informado",
    data: formatDate(now),
    timestamp: now,
    total: resumo.total,
    valorM2: resumo.valorM2,
    status: propostaStatus,
    statusObservacao: propostaStatusObservacao,
    ownerId: existingProposal?.ownerId || currentUserId,
    ownerName: existingProposal?.ownerName || currentUser.name,
    ownerEmail: existingProposal?.ownerEmail || currentUser.email,
    filial: existingProposal?.filial || DEFAULT_FILIAL,
    snapshot: proposalFieldsSnapshot()
  };

  const wasEditing = !!editingProposalId;

  if (editingProposalId) {
    const index = list.findIndex((item) => item.id === editingProposalId);
    if (index < 0) {
      showToast("Proposta não encontrada.", true);
      return;
    }

    if (!isAdmin() && list[index].ownerId !== currentUserId) {
      showToast("Você não pode editar propostas de outro usuário.", true);
      return;
    }

    list[index] = {
      ...list[index],
      ...propostaAtualizada
    };
  } else {
    editingProposalId = createUniqueId();
    list.unshift({
      id: editingProposalId,
      ...propostaAtualizada
    });
  }

  if (!saveProposals(list)) return;
  if (wasEditing) editingProposalId = "";
  renderizarTabelaPropostas();
  renderDashboard();
  atualizarTextoBotaoProposta();
  salvarRascunhoLocal();
  showToast("Proposta salva com sucesso.");
}

function carregarPropostaPorId(id) {
  const proposta = getProposalById(id);
  if (!proposta) {
    showToast("Proposta não encontrada.", true);
    return;
  }

  editingProposalId = id;
  applyProposalSnapshot(proposta.snapshot);
  atualizarTextoBotaoProposta();
  salvarRascunhoLocal();
  activateTab("tabProposta");
  showToast("Proposta carregada para edição.");
}

function excluirPropostaPorId(id) {
  const list = getSavedProposals();
  const proposal = list.find((item) => item.id === id);
  if (!proposal) return;

  if (!isAdmin() && proposal.ownerId !== currentUserId) {
    showToast("Você não pode excluir propostas de outro usuário.", true);
    return;
  }

  const updatedList = list.filter((item) => item.id !== id);
  if (!saveProposals(updatedList)) return;
  if (editingProposalId === id) {
    editingProposalId = "";
    atualizarTextoBotaoProposta();
  }
  renderizarTabelaPropostas();
  renderDashboard();
  showToast("Proposta excluída com sucesso.");
}

function gerarMensagemWhatsApp() {
  const resumo = calcularOrcamento();
  if (resumo.total <= 0) {
    showToast("Calcule um orçamento válido antes de enviar no WhatsApp.", true);
    return;
  }

  const profile = getProfileFromForm();
  const mensagem = [
    `*${$("propostaTitulo").value.trim() || "Proposta Comercial"}*`,
    "",
    `Empresa: ${profile.empresa || "-"}`,
    `CNPJ: ${profile.cnpj || "-"}`,
    `Endereço: ${profile.enderecoEmpresa || "-"}`,
    "",
    `Cliente: ${$("cliente").value.trim() || "-"}`,
    `Obra: ${$("obra").value.trim() || "-"}`,
    `Endereço da obra: ${$("endereco").value.trim() || "-"}`,
    `Área: ${$("resArea").textContent}`,
    `Valor total: ${$("resTotal").textContent}`,
    `Preço por m²: ${$("resValorM2").textContent}`,
    `Número da proposta: ${$("propostaNumero").value.trim() || "-"}`,
    `Validade: ${$("propostaValidade").value.trim() || "-"}`,
    `Prazo: ${$("propostaPrazo").value.trim() || "-"}`,
    `Pagamento: ${$("propostaPagamento").value.trim() || "-"}`,
    `A/C: ${$("propostaResponsavel").value.trim() || "-"}`,
    `Observações: ${$("propostaObservacoes").value.trim() || "-"}`,
    "",
    `Vendedor: ${profile.nomeVendedor || currentUser?.name || "-"}`,
    `Contato: ${profile.telefoneVendedor || "-"}`,
    `E-mail: ${profile.emailVendedor || currentUser?.email || "-"}`
  ].join("\n");

  window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, "_blank");
}

async function imprimirSomenteProposta() {
  const proposta = document.querySelector(".proposta-preview");
  if (!proposta) return false;

  // Touch-primary devices (phones, tablets) trigger printing of the parent
  // window when iframe.contentWindow.print() is called, causing the entire
  // page to print. Return false so the CSS @media print fallback is used.
  if (window.matchMedia?.("(pointer: coarse)").matches) {
    return false;
  }

  const iframe = document.createElement("iframe");
  // Position off-screen at A4 usable width so layout is computed correctly for measurement.
  // A4 content width with 8mm side margins: (210 - 16) mm ≈ 734px at 96 dpi.
  iframe.style.position = "fixed";
  iframe.style.left = "-9999px";
  iframe.style.top = "0";
  iframe.style.width = "734px";
  iframe.style.height = `${IFRAME_MEASURE_HEIGHT_PX}px`;
  iframe.style.border = "0";
  iframe.style.visibility = "hidden";
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) {
    iframe.remove();
    return false;
  }

  iframeDoc.open();
  iframeDoc.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Proposta Comercial</title>
  <style>
    @page { size: A4; margin: 8mm; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #0f172a; }
    .proposta-preview { width: 100%; margin: 0; padding: 0; border: 0; border-radius: 0; font-size: 0.69rem; }
    .proposta-cabecalho { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; }
    .proposta-cabecalho-logo { min-height: 80px; min-width: 80px; }
    .logo-proposta { width: 80px; height: 80px; object-fit: contain; border-radius: 999px; }
    .proposta-cabecalho-empresa { margin-left: auto; text-align: right; }
    .proposta-cabecalho-empresa h3 { margin: 0 0 2px; font-size: 1.3rem; color: #166534; }
    .proposta-cabecalho-empresa p { margin: 0; line-height: 1.3; font-size: 0.92rem; }
    .proposta-faixa { height: 3px; margin: 12px 0 10px; background: #166534; }
    .proposta-local-data, .proposta-identificacao, .proposta-dados-cliente, .proposta-secao { margin-bottom: 10px; }
    .proposta-local-data p, .proposta-identificacao p, .proposta-dados-cliente p, .proposta-condicoes p { margin: 0 0 4px; line-height: 1.25; }
    .proposta-identificacao p, .proposta-dados-cliente p:first-child, .proposta-secao h4 { font-weight: 700; }
    .proposta-secao h4 { margin: 0 0 6px; padding: 4px 8px; font-size: 0.85rem; background: #e5e7eb; text-transform: uppercase; text-decoration: underline; }
    .proposta-secao p { margin: 0; line-height: 1.3; }
    .proposal-table-wrap { margin-top: 0; overflow: visible; }
    .proposal-table { width: 100%; border-collapse: collapse; border-radius: 0; }
    .proposal-table th, .proposal-table td { text-align: center; border: 1px solid #9ca3af; padding: 6px 4px; font-size: 0.9rem; }
    .proposal-table th { background: #e5e7eb; color: #111827; }
    .proposal-table td { font-weight: 700; }
    .proposta-assinaturas { margin-top: 10px; padding-top: 12px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
    .assinatura-box { text-align: center; }
    .assinatura-box p, .assinatura-box strong { margin: 3px 0 0; }
    .assinatura-linha { height: 1px; background: #111827; margin-bottom: 8px; }
    .no-print { display: none !important; }
    #secaoEscopo, #secaoServicosInclusos { display: none !important; }
  </style>
</head>
<body>${proposta.outerHTML}</body>
</html>`);
  iframeDoc.close();

  await Promise.all(
    Array.from(iframeDoc.images || []).map((image) => new Promise((resolve) => {
      if (image.complete) {
        resolve();
        return;
      }
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", resolve, { once: true });
    }))
  );

  // Auto-scale: if the rendered content is taller than one A4 page, shrink it to fit.
  // css `zoom` (supported in Chrome/Edge/Safari and Firefox ≥ 126) affects layout, so
  // page-break logic uses the scaled dimensions — unlike `transform: scale()`, which is
  // purely visual and does not prevent the content from flowing onto a second page.
  const contentHeight = iframeDoc.documentElement.scrollHeight;
  if (contentHeight > A4_USABLE_HEIGHT_PX) {
    iframeDoc.documentElement.style.zoom = (A4_USABLE_HEIGHT_PX / contentHeight).toFixed(4);
  }

  // Move iframe to a 0×0 hidden corner before opening the print dialog.
  iframe.style.left = "";
  iframe.style.top = "";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.visibility = "";

  const printWindow = iframe.contentWindow;
  if (!printWindow) {
    iframe.remove();
    return false;
  }

  let iframeRemoved = false;
  let cleanupTimerId = null;
  const removeIframe = () => {
    if (iframeRemoved) return;
    iframeRemoved = true;
    if (cleanupTimerId !== null) {
      window.clearTimeout(cleanupTimerId);
    }
    window.setTimeout(() => {
      iframe.remove();
    }, IFRAME_CLEANUP_DELAY_MS);
  };

  printWindow.addEventListener("afterprint", removeIframe, { once: true });
  printWindow.focus();
  printWindow.print();
  cleanupTimerId = window.setTimeout(removeIframe, IFRAME_PRINT_FALLBACK_TIMEOUT_MS);
  return true;
}

async function salvarPropostaEmPdf() {
  const resumo = calcularOrcamento();
  if (resumo.total <= 0) {
    showToast("Calcule um orçamento válido antes de salvar em PDF.", true);
    return;
  }

  const openedPrintDialog = await imprimirSomenteProposta();
  if (openedPrintDialog) return;

  // Mobile fallback: generate a real PDF file using html2canvas + jsPDF.
  if (window.html2canvas && window.jspdf) {
    await gerarPdfMobile();
    return;
  }

  // Final fallback: browser print dialog (CSS @media print hides non-proposal content).
  printProposalPendingCleanup = true;
  document.body.classList.add("print-proposal");
  window.print();
}

/**
 * Renders the proposal preview element into an A4 jsPDF document.
 * Returns the jsPDF instance, or null if rendering failed.
 */
async function renderPropostaParaPdf(elemento) {
  const canvas = await window.html2canvas(elemento, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false
  });

  const { jsPDF } = window.jspdf;
  const imgData = canvas.toDataURL("image/jpeg", 0.92);

  // A4 dimensions and margins in mm.
  const marginMm = 8;
  const pageW = 210;
  const pageH = 297;
  const contentW = pageW - marginMm * 2;
  const contentH = pageH - marginMm * 2;

  // Convert pixels to mm (96 dpi → 0.2646 mm/px); scale:2 doubles pixel dimensions.
  const pxToMm = 0.2646;
  const imgWMm = (canvas.width / 2) * pxToMm;
  const imgHMm = (canvas.height / 2) * pxToMm;

  const ratio = Math.min(contentW / imgWMm, contentH / imgHMm);
  const finalW = imgWMm * ratio;
  const finalH = imgHMm * ratio;

  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  pdf.addImage(imgData, "JPEG", marginMm, marginMm, finalW, finalH);
  return pdf;
}

/**
 * Generates a downloadable PDF on mobile by rendering the proposal preview via
 * html2canvas and encoding it into an A4 page using jsPDF.
 */
async function gerarPdfMobile() {
  const proposta = document.querySelector(".proposta-preview");
  if (!proposta) return;

  const btn = $("btnSalvarPdf");
  if (btn) btn.disabled = true;
  showToast("Gerando PDF…");

  try {
    const pdf = await renderPropostaParaPdf(proposta);
    const titulo = ($("propostaTitulo").value.trim() || "proposta-comercial").replace(/\s+/g, "-");
    pdf.save(`${titulo}.pdf`);
    showToast("PDF gerado com sucesso!");
  } catch (error) {
    console.error("Falha ao gerar PDF:", error);
    showToast("Não foi possível gerar o PDF. Tente novamente.", true);
  } finally {
    if (btn) btn.disabled = false;
  }
}

/**
 * Shares the proposal as a PDF file using the Web Share API when available
 * (Android Chrome, iOS Safari 15+). Falls back to download + WhatsApp link.
 */
async function compartilharPdf() {
  const resumo = calcularOrcamento();
  if (resumo.total <= 0) {
    showToast("Calcule um orçamento válido antes de compartilhar.", true);
    return;
  }

  // If html2canvas/jsPDF are not loaded yet, fall back to WhatsApp text.
  if (!window.html2canvas || !window.jspdf) {
    gerarMensagemWhatsApp();
    return;
  }

  const proposta = document.querySelector(".proposta-preview");
  if (!proposta) return;

  const btn = $("btnCompartilharPdf");
  if (btn) btn.disabled = true;
  showToast("Preparando PDF para compartilhar…");

  try {
    const pdf = await renderPropostaParaPdf(proposta);
    const titulo = ($("propostaTitulo").value.trim() || "proposta-comercial").replace(/\s+/g, "-");
    const fileName = `${titulo}.pdf`;
    const pdfBlob = pdf.output("blob");

    // Try the Web Share API (files) — works on iOS Safari 15+ and Android Chrome.
    if (navigator.share && navigator.canShare) {
      const file = new File([pdfBlob], fileName, { type: "application/pdf" });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: titulo });
        return;
      }
    }

    // Fallback: download the PDF and offer WhatsApp.
    const url = URL.createObjectURL(pdfBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    showToast("PDF salvo. Agora envie o arquivo pelo WhatsApp ou e-mail.");
  } catch (error) {
    console.error("Falha ao compartilhar PDF:", error);
    showToast("Não foi possível compartilhar o PDF. Tente 'Salvar em PDF'.", true);
  } finally {
    if (btn) btn.disabled = false;
  }
}

function limparEstadoImpressao() {
  if (printCleanupRetryTimeoutId !== null) {
    window.clearTimeout(printCleanupRetryTimeoutId);
    printCleanupRetryTimeoutId = null;
  }
  printProposalPendingCleanup = false;
  document.body.classList.remove("print-proposal");
}

function tentarLimparEstadoImpressao() {
  if (!printProposalPendingCleanup) return;
  if (document.visibilityState === "visible") {
    limparEstadoImpressao();
    return;
  }
  if (printCleanupRetryTimeoutId !== null) return;
  printCleanupRetryTimeoutId = window.setTimeout(() => {
    printCleanupRetryTimeoutId = null;
    tentarLimparEstadoImpressao();
  }, PRINT_CLEANUP_RETRY_DELAY_MS);
}

async function trocarMinhaSenha(event) {
  event?.preventDefault();
  if (!refreshCurrentUser()) return;

  const senhaAtual = $("senhaAtual").value;
  const novaSenha = $("novaSenha").value;
  const confirmarNovaSenha = $("confirmarNovaSenha").value;

  if (!senhaAtual || !novaSenha || !confirmarNovaSenha) {
    showToast("Preencha todos os campos de senha.", true);
    return;
  }

  if (novaSenha.length < 6) {
    showToast("A nova senha deve ter pelo menos 6 caracteres.", true);
    return;
  }

  if (novaSenha !== confirmarNovaSenha) {
    showToast("A confirmação da nova senha não confere.", true);
    return;
  }

  const senhaAtualValida = await verifyPassword(currentUser, senhaAtual);
  if (!senhaAtualValida) {
    showToast("A senha atual está incorreta.", true);
    return;
  }

  const users = getUsers();
  const index = users.findIndex((user) => user.id === currentUserId);
  if (index < 0) return;

  users[index] = {
    ...users[index],
    ...(await createPasswordCredentials(novaSenha)),
    mustChangePassword: false,
    updatedAt: Date.now()
  };

  if (!saveUsers(users)) return;
  refreshCurrentUser();
  resetPasswordForm();
  hideForcedPasswordModal();
  showToast("Senha atualizada com sucesso.");
}

function showForcedPasswordModal() {
  const overlay = $("changePasswordOverlay");
  const forcedNovaSenhaEl = $("forcedNovaSenha");
  const forcedConfirmarSenhaEl = $("forcedConfirmarSenha");
  if (!overlay || !forcedNovaSenhaEl || !forcedConfirmarSenhaEl) return;
  overlay.hidden = false;
  forcedNovaSenhaEl.value = "";
  forcedConfirmarSenhaEl.value = "";
  forcedNovaSenhaEl.focus();
}

function hideForcedPasswordModal() {
  const overlay = $("changePasswordOverlay");
  if (overlay) overlay.hidden = true;
}

async function handleForcedPasswordChange(event) {
  event.preventDefault();
  if (!refreshCurrentUser()) return;

  const forcedNovaSenhaEl = $("forcedNovaSenha");
  const forcedConfirmarSenhaEl = $("forcedConfirmarSenha");
  if (!forcedNovaSenhaEl || !forcedConfirmarSenhaEl) return;

  const novaSenha = forcedNovaSenhaEl.value;
  const confirmarSenha = forcedConfirmarSenhaEl.value;

  if (!novaSenha || !confirmarSenha) {
    showToast("Preencha os dois campos de senha.", true);
    return;
  }

  if (novaSenha.length < 6) {
    showToast("A nova senha deve ter pelo menos 6 caracteres.", true);
    return;
  }

  if (novaSenha !== confirmarSenha) {
    showToast("A confirmação da nova senha não confere.", true);
    return;
  }

  const users = getUsers();
  const index = users.findIndex((user) => user.id === currentUserId);
  if (index < 0) return;

  const btn = $("btnSalvarSenhaForced");
  if (btn) btn.disabled = true;
  try {
    users[index] = {
      ...users[index],
      ...(await createPasswordCredentials(novaSenha)),
      mustChangePassword: false,
      updatedAt: Date.now()
    };

    if (!saveUsers(users)) return;
    refreshCurrentUser();
    updateSessionInfo();
    hideForcedPasswordModal();
    showToast("Senha definida com sucesso. Bem-vindo!");
  } finally {
    if (btn) btn.disabled = false;
  }
}

async function handleLogin(event) {
  if (OPEN_ACCESS_MODE) {
    event?.preventDefault();
    return;
  }
  event.preventDefault();

  const loginEmailEl = $("loginEmail");
  const loginSenhaEl = $("loginSenha");
  if (!loginEmailEl || !loginSenhaEl) return;

  const email = normalizeEmail(loginEmailEl.value);
  const password = loginSenhaEl.value;

  if (!email || !password) {
    showToast("Informe usuário e senha para entrar.", true);
    return;
  }

  const recoveredAdminUser = await ensureDefaultAdminAccess(email, password);
  const user = recoveredAdminUser || getUsers().find((item) => item.email === email);
  if (!user) {
    showToast("Usuário não encontrado.", true);
    return;
  }

  if (!user.active) {
    showToast("Este usuário está inativo. Procure o administrador.", true);
    return;
  }

  const passwordMatches = await verifyPassword(user, password);
  if (!passwordMatches) {
    showToast("Senha inválida.", true);
    return;
  }

  if (!user.passwordSalt) {
    const users = getUsers();
    const index = users.findIndex((item) => item.id === user.id);
    if (index >= 0) {
      users[index] = {
        ...users[index],
        ...(await createPasswordCredentials(password)),
        updatedAt: Date.now()
      };
      saveUsers(users);
      user.passwordHash = users[index].passwordHash;
      user.passwordSalt = users[index].passwordSalt;
      user.passwordIterations = users[index].passwordIterations;
    }
  }

  saveSession(user.id);
  currentUserId = user.id;
  currentUser = mergeUserProfile(user);
  editingProposalId = "";
  logoDataUrl = currentUser.profile.logoDataUrl || "";
  await atualizarInterfaceAutenticada();
  if (!OPEN_ACCESS_MODE && currentUser.mustChangePassword) {
    showForcedPasswordModal();
    return;
  }
  showToast("Login realizado com sucesso.");
}

async function handleLogout({ silent = false } = {}) {
  if (OPEN_ACCESS_MODE) {
    clearSession();
    hideForcedPasswordModal();
    currentUser = null;
    currentUserId = "";
    editingProposalId = "";
    logoDataUrl = "";
    updateAppVisibility();
    await restoreSession();
    if (!silent) showToast("Sessão reiniciada em modo de acesso livre.");
    return;
  }
  stopPendingSyncCheck();
  clearSession();
  clearFirestoreListeners();
  hideForcedPasswordModal();
  currentUser = null;
  currentUserId = "";
  editingProposalId = "";
  logoDataUrl = "";
  updateAppVisibility();
  const loginSenhaEl = $("loginSenha");
  if (loginSenhaEl) loginSenhaEl.value = "";
  if (!silent) {
    showToast("Sessão encerrada.");
  }
}

async function atualizarInterfaceAutenticada() {
  refreshCurrentUser();
  updateAppVisibility();
  updateSessionInfo();
  updateTabVisibility();
  loadCurrentUserProfile();
  resetUserForm();
  resetClientForm();
  renderClientsTable();
  populateProposalClientSelect();
  renderUsersTable();
  renderizarTabelaPropostas();
  renderDashboard();
  atualizarTextoBotaoProposta();
  limparFormularioBancoDadosEstimativas();
  atualizarModoFuncionarios({ preserveManualValue: false });
  atualizarCampoEquipamentosAlugados({ preserveValuesWhenHidden: true, syncFromSnapshot: true });
  await carregarRascunhoLocal();
  atualizarCampoPisoTela({ preserveValueWhenDisabled: true });
  atualizarCampoCuraQuimica({ preserveValueWhenDisabled: true });
  atualizarCampoStatusProposta({ preserveValueWhenHidden: true });
  if (!$("propostaTextoPadrao").value.trim()) {
    $("propostaTextoPadrao").value = DEFAULT_STANDARD_TEXT;
  }
  calcularOrcamento();
}

async function restoreSession() {
  if (OPEN_ACCESS_MODE) {
    const openAccessUser = await ensureOpenAccessUser();
    if (!openAccessUser) {
      updateAppVisibility();
      return;
    }
    currentUserId = openAccessUser.id;
    currentUser = mergeUserProfile(openAccessUser);
    saveSession(openAccessUser.id);
    await atualizarInterfaceAutenticada();
    hideForcedPasswordModal();
    return;
  }

  const session = getSession();
  if (!session?.userId) {
    updateAppVisibility();
    return;
  }

  const user = getUsers().find((item) => item.id === session.userId && item.active);
  if (!user) {
    clearSession();
    updateAppVisibility();
    return;
  }

  currentUserId = user.id;
  currentUser = mergeUserProfile(user);
  await atualizarInterfaceAutenticada();
  if (currentUser?.mustChangePassword) {
    showForcedPasswordModal();
  }
}

function bindStaticEvents() {
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", () => {
      if (!button.hidden) activateTab(button.dataset.tab);
    });
  });

  const loginForm = $("loginForm");
  if (loginForm) loginForm.addEventListener("submit", handleLogin);
  $("profileForm").addEventListener("submit", (event) => {
    event.preventDefault();
    salvarPerfil();
  });
  const passwordForm = $("passwordForm");
  if (passwordForm) passwordForm.addEventListener("submit", trocarMinhaSenha);
  const forcedPasswordForm = $("forcedPasswordForm");
  if (forcedPasswordForm) forcedPasswordForm.addEventListener("submit", handleForcedPasswordChange);
  $("userForm").addEventListener("submit", salvarUsuario);
  $("clientForm").addEventListener("submit", salvarCliente);
  $("machineDbForm").addEventListener("submit", salvarBancoDadosEstimativas);
  const btnLogout = $("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      void handleLogout();
    });
  }
  $("btnLimparPerfil").addEventListener("click", limparPerfil);
  $("btnLimparUsuario").addEventListener("click", resetUserForm);
  $("btnLimparCliente").addEventListener("click", resetClientForm);
  $("btnIrParaClientes").addEventListener("click", () => activateTab("tabClientes"));
  $("btnRestaurarBancoDados").addEventListener("click", restaurarBancoDadosEstimativas);
  $("btnCalcular").addEventListener("click", () => {
    calcularOrcamento();
    salvarRascunhoLocal();
    showToast("Orçamento atualizado.");
  });
  $("btnLimpar").addEventListener("click", limparCampos);
  $("btnBuscarCep").addEventListener("click", async () => {
    await preencherEnderecosPorCep();
    calcularOrcamento();
    salvarRascunhoLocal();
  });
  $("btnSalvarProposta").addEventListener("click", salvarProposta);
  $("btnSalvarPdf").addEventListener("click", salvarPropostaEmPdf);
  $("btnCompartilharPdf").addEventListener("click", compartilharPdf);
  $("btnWhatsApp").addEventListener("click", gerarMensagemWhatsApp);
  $("btnNovaProposta").addEventListener("click", () => {
    limparCampos();
    activateTab("tabProposta");
  });
  $("btnExportarTabelas").addEventListener("click", exportarTabelas);
  $("btnImportarTabelas").addEventListener("click", abrirImportacaoTabelas);
  $("inputImportarTabelas").addEventListener("change", importarTabelas);
  $("filtroTabelaPropostas").addEventListener("input", renderizarTabelaPropostas);
  $("filtroTabelaUsuarios").addEventListener("input", renderUsersTable);
  $("filtroTabelaClientes").addEventListener("input", renderClientsTable);
  $("filtroTabelaDashboard").addEventListener("input", renderDashboard);

  $("documento").addEventListener("input", (event) => {
    event.target.value = formatarDocumento(event.target.value);
  });

  $("telefone").addEventListener("input", (event) => {
    event.target.value = formatarTelefone(event.target.value);
  });

  $("clientDocumento").addEventListener("input", (event) => {
    event.target.value = formatarDocumento(event.target.value);
  });

  $("clientTelefone").addEventListener("input", (event) => {
    event.target.value = formatarTelefone(event.target.value);
  });

  $("clientCep").addEventListener("input", (event) => {
    event.target.value = formatarCep(event.target.value);
  });

  $("clientCep").addEventListener("blur", async () => {
    await preencherEnderecoPorCepInput({
      cepFieldId: "clientCep",
      enderecoFieldId: "clientEndereco",
      labelErro: "o cliente"
    });
  });

  $("btnBuscarCepCliente").addEventListener("click", async () => {
    await preencherEnderecoPorCepInput({
      cepFieldId: "clientCep",
      enderecoFieldId: "clientEndereco",
      labelErro: "o cliente",
      alertOnError: false
    });
  });

  $("perfilTelefoneVendedor").addEventListener("input", (event) => {
    event.target.value = formatarTelefone(event.target.value);
    atualizarPreviaPerfil();
  });

  $("perfilCnpj").addEventListener("input", (event) => {
    event.target.value = formatarDocumento(event.target.value);
    atualizarPreviaPerfil();
  });

  $("cep").addEventListener("input", (event) => {
    event.target.value = formatarCep(event.target.value);
  });

  $("cep").addEventListener("blur", async () => {
    await preencherEnderecoPorCepInput({
      cepFieldId: "cep",
      enderecoFieldId: "endereco",
      labelErro: "a obra"
    });
    salvarRascunhoLocal();
  });

  $("metragem").addEventListener("input", () => {
    atualizarModoFuncionarios();
    calcularOrcamento();
    salvarRascunhoLocal();
  });

  $("modoFuncionarios").addEventListener("change", () => {
    atualizarModoFuncionarios({ preserveManualValue: false });
    calcularOrcamento();
    salvarRascunhoLocal();
  });

  $("pisoTela").addEventListener("change", () => {
    atualizarCampoPisoTela({ preserveValueWhenDisabled: false });
    calcularOrcamento();
    salvarRascunhoLocal();
  });

  $("curaQuimica").addEventListener("change", () => {
    atualizarCampoCuraQuimica({ preserveValueWhenDisabled: false });
    calcularOrcamento();
    salvarRascunhoLocal();
  });

  $("equipamentosTipo").addEventListener("change", () => {
    atualizarCampoEquipamentosAlugados({ preserveValuesWhenHidden: true, syncFromSnapshot: true });
    calcularOrcamento();
    salvarRascunhoLocal();
  });

  $("propostaStatus").addEventListener("change", () => {
    atualizarCampoStatusProposta({ preserveValueWhenHidden: false });
    calcularOrcamento();
    salvarRascunhoLocal();
  });

  $("propostaClienteId").addEventListener("change", () => {
    const client = getClientById($("propostaClienteId").value);
    if (!client) {
      clearProposalClientFields();
      calcularOrcamento();
      salvarRascunhoLocal();
      return;
    }
    applyClientToProposal(client);
    calcularOrcamento();
    salvarRascunhoLocal();
  });

  $("impostoPercentual").addEventListener("change", () => {
    calcularOrcamento();
    salvarRascunhoLocal();
  });

  $("btnAdicionarEquipamentoAlugado").addEventListener("click", () => {
    const list = $("equipamentosAlugadosList");
    const row = createEquipamentoAlugadoItem();
    list.appendChild(row);
    row.querySelector(".equipamento-alugado-tipo")?.focus();
    calcularOrcamento();
    salvarRascunhoLocal();
  });

  $("equipamentosAlugadosList").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action='excluir-equipamento']");
    if (!button) return;
    const row = button.closest(".equipamento-item");
    if (!row) return;
    row.remove();
    calcularOrcamento();
    salvarRascunhoLocal();
  });

  ["input", "change"].forEach((eventName) => {
    $("equipamentosAlugadosList").addEventListener(eventName, () => {
      calcularOrcamento();
      salvarRascunhoLocal();
    });
  });

  $("funcionarios").addEventListener("input", () => {
    if (getModoFuncionarios() === WORKER_MODE_MANUAL) {
      calcularOrcamento();
      salvarRascunhoLocal();
    }
  });

  $("usuarioTipo").addEventListener("change", atualizarCampoAtivoUsuarioPorTipo);

  [
    "cliente",
    "documento",
    "email",
    "telefone",
    "obra",
    "cep",
    "endereco",
    "distancia",
    "consumo",
    "precoCombustivel",
    "pedagio",
    "quantidadeVeiculos",
    "viagens",
    "consumoCaminhao",
    "pedagioCaminhao",
    "viagensCaminhao",
    "quantidadeCaminhoes",
    "gastoLogisticoPessoal",
    "gastoLogisticoMaquinario",
    "paramRendimentoFacas",
    "paramFacasPorJogo",
    "paramPrecoFaca",
    "paramRendimentoDisco",
    "paramDiscosPorJogo",
    "paramPrecoDisco",
    "paramConsumoMaquinaDupla",
    "paramConsumoMaquinaSimples",
    "paramConsumoMaquinaCorte",
    "valorDia",
    "dias",
    "diasPreparacao",
    "funcionariosPreparacao",
    "diasConcretagem",
    "funcionariosConcretagem",
    "diasAcabamento",
    "funcionariosAcabamento",
    "quantidadeDiaristas",
    "valorDiarista",
    "quantidadeHorasExtras",
    "valorHoraExtra",
    "encargos",
    "alimentacaoFuncionario",
    "hotelFuncionario",
    "terraplanagemTotal",
    "valorTelaM2",
    "valorCuraM2",
    "tipoContratacao",
    "preparoLajeMaoObraM2",
    "preparoLajeMaterialM2",
    "pisoIntertravadoMaoObraM2",
    "pisoIntertravadoMaterialM2",
    "concretoM2",
    "fibraM2",
    "agregadoMineralM2",
    "endurecedorM2",
    "juntaPuM2",
    "labioPolimericoM2",
    "pinturaEpoxiM2",
    "servicoAdicionalValor",
    "servicoAdicionalDescricao",
    "equipamentosAlugadosObservacao",
    "locacaoManualValor",
    "locacaoManualDescricao",
    "outrosCustos",
    "lucro",
    "impostoPercentual",
    "propostaTitulo",
    "propostaNumero",
    "propostaValidade",
    "propostaCidade",
    "propostaPagamento",
    "propostaPrazo",
    "propostaResponsavel",
    "propostaStatusObservacao",
    "propostaTextoPadrao",
    "propostaObservacoes"
  ].forEach((id) => {
    $(id).addEventListener("input", () => {
      calcularOrcamento();
      salvarRascunhoLocal();
    });
  });

  ["perfilNomeVendedor", "perfilEmailVendedor", "perfilEmpresa", "perfilEndereco"].forEach((id) => {
    $(id).addEventListener("input", atualizarPreviaPerfil);
  });

  $("perfilLogo").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      logoDataUrl = "";
      atualizarPreviaPerfil();
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      logoDataUrl = typeof reader.result === "string" ? reader.result : "";
      atualizarPreviaPerfil();
    };
    reader.readAsDataURL(file);
  });

  $("tabelaPropostasBody").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const { action, id } = button.dataset;
    if (!id) return;

    if (action === "editar-proposta") carregarPropostaPorId(id);
    if (action === "excluir-proposta") excluirPropostaPorId(id);
  });

  $("tabelaUsuariosBody").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const { action, id } = button.dataset;
    if (!id) return;

    if (action === "editar-usuario") carregarUsuarioPorId(id);
    if (action === "alternar-usuario") alternarStatusUsuario(id);
    if (action === "excluir-usuario") excluirUsuarioPorId(id);
  });

  $("tabelaClientesBody").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const { action, id } = button.dataset;
    if (!id) return;

    if (action === "editar-cliente") carregarClientePorId(id);
    if (action === "excluir-cliente") excluirClientePorId(id);
  });

  window.addEventListener("afterprint", () => {
    limparEstadoImpressao();
  });
  window.addEventListener("focus", () => {
    tentarLimparEstadoImpressao();
  });
  document.addEventListener("visibilitychange", () => {
    tentarLimparEstadoImpressao();
  });
}

function registrarServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker
    .register("/sw.js")
    .catch((error) => console.warn("Service Worker: falha ao registrar:", error));
}

async function init() {
  try {
    bindStaticEvents();
    applyOpenAccessModeUI();
    firebaseSyncEnabled = false;
    firestoreDb = null;
    clearFirestoreListeners();
    stopPendingSyncCheck();
    pendingSyncQueue.clear();
    removeLegacyStorageItem(PENDING_SYNC_STORAGE_KEY);
    updateFirebaseStatus(FIREBASE_STATUS_LOCAL);
    await ensureAdminExists();
    limparFormularioBancoDadosEstimativas();
    updateAppVisibility();
    await restoreSession();
    atualizarTextoBotaoProposta();
    atualizarModoFuncionarios({ preserveManualValue: false });
    atualizarCampoPisoTela({ preserveValueWhenDisabled: false });
    atualizarCampoCuraQuimica({ preserveValueWhenDisabled: false });
    atualizarCampoEquipamentosAlugados({ preserveValuesWhenHidden: true, syncFromSnapshot: true });
    atualizarCampoStatusProposta({ preserveValueWhenHidden: false });
    if (!$("propostaTextoPadrao").value.trim()) {
      $("propostaTextoPadrao").value = DEFAULT_STANDARD_TEXT;
    }
    calcularOrcamento();
    registrarServiceWorker();
  } catch (error) {
    console.error("Falha ao iniciar o sistema:", error);
    updateFirebaseStatus(FIREBASE_STATUS_LOCAL);
    updateAppVisibility();
    showToast("Falha ao iniciar alguns recursos. Tente recarregar a página.", true);
  }
}

init();
