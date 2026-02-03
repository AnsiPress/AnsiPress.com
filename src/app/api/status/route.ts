export async function GET() {
  try {
    const [configRes, heartbeatRes] = await Promise.all([
      fetch("https://status.ansipress.com/api/status-page/ansipress", { next: { revalidate: 30 } }),
      fetch("https://status.ansipress.com/api/status-page/heartbeat/ansipress", { next: { revalidate: 30 } })
    ])

    if (!configRes.ok || !heartbeatRes.ok) {
      throw new Error(`Failed to fetch status: ${configRes.statusText} / ${heartbeatRes.statusText}`)
    }

    const configData = await configRes.json()
    const heartbeatData = await heartbeatRes.json()

    // Merge heartbeat data into config data
    const data = {
      ...configData,
      heartbeatList: heartbeatData.heartbeatList || {},
      uptimeList: heartbeatData.uptimeList || {}
    }

    return Response.json(data)
  } catch (error) {
    console.error("Status API Error:", error)
    return Response.json(
      { error: "Failed to fetch service status" },
      { status: 500 }
    )
  }
}
