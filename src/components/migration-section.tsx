export function MigrationSection() {
  return (
    <section className="py-24 border-t border-white/10">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Moving Hosts is a Pain. <br />We'll Do It For You.
            </h2>
            <p className="text-zinc-400">
              Tell us about your current setup. We'll send you a custom migration plan—free, no obligations.
            </p>
          </div>

          <div className="space-y-6 p-8 rounded-2xl border border-white/10 bg-white/5 opacity-60 cursor-not-allowed">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Your Website URL</label>
                <input
                  type="url"
                  placeholder="https://yoursite.com"
                  disabled
                  className="w-full h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-zinc-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  disabled
                  className="w-full h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-zinc-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Current Host (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Kinsta, WP Engine"
                  disabled
                  className="w-full h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-zinc-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Monthly Traffic</label>
                <select
                  disabled
                  className="w-full h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white"
                >
                  <option>Select range</option>
                </select>
              </div>
            </div>

            <button
              disabled
              className="w-full h-12 rounded-lg bg-white text-black font-medium"
            >
              Get Free Migration Plan
            </button>

            <p className="text-zinc-500 text-sm text-center">Form will be functional in Phase 2</p>
          </div>
        </div>
      </div>
    </section>
  );
}
