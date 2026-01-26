import { db } from "@/lib/db";
import { enterpriseContacts } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminContactsPage() {
  const contacts = await db
    .select()
    .from(enterpriseContacts)
    .orderBy(desc(enterpriseContacts.createdAt));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Enterprise Contacts</h1>
        <p className="text-zinc-400 mt-2">Recent inquiries from the contact form.</p>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 text-zinc-400">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Website</th>
              <th className="p-3 text-left">Use Case</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">UTM</th>
              <th className="p-3 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-white">
            {contacts.map((c) => (
              <tr key={c.id}>
                <td className="p-3">{c.name}</td>
                <td className="p-3"><a href={`mailto:${c.email}`} className="text-purple-400 hover:text-purple-300">{c.email}</a></td>
                <td className="p-3">{c.company || "—"}</td>
                <td className="p-3">{c.website ? (<a href={c.website} className="text-purple-400 hover:text-purple-300" target="_blank" rel="noreferrer">{c.website}</a>) : "—"}</td>
                <td className="p-3">{c.useCase || "—"}</td>
                <td className="p-3 max-w-lg whitespace-pre-wrap">{c.message}</td>
                <td className="p-3 text-zinc-400">
                  {[
                    c.utmSource && `src:${c.utmSource}`,
                    c.utmMedium && `med:${c.utmMedium}`,
                    c.utmCampaign && `cmp:${c.utmCampaign}`,
                    c.referralSource && `ref:${c.referralSource}`,
                  ].filter(Boolean).join(" · ") || "—"}
                </td>
                <td className="p-3 text-right text-zinc-400">{new Date(c.createdAt!).toLocaleString()}</td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td className="p-3 text-center text-zinc-400" colSpan={8}>No contacts yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
