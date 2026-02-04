"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function StatusBadge() {
  const [status, setStatus] = useState("Checking status...")
  const [color, setColor] = useState("bg-gray-400")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/status")
        if (!res.ok) throw new Error()
        
        const data = await res.json()
        setIsLoading(false)

        const incident = data?.incident
        const maintenanceList = data?.maintenanceList || []
        const heartbeatList = data?.heartbeatList || {}
        const publicGroupList = data?.publicGroupList || []

        // Create a map of monitor ID -> Name
        const monitorMap: Record<string, string> = {}
        publicGroupList.forEach((group: any) => {
          group.monitorList?.forEach((m: any) => {
            monitorMap[m.id] = m.name
          })
        })

        // 1. Prioritize Incidents (Critical - Red)
        if (incident) {
          setStatus(`${incident.title}`)
          setColor("bg-red-500")
          return
        }

        // 2. Check for Monitor Heartbeats (Partial/Major Issues)
        const monitorIds = Object.keys(heartbeatList)
        const downMonitors = monitorIds.filter(id => {
          const heartbeats = heartbeatList[id]
          if (!heartbeats || heartbeats.length === 0) return false
          return heartbeats[heartbeats.length - 1].status === 0
        })

        if (downMonitors.length > 0) {
          // If EVERYTHING is down, it's a Major Outage
          if (downMonitors.length === monitorIds.length && monitorIds.length > 0) {
            setStatus("Major Outage")
            setColor("bg-red-500")
          } else {
            // Partial issue
            if (downMonitors.length === 1) {
              const name = monitorMap[downMonitors[0]] || "Service"
              setStatus(`${name} is down`)
            } else {
              setStatus(`${downMonitors.length} Services are down`)
            }
            setColor("bg-yellow-500")
          }
          return
        }

        // 3. Check for Active Maintenances (Warning - Yellow)
        if (maintenanceList.length > 0) {
          const active = maintenanceList[0]
          setStatus(`Maintenance: ${active.title || "Scheduled Work"}`)
          setColor("bg-yellow-500")
          return
        }

        // 4. All Systems Operational (Success - Green)
        setStatus("All Systems Operational")
        setColor("bg-green-500")
      } catch {
        setIsLoading(false)
        setStatus("Status Unavailable")
        setColor("bg-gray-400")
      }
    }

    fetchStatus()

    const interval = setInterval(fetchStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Link 
      href="https://status.ansipress.com/?utm_source=ansipress.com&utm_medium=domain&utm_campaign=live_status" 
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-purple-300 transition-colors hover:bg-white/10 hover:border-white/20"
    >
      <span className="relative flex h-2 w-2">
        {!isLoading && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`} />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${color} ${isLoading ? 'animate-pulse' : ''}`} />
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={status}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          {status}
        </motion.span>
      </AnimatePresence>
    </Link>
  )
}
