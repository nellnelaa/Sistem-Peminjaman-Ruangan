import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Save,
  X,
  Building2,
  Wrench,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getRuanganById, updateRuangan } from "../../../../service/ruangan";
import { getFasilitas } from "../../../../service/fasilitas";
import ConfirmationDialog from "../../../../components/CancelConfirmation";

export const Route = createLazyFileRoute("/admin/ruangan/edit/$id")({
  component: EditRuangan,
});

function EditRuangan() {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  const { data: fasilitasDetails } = useQuery({
    queryKey: ["fasilitas-details"],
    queryFn: getFasilitas,
  });

  const {
    data: ruangan,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ruangan", id],
    queryFn: () => getRuanganById(id),
    enabled: !!id,
  });

  const { mutate: update, isPending } = useMutation({
    mutationFn: (req) => updateRuangan(id, req),
    onSuccess: () => {
      toast.success("Data ruangan berhasil diperbarui!");
      navigate({ to: "/admin/ruangan" });
    },
    onError: (err) => {
      toast.error(err?.message || "Terjadi kesalahan saat memperbarui data");
    },
  });

  const [formData, setFormData] = useState({
    nama_ruangan: "",
    Gedung: "",
    lantai: "",
    kapasitas: "",
    status: "",
    jenis: "",
    fasilitas: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (ruangan) {
      setFormData({
        nama_ruangan: ruangan.nama_ruangan,
        Gedung: ruangan.Gedung,
        lantai: ruangan.lantai,
        kapasitas: ruangan.kapasitas,
        status: ruangan.status,
        jenis: ruangan.jenis,
        fasilitas: ruangan.fasilitas || [],
      });
    }
  }, [ruangan]);

  const gedungOptions = ["FIK1", "FIK2"];
  const lantaiOptions = [
    { value: "Satu", label: "Lantai 1" },
    { value: "Dua", label: "Lantai 2" },
    { value: "Tiga", label: "Lantai 3" },
  ];
  const statusOptions = ["Tersedia", "Tidak_Tersedia", "Perbaikan"];
  const jenisOptions = ["Seminar", "Kelas", "Lab", "dll"];
  const kondisiOptions = ["baik", "rusak"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama_ruangan.trim())
      newErrors.nama_ruangan = "Nama ruangan wajib diisi";

    if (!formData.Gedung) newErrors.Gedung = "Gedung wajib dipilih";

    if (!formData.lantai) newErrors.lantai = "Lantai wajib dipilih";

    if (!formData.kapasitas || isNaN(formData.kapasitas))
      newErrors.kapasitas = "Kapasitas wajib berupa angka";

    if (!formData.status) newErrors.status = "Status wajib dipilih";

    if (!formData.jenis) newErrors.jenis = "Jenis ruangan wajib dipilih";

    return newErrors;
  };

  const addFasilitas = () => {
    setFormData((prev) => ({
      ...prev,
      fasilitas: [
        ...prev.fasilitas,
        { fasilitas_details_id: "", jumlah: "", kondisi: "" },
      ],
    }));
  };

  const removeFasilitas = (i) => {
    setFormData((prev) => ({
      ...prev,
      fasilitas: prev.fasilitas.filter((_, idx) => idx !== i),
    }));
  };

  const updateFasilitas = (i, field, value) => {
    const updated = [...formData.fasilitas];
    updated[i][field] = value;

    setFormData((prev) => ({ ...prev, fasilitas: updated }));
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const request = {
      ...formData,
      kapasitas: Number(formData.kapasitas),
      fasilitas: formData.fasilitas.map((x) => ({
        fasilitas_details_id: Number(x.fasilitas_details_id),
        jumlah: Number(x.jumlah),
        kondisi: x.kondisi,
      })),
    };

    update(request);
  };

  const handleCancel = () => {
    ConfirmationDialog.showWithNavigation({
      title: "Batalkan Edit",
      message: "Apakah Anda yakin ingin membatalkan perubahan?",
      navigateTo: "/admin/ruangan",
      navigate,
    });
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memuat data ruangan...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Gagal memuat data ruangan.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <button
          onClick={() => navigate({ to: "/admin/ruangan" })}
          className="flex items-center mb-4 text-gray-600 hover:text-black"
        >
          <ArrowLeft className="mr-2" /> Kembali
        </button>

        <h1 className="text-3xl font-bold mb-2">Edit Ruangan</h1>
        <p className="text-gray-600 mb-6">Perbarui data ruangan kampus</p>

        {/* FORM CONTENT */}
        <div className="space-y-8">
          {/* DATA RUANGAN */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-blue-600" />
              Informasi Ruangan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* --- INPUTS SAMA DENGAN CREATE --- */}
              <InputField
                label="Nama Ruangan"
                name="nama_ruangan"
                value={formData.nama_ruangan}
                onChange={handleInputChange}
                error={errors.nama_ruangan}
                required
              />
              <SelectField
                label="Gedung"
                name="Gedung"
                value={formData.Gedung}
                options={gedungOptions.map((g) => ({
                  value: g,
                  label: g,
                }))}
                onChange={handleInputChange}
                error={errors.Gedung}
                required
              />

              <SelectField
                label="Lantai"
                name="lantai"
                value={formData.lantai}
                options={lantaiOptions.map((l) => ({
                  value: l.value,
                  label: l.label,
                }))}
                onChange={handleInputChange}
                error={errors.lantai}
                required
              />

              <InputField
                label="Kapasitas"
                name="kapasitas"
                type="number"
                value={formData.kapasitas}
                onChange={handleInputChange}
                error={errors.kapasitas}
                required
              />

              <SelectField
                label="Status"
                name="status"
                value={formData.status}
                options={statusOptions.map((s) => ({ value: s, label: s }))}
                onChange={handleInputChange}
                error={errors.status}
                required
              />

              <SelectField
                label="Jenis Ruangan"
                name="jenis"
                value={formData.jenis}
                options={jenisOptions.map((j) => ({ value: j, label: j }))}
                onChange={handleInputChange}
                error={errors.jenis}
                required
              />
            </div>
          </div>

          {/* FASILITAS */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Wrench className="h-5 w-5 mr-2 text-green-600" />
              Fasilitas Ruangan
            </h2>

            <div className="space-y-5">
              {formData.fasilitas.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-300 rounded-lg bg-gray-50"
                >
                  <SelectField
                    label="Nama Fasilitas"
                    value={item.fasilitas_details_id}
                    options={fasilitasDetails?.map((f) => ({
                      value: f.id,
                      label: f.nama,
                    }))}
                    onChange={(e) =>
                      updateFasilitas(
                        index,
                        "fasilitas_details_id",
                        e.target.value
                      )
                    }
                    required
                  />

                  <InputField
                    label="Jumlah"
                    type="number"
                    value={item.jumlah}
                    onChange={(e) =>
                      updateFasilitas(index, "jumlah", e.target.value)
                    }
                    required
                  />

                  <SelectField
                    label="Kondisi"
                    value={item.kondisi}
                    options={kondisiOptions.map((k) => ({
                      value: k,
                      label: k,
                    }))}
                    onChange={(e) =>
                      updateFasilitas(index, "kondisi", e.target.value)
                    }
                    required
                  />

                  <div className="flex items-end">
                    <button
                      onClick={() => removeFasilitas(index)}
                      className="w-full flex justify-center items-center px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={addFasilitas}
                className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Fasilitas
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-2" />
              Batal
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 🔧 COMPONENT REUSABLE AGAR TAMPILAN RAPI DAN SAMA */

function InputField({ label, error, required, ...rest }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        {...rest}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900
          ${error ? "border-red-500" : "border-gray-300"}`}
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function SelectField({ label, error, required, options = [], ...rest }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <select
        {...rest}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900
          ${error ? "border-red-500" : "border-gray-300"}`}
      >
        <option value="">Pilih</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default EditRuangan;
