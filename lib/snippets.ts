// Code shown on the landing page. The REST snippets mirror the docs
// quickstart (real, shipping today); the React snippet is the frontend SDK
// spec and is always presented with an "in development" label. Guardrails:
// plans/xorgate-landing-page/content.md.

export const provisionSnippet = `# Mint a claim code (console or API)
curl -sS -X POST "$API/device-registrations" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-Organization-Id: $ORG" \\
  -H "X-Workspace-Id: $WS"

# On the device: claim, install, come online
curl -s "$API/get/K7QF4M2P" -o install.sh
sudo bash install.sh`

export const telemetrySnippet = `curl -sS "$API/devices/$DEVICE/telemetry/latest" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-Organization-Id: $ORG"

{
  "latest": [
    { "metric": "gps.lat",         "value": 45.4215, "unit": "deg"  },
    { "metric": "gps.speed",       "value": 12.4,    "unit": "km/h" },
    { "metric": "system.cpu_temp", "value": 51.2,    "unit": "C"    }
  ]
}`

export const reactSnippet = `import { useLiveTelemetry } from "@xorgate/react"

function Speed({ deviceId }: { deviceId: string }) {
  const { latest, status } = useLiveTelemetry(deviceId)
  if (status !== "connected") return <p>Connecting…</p>
  const speed = latest["gps.speed"]
  return <p>{speed ? \`\${speed.value} \${speed.unit}\` : "no fix"}</p>
}`
