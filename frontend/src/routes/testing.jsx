import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { validateDocument } from "../service/validation";

export const Route = createFileRoute("/testing")({
  component: TestValidate,
});

function TestValidate() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Pilih PDF dulu");
      return;
    }

    const response = await validateDocument(file);

    setResult(response);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        Test Upload & Validate PDF
      </h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
        >
          Upload & Validate
        </button>
      </form>

      {result && (
        <pre className="mt-6 bg-gray-100 p-4 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
