import React from 'react';
import { SAMPLE_PATIENTS } from '../utils/samples';
import { HeartPulse, Stethoscope, Wind, CheckCircle2, UserCheck } from 'lucide-react';

export default function SamplePresets({ activeSampleId, onSelectSample }) {
  const getIcon = (id) => {
    switch (id) {
      case 'sample-sehat':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'sample-jantung':
        return <HeartPulse className="w-4 h-4 text-rose-600" />;
      case 'sample-penyakit-dalam':
        return <Stethoscope className="w-4 h-4 text-amber-600" />;
      case 'sample-paru':
        return <Wind className="w-4 h-4 text-sky-600" />;
      default:
        return <UserCheck className="w-4 h-4 text-[#146178]" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#146178]/15 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <div>
          <h3 className="font-montserrat font-bold text-sm text-[#146178] flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#146178]" />
            Preset Profil Pasien Uji (1-Klik)
          </h3>
          <p className="text-xs text-[#5C7076] font-poppins">
            Pilih sampel data klinis riil untuk menguji respons model Conformer dan penjelasan SHAP
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {SAMPLE_PATIENTS.map((sample) => {
          const isSelected = activeSampleId === sample.id;
          return (
            <button
              key={sample.id}
              type="button"
              onClick={() => onSelectSample(sample)}
              className={`text-left p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#EDFBFF] border-[#146178] shadow-sm ring-1 ring-[#146178]'
                  : 'bg-[#F8FDFF] border-[#146178]/15 hover:border-[#146178]/40 hover:bg-[#EDFBFF]/60'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1.5 rounded-lg bg-white shadow-2xs border border-[#146178]/10">
                  {getIcon(sample.id)}
                </div>
                <span className="font-montserrat font-semibold text-xs text-[#146178] line-clamp-1">
                  {sample.name}
                </span>
              </div>
              <p className="text-[11px] text-[#5C7076] font-poppins line-clamp-2 leading-relaxed">
                {sample.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
