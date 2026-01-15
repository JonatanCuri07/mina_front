import { apiGet, apiPost} from "./http";

function normalizeUpper(str = "") {
  return String(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();
}

function parsePlacaCircula(estadoRaw) {
  const e = normalizeUpper(estadoRaw);

  if (!e) return { value: null, label: "SIN ESTADO" };

  if (e.includes("FUERA")) return { value: false, label: "DESAPROBADA (NO CIRCULA)" };
  if (e.includes("CIRCUL")) return { value: true, label: "APROBADA (CIRCULA)" };

  return { value: null, label: `ESTADO: ${estadoRaw}` };
}

function parseLicenciaVigente(estadoLicRaw) {
  const e = normalizeUpper(estadoLicRaw);

  if (!e) return { value: null, label: "SIN ESTADO" };

  if (e.includes("VIGENTE")) return { value: true, label: "VIGENTE" };

  if (
    e.includes("VENC") ||
    e.includes("SUSP") ||
    e.includes("CANCEL") ||
    e.includes("INHAB") ||
    e.includes("RETEN") ||
    e.includes("NO VIGENTE")
  ) {
    return { value: false, label: "NO VIGENTE" };
  }

  return { value: null, label: `ESTADO: ${estadoLicRaw}` };
}

export async function validatePlateAndLicense(placa, licencia) {
  const placaClean = (placa || "").trim();
  const licenciaClean = (licencia || "").trim();

  const [sunarpRes, scpppRes] = await Promise.allSettled([
    apiPost("/api/sunarp/consultar", { placa: placaClean }, { timeoutMs: 0 }),
    apiPost("/api/scppp/consultar", { valor: licenciaClean, tipo: "1" }),
  ]);

  // SUNARP
  let placaEstadoRaw = "";
  let placaParsed = { value: null, label: "SIN RESULTADO" };
  let placaError = null;

  if (sunarpRes.status === "fulfilled") {
    const payload = sunarpRes.value;
    placaEstadoRaw = payload?.datos_vehiculo_estructurado?.ESTADO || "";
    placaParsed = parsePlacaCircula(placaEstadoRaw);
  } else {
    placaError = sunarpRes.reason?.message || "Error consultando SUNARP";
  }

  // SCPPP
  let licenciaEstadoRaw = "";
  let licenciaParsed = { value: null, label: "SIN RESULTADO" };
  let licenciaError = null;

  if (scpppRes.status === "fulfilled") {
    const payload = scpppRes.value;
    licenciaEstadoRaw = payload?.datos?.datos_personales?.estado_licencia || "";
    licenciaParsed = parseLicenciaVigente(licenciaEstadoRaw);
  } else {
    licenciaError = scpppRes.reason?.message || "Error consultando SCPPP";
  }

  return {
    placa: {
      circula: placaParsed.value === true,
      label:
        placaError
          ? `ERROR: ${placaError}`
          : placaParsed.label,
      rawEstado: placaEstadoRaw,
      error: placaError,
    },
    licencia: {
      vigente: licenciaParsed.value === true,
      label:
        licenciaError
          ? `ERROR: ${licenciaError}`
          : licenciaParsed.label,
      rawEstado: licenciaEstadoRaw,
      error: licenciaError,
    },
  };
}

export async function getDashboardSummary() {
  const [sunarp, scppp] = await Promise.all([
    apiGet("/api/sunarp/estadisticas"),
    apiGet("/api/scppp/estadisticas"),
  ]);

  const porEstadoPlaca = sunarp?.estadisticas?.por_estado || [];
  const porEstadoLic = scppp?.estadisticas?.por_estado_licencia || [];

  const totalPlacas = porEstadoPlaca.reduce((acc, it) => acc + Number(it.cantidad || 0), 0);
  const placasAprobadas = porEstadoPlaca
    .filter((it) => normalizeUpper(it.estado).includes("CIRCUL") && !normalizeUpper(it.estado).includes("FUERA"))
    .reduce((acc, it) => acc + Number(it.cantidad || 0), 0);
  const placasDesaprobadas = Math.max(0, totalPlacas - placasAprobadas);

  const totalLic = porEstadoLic.reduce((acc, it) => acc + Number(it.cantidad || 0), 0);
  const licVigentes = porEstadoLic
    .filter((it) => normalizeUpper(it.estado_licencia).includes("VIGENTE"))
    .reduce((acc, it) => acc + Number(it.cantidad || 0), 0);
  const licNoVigentes = Math.max(0, totalLic - licVigentes);

  return {
    placas: { aprobadas: placasAprobadas, desaprobadas: placasDesaprobadas },
    licencias: { vigentes: licVigentes, noVigentes: licNoVigentes },
  };
}
