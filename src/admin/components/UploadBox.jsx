import { useState } from "react";
import { GoCloud, GoFileDirectory, GoPlus } from "react-icons/go";

export default function UploadBox({
  step,
  title,
  accept,
  mode = "cover", // cover | gallery | asset
  onFilesChange,
}) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [fileNames, setFileNames] = useState([]); // Track file names for asset

  const inputId = `upload-${title.replace(/\s+/g, "")}`;

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    // ===== GALLERY → APPEND =====
    if (mode === "gallery") {
      const newFiles = [...files, ...selectedFiles];
      const newPreviews = [
        ...previews,
        ...selectedFiles.map((file) =>
          URL.createObjectURL(file)
        ),
      ];

      setFiles(newFiles);
      setPreviews(newPreviews);
      onFilesChange(newFiles);
    }

    // ===== COVER / ASSET → REPLACE =====
    else {
      setFiles(selectedFiles);
      onFilesChange(selectedFiles[0]);

      if (mode === "cover") {
        setPreviews([
          URL.createObjectURL(selectedFiles[0]),
        ]);
      }

      // Set file names for asset
      if (mode === "asset") {
        setFileNames(selectedFiles.map(file => file.name));
      }
    }

    // reset input supaya bisa pilih file sama lagi
    e.target.value = null;
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter(
      (_, i) => i !== index
    );
    const updatedFileNames = fileNames.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    setFileNames(updatedFileNames);
    onFilesChange(updatedFiles);
  };

  return (
    <div className="bg-white border-2 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="text-[11px] font-black uppercase mb-4 flex items-center gap-2">
        <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px]">
          {step}
        </span>
        {title}
      </h3>

      <input
        type="file"
        accept={accept}
        multiple={mode === "gallery"}
        id={inputId}
        className="hidden"
        onChange={handleChange}
      />

      {/* ================= COVER ================= */}
      {mode === "cover" && (
        <>
          {!previews.length ? (
            <label
              htmlFor={inputId}
              className="aspect-square w-full bg-orange-50 border-2 border-dashed border-orange-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100/50 hover:border-orange-500 transition-all"
            >
              <GoCloud className="text-4xl text-orange-400" />
              <p className="text-[10px] font-black uppercase mt-3">
                Click to Upload Cover
              </p>
            </label>
          ) : (
            <label
              htmlFor={inputId}
              className="aspect-square w-full rounded-2xl overflow-hidden cursor-pointer relative"
            >
              <img
                src={previews[0]}
                alt="cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition">
                <p className="text-white text-xs font-bold">
                  Change Image
                </p>
              </div>
            </label>
          )}
        </>
      )}

      {/* ================= GALLERY ================= */}
      {mode === "gallery" && (
        <div className="grid grid-cols-3 gap-3">
          {previews.map((src, index) => (
            <div
              key={index}
              className="aspect-square rounded-xl overflow-hidden relative"
            >
              <img
                src={src}
                className="w-full h-full object-cover"
                alt=""
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-black text-white text-xs px-1 rounded"
              >
                ✕
              </button>
            </div>
          ))}

          <label
            htmlFor={inputId}
            className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-black transition-all"
          >
            <GoPlus className="text-2xl" />
          </label>
        </div>
      )}

      {/* ================= ASSET ================= */}
      {mode === "asset" && (
        <div>
          {/* Display the names of selected assets */}
          {fileNames.length > 0 ? (
            <div className="bg-green-100 p-3 rounded-xl border border-green-300">
              <ul>
                {fileNames.map((fileName, index) => (
                  <li key={index} className="text-green-800 text-sm">
                    {fileName}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <label
              htmlFor={inputId}
              className="bg-orange-500 border-2 border-black p-4 rounded-2xl flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white border-2 border-black rounded-xl flex items-center justify-center text-2xl">
                  <GoFileDirectory />
                </div>
                <div>
                  <p className="text-white text-[10px] font-black uppercase">
                    Drop Digital Asset
                  </p>
                  <p className="text-orange-200 text-[9px] font-bold mt-1 uppercase">
                    PDF / ZIP allowed
                  </p>
                </div>
              </div>
              <span className="text-white text-xs">→</span>
            </label>
          )}
        </div>
      )}
    </div>
  );
}