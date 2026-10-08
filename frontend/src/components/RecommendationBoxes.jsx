import React from 'react';
import { Sparkles, ClipboardList } from 'lucide-react';

export default function RecommendationBoxes({ result }) {
  if (!result || !result.prediction) return null;

  const { prediction, explanation } = result;
  const classId = prediction.class_id;

  // Identify top 2 SHAP positive drivers
  const positiveDrivers = (explanation?.features || [])
    .filter((f) => f.shap > 0)
    .slice(0, 2)
    .map((f) => f.feature);

  const topDriversText = positiveDrivers.length > 0
    ? `khususnya parameter ${positiveDrivers.join(' dan ')}`
    : 'berdasarkan profil kimia darah Anda';

  // Dynamic AI Summary
  const getAiSummary = () => {
    switch (classId) {
      case 1:
        return `AI mendeteksi adanya indikasi peningkatan risiko terkait kondisi Jantung dan Pembuluh Darah Anda berdasarkan parameter profil laboratorium Anda. Analisis SHAP menunjukkan ${topDriversText} memberikan kontribusi terbesar dalam mendorong prediksi ini ke arah perhatian medis klinis.`;
      case 2:
        return `AI mendeteksi adanya indikasi peningkatan risiko terkait spesialisasi Penyakit Dalam (kondisi metabolik dan ginjal). Parameter ${topDriversText} terindikasi menyimpang dari ambang batas optimal dan menjadi faktor pendorong utama pada model Tabular Conformer.`;
      case 3:
        return `AI mendeteksi indikasi pola yang mengarah ke spesialisasi Paru-Paru (kondisi respiratorik dan inflamasi sistemik). Parameter profil darah Anda ${topDriversText} terindikasi memerlukan perhatian medis dan evaluasi lebih lanjut.`;
      case 0:
      default:
        return `AI mendeteksi bahwa parameter profil laboratorium Anda secara umum berada dalam rentang seimbang tanpa adanya indikasi patologis signifikan pada keempat kategori risiko yang dievaluasi.`;
    }
  };

  // Dynamic Recommendations
  const getRecommendations = () => {
    switch (classId) {
      case 1:
        return [
          {
            label: 'Tindakan Medis',
            text: 'Sangat disarankan untuk berkonsultasi dengan Dokter Spesialis Jantung (Kardiolog) untuk pemeriksaan elektrokardiogram (EKG) atau echocardiography.',
          },
          {
            label: 'Pola Makan',
            text: 'Batasi asupan lemak jenuh, gorengan, bersantan, garam berlebih, dan hindari makanan olahan tinggi kolesterol.',
          },
          {
            label: 'Gaya Hidup',
            text: 'Hindari stres berlebih, pastikan istirahat cukup 7-8 jam, dan hindari asap rokok atau aktivitas fisik yang terlalu berat secara mendadak.',
          },
        ];
      case 2:
        return [
          {
            label: 'Tindakan Medis',
            text: 'Disarankan berkonsultasi dengan Dokter Spesialis Penyakit Dalam (Sp.PD) untuk evaluasi lanjutan fungsi metabolik (HbA1c) dan skrining ginjal berkala.',
          },
          {
            label: 'Pola Makan',
            text: 'Kurangi konsumsi gula sederhana, batasi karbohidrat olahan, dan cukupi kebutuhan hidrasi air putih minimal 2 liter/hari sesuai anjuran medis.',
          },
          {
            label: 'Gaya Hidup',
            text: 'Lakukan pemantauan gula darah dan tekanan darah rutin di rumah, serta pertahankan aktivitas fisik jalan santai 30 menit setiap hari.',
          },
        ];
      case 3:
        return [
          {
            label: 'Tindakan Medis',
            text: 'Disarankan berkonsultasi dengan Dokter Spesialis Paru (Sp.P) untuk evaluasi saluran pernapasan (Rontgen toraks/dada atau spirometri).',
          },
          {
            label: 'Pola Makan',
            text: 'Tingkatkan asupan makanan kaya antioksidan, vitamin C, vitamin D, dan protein berkualitas untuk mendukung sistem imun tubuh.',
          },
          {
            label: 'Gaya Hidup',
            text: 'Hindari paparan asap rokok, polusi udara, dan debu; gunakan masker di luar ruangan serta jaga ventilasi sirkulasi udara ruangan tetap bersih.',
          },
        ];
      case 0:
      default:
        return [
          {
            label: 'Tindakan Medis',
            text: 'Pertahankan pemeriksaan Medical Check-up secara berkala setidaknya 1 tahun sekali untuk deteksi dini berkelanjutan.',
          },
          {
            label: 'Pola Makan',
            text: 'Pertahankan pola makan bergizi seimbang dengan memperbanyak konsumsi serat, sayuran hijau, dan buah-buahan segar.',
          },
          {
            label: 'Gaya Hidup',
            text: 'Jaga kebiasaan olahraga teratur 150 menit per minggu, tidur teratur, dan kelola tingkat stres harian dengan baik.',
          },
        ];
    }
  };

  const recommendations = getRecommendations();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Box 1: Ringkasan Asisten AI */}
      <div className="bg-white border border-[#AFAFAF]/20 rounded-[20px] p-6 shadow-[0px_4px_16px_rgba(20,97,120,0.06)] flex flex-col justify-between text-left">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h4 className="font-montserrat font-bold text-base text-[#146178] flex items-center gap-2">
              <span className="text-amber-500">✨</span>
              Ringkasan Asisten AI
            </h4>
            <span className="px-2.5 py-0.5 rounded-[4px] bg-[#E8F6FA] border border-[#BDE3EE] text-[10px] font-bold text-[#5C7076] tracking-wider uppercase">
              STANDARD
            </span>
          </div>

          <p className="font-poppins text-slate-700 text-sm leading-relaxed">
            {getAiSummary()}
          </p>
        </div>
      </div>

      {/* Box 2: Rekomendasi Tindak Lanjut */}
      <div className="bg-white border border-[#AFAFAF]/20 rounded-[20px] p-6 shadow-[0px_4px_16px_rgba(20,97,120,0.06)] flex flex-col justify-between text-left">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h4 className="font-montserrat font-bold text-base text-[#146178] flex items-center gap-2">
              <span className="text-[#146178]">📋</span>
              Rekomendasi Tindak Lanjut
            </h4>
            <span className="px-2.5 py-0.5 rounded-[4px] bg-[#E8F6FA] border border-[#BDE3EE] text-[10px] font-bold text-[#5C7076] tracking-wider uppercase">
              STANDARD
            </span>
          </div>

          <div className="space-y-3 font-poppins text-sm">
            {recommendations.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-[#17ADBD]" />
                <p className="text-slate-700 leading-relaxed">
                  <strong className="font-semibold text-slate-900">{item.label}:</strong> {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
