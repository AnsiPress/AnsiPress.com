"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const techStack = {
  "Web Server": ["NGINX (Latest)", "HTTP/2 & HTTP/3", "Brotli Compression"],
  "Application": ["PHP 8.5, 8.4, 8.3, 8.2", "PHP-FPM", "OPcache Enabled"],
  "Database": ["MariaDB 11.08 LTS", "Optimized Configuration", "Automated Backups"],
  "Caching": ["Redis 8.x", "Object Caching", "Page Caching"],
  "Storage": ["ZFS Native", "Snapshots & Cloning", "Compression (LZ4)"],
  "Security": ["Firewall", "SSH Hardening", "Automated SSL/TLS (Let's Encrypt)"],
  "Backup": ["AnsiSnap", "Incremental & Full Backups", "S3 Storage", "Automated Scheduling"],
  "Tools": ["WP-CLI", "Composer", "Git", "Ansible"],
};

const infrastructure = [
  { label: "Deployment", value: "Ansible Automation" },
  { label: "Orchestration", value: "Serial (32 servers)" },
  { label: "File System", value: "ZFS on Linux" },
  { label: "Backup Storage", value: "Amazon S3 Compatible" },
  { label: "SSL Provider", value: "acme.sh (Let's Encrypt)" },
  { label: "Monitoring", value: "Built-in Health Checks" },
];

export function TechSpecsSection() {
  return (
    <section id="specs" className="py-24 bg-zinc-900/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-heading font-bold mb-4"
          >
            Built on <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Modern Technology</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-zinc-400"
          >
            Enterprise-grade stack with the latest versions, optimized for
            performance and security.
          </motion.p>
        </div>

        {/* Tech Stack Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {Object.entries(techStack).map(([category, items], index) => (
            <Card key={index} className="group hover:shadow-lg transition-all border-white/10 bg-white/5">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4 text-purple-400">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-sm text-zinc-400 flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Infrastructure Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="glass border-white/10 bg-black/40">
            <CardContent className="p-8">
              <h3 className="font-heading font-semibold text-2xl mb-6">
                Infrastructure Automation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {infrastructure.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="text-sm text-zinc-500">
                      {item.label}
                    </div>
                    <div className="font-medium text-lg">{item.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Supported Site Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <h3 className="font-heading font-semibold text-xl mb-4">
            Supported Site Types
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["HTML Static", "PHP", "MySQL", "WordPress", "WP Multisite (Subdirectory)", "WP Multisite (Subdomain)"].map(
              (type, index) => (
                <Badge key={index} variant="secondary" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border-none">
                  {type}
                </Badge>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
