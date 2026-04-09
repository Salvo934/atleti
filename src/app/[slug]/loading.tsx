/** Shell leggera durante la navigazione / generazione della pagina atleta. */
export default function AthleteLoading() {
  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="h-14 max-w-md animate-pulse rounded-full bg-white/[0.06]" />
        <div className="mt-10 h-[min(70vh,32rem)] w-full animate-pulse rounded-3xl bg-white/[0.04]" />
      </div>
    </div>
  );
}
