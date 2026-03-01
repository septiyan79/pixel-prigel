import UploadBox from "./UploadBox";

export default function ProdCreateAssets({ 
    setCoverFile, 
    setGalleryFiles, 
    setAssetFiles,
    driveLink,
    setDriveLink
}) {
    return (
        <>
            {/* LEFT SIDE */}
            <div className="lg:col-span-5 space-y-6">
                <UploadBox
                    step="1"
                    title="Primary Cover Image"
                    accept="image/*"
                    onFilesChange={(file) => setCoverFile(file)}
                />
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-7 space-y-6">
                <UploadBox
                    step="2"
                    title="Gallery Showcase"
                    accept="image/*"
                    mode="gallery"
                    onFilesChange={(files) => setGalleryFiles(files)}
                />

                {/* 🔥 ASSET IMAGES (MULTIPLE) */}
                <UploadBox
                    step="3"
                    title="Asset Images"
                    accept="image/*"
                    mode="gallery"
                    onFilesChange={(files) => setAssetFiles(files)}
                />

                {/* 🔥 GOOGLE DRIVE INPUT */}
                <div className="border-2 border-black rounded-xl p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <label className="block text-xs font-black uppercase mb-2 text-gray-700">
                        Google Drive Link (Optional)
                    </label>

                    <input
                        type="text"
                        value={driveLink}
                        onChange={(e) => setDriveLink(e.target.value)}
                        placeholder="https://drive.google.com/..."
                        className="w-full border-2 border-black rounded-lg px-4 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
            </div>
        </>
    );
}