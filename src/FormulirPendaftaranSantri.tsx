import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export enum DivisiIT {
  WEB = "WEB_DEVELOPMENT",
  MOBILE = "MOBILE_DEVELOPMENT",
  CYBER = "CYBER_SECURITY",
}

export interface FormSantriProps {
  judulForm: string;
  kuotaTersedia: number;
  isOpen: boolean;
}

export const pendaftaranSchema = z.object({
  namaLengkap: z.string().min(3, "Nama santri minimal 3 huruf"),
  umur: z.number().min(12, "Umur minimal 12 tahun"),
  email: z.string().email("Format email tidak valid"),
  divisi: z.nativeEnum(DivisiIT),
  motivasi: z.string().min(10, "Tuliskan motivasi minimal 10 karakter"),
});

export type PendaftaranFormData = z.infer<typeof pendaftaranSchema>;

const labelDivisi: Record<DivisiIT, string> = {
  [DivisiIT.WEB]: "Web Development",
  [DivisiIT.MOBILE]: "Mobile Development",
  [DivisiIT.CYBER]: "Cyber Security",
};

export function FormulirPendaftaranSantri(props: FormSantriProps) {
  const [pesanSukses, setPesanSukses] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PendaftaranFormData>({
    resolver: zodResolver(pendaftaranSchema),
    defaultValues: {
      namaLengkap: "",
      email: "",
      motivasi: "",
    },
  });

  const onSubmit = (data: PendaftaranFormData) => {
    console.log("Data Pendaftaran Berhasil:", data);
    setPesanSukses(`Data santri ${data.namaLengkap} berhasil dikirim.`);
    reset();
  };

  if (!props.isOpen) {
    return (
      <div className="max-w-md mx-auto p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
        Pendaftaran divisi sedang ditutup.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{props.judulForm}</h2>
        <p className="text-sm text-gray-500 mt-1">
          Sisa kuota: {props.kuotaTersedia} kursi
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-4">
        {pesanSukses && (
          <div className="px-3 py-2 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
            {pesanSukses}
          </div>
        )}

        <div>
          <label htmlFor="namaLengkap" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap
          </label>
          <input
            id="namaLengkap"
            type="text"
            {...register("namaLengkap")}
            placeholder="Masukkan nama lengkap"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.namaLengkap && (
            <p className="mt-1 text-xs text-red-600">{errors.namaLengkap.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="umur" className="block text-sm font-medium text-gray-700 mb-1">
            Umur (tahun)
          </label>
          <input
            id="umur"
            type="number"
            {...register("umur", { valueAsNumber: true })}
            placeholder="Contoh: 16"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.umur && (
            <p className="mt-1 text-xs text-red-600">{errors.umur.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="nama@email.com"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="divisi" className="block text-sm font-medium text-gray-700 mb-1">
            Divisi
          </label>
          <select
            id="divisi"
            {...register("divisi")}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Pilih divisi</option>
            {Object.values(DivisiIT).map((divisi) => (
              <option key={divisi} value={divisi}>
                {labelDivisi[divisi]}
              </option>
            ))}
          </select>
          {errors.divisi && (
            <p className="mt-1 text-xs text-red-600">{errors.divisi.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="motivasi" className="block text-sm font-medium text-gray-700 mb-1">
            Motivasi
          </label>
          <textarea
            id="motivasi"
            {...register("motivasi")}
            rows={3}
            placeholder="Tuliskan alasan bergabung"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          {errors.motivasi && (
            <p className="mt-1 text-xs text-red-600">{errors.motivasi.message}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Kirim Pendaftaran
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormulirPendaftaranSantri;