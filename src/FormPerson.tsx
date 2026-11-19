import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const personSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  umur: z.coerce.number().min(17, "Umur minimal 17 tahun"),
  alamat: z.string().min(5, "Alamat minimal 5 karakter"),
  isMarried: z.boolean(),
  catatan: z.string().optional(),
});

type PersonFormData = z.infer<typeof personSchema>;

export default function FormPerson() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
  });

  const onSubmit = (data: PersonFormData) => {
    console.log("Data Valid:", data);
    alert("Data berhasil disimpan! Cek console.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md m-4 space-y-4">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
        Form Person
      </h2>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-1">Nama:</label>
        <input {...register("name")} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Nama..." />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-1">Umur:</label>
        <input type="number" {...register("umur")} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Umur..." />
        {errors.umur && <p className="text-red-500 text-sm mt-1">{errors.umur.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-1">Alamat:</label>
        <input {...register("alamat")} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Alamat..." />
        {errors.alamat && <p className="text-red-500 text-sm mt-1">{errors.alamat.message}</p>}
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input type="checkbox" {...register("isMarried")} className="w-4 h-4" />
        <label className="text-sm font-semibold text-gray-900">Sudah Menikah</label>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan:</label>
        <input {...register("catatan")} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Ketik sesuatu..." />
      </div>

      <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
        Simpan
      </button>
    </form>
  );
}