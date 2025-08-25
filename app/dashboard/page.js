// app/dashboard/page.js
export default function DashboardHome() {
  return (
    <div className="rounded-3xl bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/20 p-10 mt-8 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
        Welcome to your Dashboard
      </h1>
      <p className="text-lg text-slate-300 text-center">
        Manage your products, add new items, and view analytics here.
      </p>
    </div>
  );
}