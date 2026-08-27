import { AdminGallery } from '@/components/admin-gallery'

export default function AdminGalleryPage() {
  return (
    <main className="min-h-screen bg-[#f6f8f7] px-5 py-8 text-[#10251b] lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        <a href="/admin" className="mb-6 inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">← Back to Admin</a>
        <AdminGallery />
      </div>
    </main>
  )
}
