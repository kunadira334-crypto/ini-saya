import React, { useState, useEffect } from 'react';
import { 
  School, 
  UserCheck, 
  Save, 
  RotateCcw, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Award, 
  HeartHandshake, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  FileText,
  AlertCircle,
  HelpCircle,
  Eye
} from 'lucide-react';
import { MadrasahProfile } from '../types';
import { defaultMadrasahProfile } from '../data/mockData';

interface DataSekolahViewProps {
  profile: MadrasahProfile;
  onSaveProfile: (profile: MadrasahProfile) => Promise<void>;
  onNavigateToJadwal?: () => void;
}

export const DataSekolahView: React.FC<DataSekolahViewProps> = ({
  profile,
  onSaveProfile,
  onNavigateToJadwal
}) => {
  // Form State initialized with current profile
  const [formData, setFormData] = useState<MadrasahProfile>({ ...profile });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  // Keep form in sync when profile prop changes
  useEffect(() => {
    setFormData({ ...profile });
  }, [profile]);

  const handleChange = (field: keyof MadrasahProfile, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSaveProfile(formData);
      setShowSavedAlert(true);
      setTimeout(() => setShowSavedAlert(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Kembalikan data sekolah ke pengaturan standar MI MAMBAUL ULUM?')) {
      setFormData({ ...defaultMadrasahProfile });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-700/20">
            <School className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Data Sekolah & Kepala Madrasah
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                {formData.nama}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Atur identitas resmi madrasah, alamat, serta ganti nama Kepala Madrasah sebagai penandatangan supervisi.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === 'form' ? 'preview' : 'form')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <Eye className="w-4 h-4 text-emerald-600" />
            <span>{activeTab === 'form' ? 'Pratinjau KOP & TTD' : 'Kembali ke Formulir'}</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-md shadow-emerald-700/20 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {showSavedAlert && (
        <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-4 flex items-center gap-3 text-emerald-900 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div className="text-xs">
            <span className="font-bold">Data Sekolah Berhasil Diperbarui!</span> Nama madrasah{' '}
            <strong>"{formData.nama}"</strong> dan Kepala Madrasah <strong>"{formData.kepalaMadrasah}"</strong> telah otomatis diterapkan ke seluruh dokumen, jadwal, dan laporan supervisi.
          </div>
        </div>
      )}

      {/* Content Tabs */}
      {activeTab === 'form' ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 1: KEPALA MADRASAH / SUPERVISOR (BISA DIGANTI BEBAS) */}
          <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200/90 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-0 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      1. Kepala Sekolah / Supervisor (Dapat Diganti Bebas)
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Pejabat yang bertindak sebagai supervisor utama dan penandatangan sah seluruh berkas supervisi.
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200 hidden sm:inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Dapat Diubah Kapan Saja</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nama Kepala Sekolah */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="block text-xs font-bold text-slate-800">
                    Nama Lengkap Kepala Sekolah / Madrasah <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.kepalaMadrasah}
                      onChange={(e) => handleChange('kepalaMadrasah', e.target.value)}
                      placeholder="Contoh: Muzakki, S.Pd. atau nama Kepala Sekolah baru"
                      className="w-full text-sm font-bold bg-emerald-50/40 border border-emerald-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Ketik nama baru di sini untuk mengganti Kepala Sekolah saat ini (misal: saat pergantian kepala sekolah atau penunjukan Plt).
                  </p>
                </div>

                {/* NIP Kepala Sekolah */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    NIP / NUPTK Kepala Sekolah
                  </label>
                  <input
                    type="text"
                    value={formData.nipKepala}
                    onChange={(e) => handleChange('nipKepala', e.target.value)}
                    placeholder="Contoh: 19780612 200501 1 003 atau '-'"
                    className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  />
                  <p className="text-[11px] text-slate-500">
                    Gunakan tanda strip (-) jika bukan ASN / belum memiliki NIP.
                  </p>
                </div>

                {/* Info Callout */}
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong>Otomatis Terhubung:</strong> Nama Kepala Sekolah yang Anda simpan di sini akan otomatis tampil pada:
                    <ul className="list-disc pl-4 mt-1 space-y-0.5 text-amber-800">
                      <li>KOP & Lembar Pengesahan Cetak Jadwal Supervisi (A4)</li>
                      <li>Lembar Hasil Supervisi Guru & Tenaga Kependidikan</li>
                      <li>Berita Acara & Catatan Tindak Lanjut Kepala Madrasah</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: IDENTITAS LEMBAGA (MI MAMBAUL ULUM) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-5">
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  2. Identitas Lembaga Pendidikan
                </h3>
                <p className="text-[11px] text-slate-500">
                  Nama resmi sekolah/madrasah dan nomor registrasi kementerian.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Nama Madrasah */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-xs font-bold text-slate-800">
                  Nama Resmi Madrasah / Sekolah <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => handleChange('nama', e.target.value)}
                  placeholder="MI MAMBAUL ULUM"
                  className="w-full text-sm font-bold bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
                <p className="text-[11px] text-slate-500">
                  Ubah menjadi <strong>MI MAMBAUL ULUM</strong> (Madrasah Ibtidaiyah).
                </p>
              </div>

              {/* NSM */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  NSM (Nomor Statistik Madrasah)
                </label>
                <input
                  type="text"
                  value={formData.nsm}
                  onChange={(e) => handleChange('nsm', e.target.value)}
                  placeholder="Contoh: 111235140028"
                  className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              {/* NPSN */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  NPSN (Nomor Pokok Sekolah Nasional)
                </label>
                <input
                  type="text"
                  value={formData.npsn}
                  onChange={(e) => handleChange('npsn', e.target.value)}
                  placeholder="Contoh: 60721452"
                  className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              {/* Tahun Pelajaran */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Tahun Pelajaran
                </label>
                <input
                  type="text"
                  value={formData.tahun}
                  onChange={(e) => handleChange('tahun', e.target.value)}
                  placeholder="Contoh: 2026 atau 2026/2027"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              {/* Semester */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Semester Aktif
                </label>
                <input
                  type="text"
                  value={formData.semester}
                  onChange={(e) => handleChange('semester', e.target.value)}
                  placeholder="Contoh: Ganjil 2026/2027"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: ALAMAT & KONTAK */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  3. Alamat Lengkap & Informasi Kontak
                </h3>
                <p className="text-[11px] text-slate-500">
                  Lokasi sekolah di Desa Sumberduren, Kecamatan Krucil, Kabupaten Probolinggo.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Alamat Lengkap */}
              <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-bold text-slate-800">
                  Alamat Lengkap <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.alamat}
                  onChange={(e) => handleChange('alamat', e.target.value)}
                  placeholder="Desa Sumberduren, Kecamatan Krucil, Kabupaten Probolinggo"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              {/* Desa / Kelurahan */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Desa / Kelurahan
                </label>
                <input
                  type="text"
                  value={formData.kelurahan}
                  onChange={(e) => handleChange('kelurahan', e.target.value)}
                  placeholder="Desa Sumberduren"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              {/* Kecamatan */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Kecamatan
                </label>
                <input
                  type="text"
                  value={formData.kecamatan}
                  onChange={(e) => handleChange('kecamatan', e.target.value)}
                  placeholder="Krucil"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              {/* Kabupaten */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Kabupaten
                </label>
                <input
                  type="text"
                  value={formData.kabupaten}
                  onChange={(e) => handleChange('kabupaten', e.target.value)}
                  placeholder="Kabupaten Probolinggo"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              {/* Provinsi */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Provinsi
                </label>
                <input
                  type="text"
                  value={formData.provinsi}
                  onChange={(e) => handleChange('provinsi', e.target.value)}
                  placeholder="Jawa Timur"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              {/* Telepon */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Nomor Telepon Madrasah
                </label>
                <input
                  type="text"
                  value={formData.telepon}
                  onChange={(e) => handleChange('telepon', e.target.value)}
                  placeholder="(0335) 841290"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Email Resmi Madrasah
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="mi.mambaululum.krucil@kemenag.go.id"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: FILOSOFI & NILAI PEMBELAJARAN */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  4. Landasan Filosofi Pembelajaran
                </h3>
                <p className="text-[11px] text-slate-500">
                  Prinsip kurikulum yang menjiwai rubrik evaluasi supervisi guru dan tendik.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Filosofi Pendidikan Madrasah
              </label>
              <textarea
                rows={2}
                value={formData.filosofi}
                onChange={(e) => handleChange('filosofi', e.target.value)}
                placeholder="Kurikulum Berbasis Cinta (KBC) & Pembelajaran Mendalam (Deep Learning)"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition leading-relaxed"
              />
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset ke Pengaturan Default MI Mambaul Ulum</span>
            </button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white transition"
              >
                Lihat Pratinjau KOP Surat
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md shadow-emerald-700/20 transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan Profil'}</span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* TAB 2: LIVE PREVIEW OF OFFICIAL KOP & SIGNATURE */
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-300 shadow-lg font-serif">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6 font-sans">
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pratinjau Hasil Cetak Berita Acara & Jadwal</span>
              </span>
              <button
                onClick={() => setActiveTab('form')}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                ← Edit Data Kembali
              </button>
            </div>

            {/* KOP RESMI */}
            <div className="text-center pb-3 border-b-4 border-double border-slate-900 relative">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-sans">
                KEMENTERIAN AGAMA REPUBLIK INDONESIA
              </h4>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-sans">
                KANTOR KEMENTERIAN AGAMA KABUPATEN PROBOLINGGO
              </h4>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950 mt-1">
                {formData.nama}
              </h2>
              <p className="text-[11px] text-slate-700 font-sans mt-0.5 font-medium">
                Alamat: {formData.alamat}, {formData.provinsi}
              </p>
              <p className="text-[10px] text-slate-500 font-sans">
                NSM: {formData.nsm} • NPSN: {formData.npsn} • Pos-el: {formData.email} • Telp: {formData.telepon}
              </p>
            </div>

            {/* CONTOH SAMPEL DOKUMEN SUPERVISI */}
            <div className="my-6 text-center">
              <h3 className="text-sm font-bold uppercase tracking-wide underline underline-offset-4 decoration-1 font-serif">
                JADWAL & HASIL SUPERVISI AKADEMIK PEMBELAJARAN
              </h3>
              <p className="text-xs font-bold text-emerald-900 font-sans mt-1">
                {formData.filosofi}
              </p>
              <p className="text-[11px] text-slate-600 font-sans">
                Tahun Ajaran {formData.tahun} — Semester {formData.semester}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-700 leading-relaxed mb-8">
              Contoh pratinjau ini memperlihatkan bagaimana nama madrasah <strong>"{formData.nama}"</strong> dan nama Kepala Madrasah <strong>"{formData.kepalaMadrasah}"</strong> tercetak resmi di seluruh lembar instrumen penilaian, jadwal A4, dan berita acara tindak lanjut supervisi.
            </div>

            {/* TANDA TANGAN KEPALA SEKOLAH */}
            <div className="pt-4 font-sans text-xs">
              <div className="w-72 ml-auto text-center">
                <p className="text-slate-700">
                  Sumberduren, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-slate-900 font-bold mt-0.5">
                  Kepala {formData.nama},
                </p>
                <div className="h-16 flex items-center justify-center">
                  <span className="text-slate-400 italic text-[11px]">
                    [ Tanda Tangan & Cap Sah Lembaga ]
                  </span>
                </div>
                <p className="font-extrabold text-slate-950 underline underline-offset-2 text-sm">
                  {formData.kepalaMadrasah}
                </p>
                <p className="text-[10.5px] text-slate-600 font-mono mt-0.5">
                  NIP. {formData.nipKepala || '-'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan & Terapkan Data Ini Sekarang</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
