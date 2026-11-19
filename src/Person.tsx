import React, { useState } from 'react';

export enum Countries {
  INDIA = "INDIA",
  USA = "USA",
  CANADA = "CANADA"
}

interface PersonProps {
  name: string;
  umur: number;
  alamat: string;
  isMarried: boolean;
  country: Countries;
}

function PersonCard({ name, umur, alamat, isMarried, country }: PersonProps) {
  const [catatan, setCatatan] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCatatan(e.target.value);
  };

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md m-4">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
        Informasi Person
      </h2>
      
      <div className="space-y-2 text-gray-700 mb-4">
        <p>
          <span className="font-semibold text-gray-900">Nama:</span> {name}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Umur:</span> {umur} tahun
        </p>
        <p>
          <span className="font-semibold text-gray-900">Alamat:</span> {alamat}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Status Pernikahan:</span> {isMarried ? "Menikah" : "Belum Menikah"}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Negara:</span> {country}
        </p>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Catatan Tambahan:
        </label>
        <input
          type="text"
          value={catatan}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ketik sesuatu..."
        />
        
        {catatan && (
          <p className="mt-2 text-sm text-blue-600">
            Hasil ketikan: <strong>{catatan}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

const dataDariDatabase: PersonProps[] = [
  { name: "Budi", umur: 17, alamat: "Jl. Merdeka No. 1", isMarried: false, country: Countries.INDIA },
  { name: "Siti", umur: 30, alamat: "Jl. Sudirman No. 2", isMarried: true, country: Countries.USA },
  { name: "John", umur: 25, alamat: "Jl. Thamrin No. 3", isMarried: false, country: Countries.CANADA },
];

export default function Person() {
  return (
    <div className="flex flex-wrap gap-4">
      {dataDariDatabase.map((orang, index) => (
        <PersonCard key={index} {...orang} />
      ))}
    </div>
  );
}