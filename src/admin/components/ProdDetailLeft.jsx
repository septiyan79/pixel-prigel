
import { FaPencilAlt, FaTrash, FaGoogleDrive, FaLink } from "react-icons/fa";

export default function ProdDetailLeft({ uploadingCover, coverInputRef, handleCoverUpload, product }) {
    return (
        <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border-2 border-black p-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-[9px] font-black uppercase mb-2 text-gray-400">
                    Main Cover
                </p>

                <div
                    className={`relative group ${uploadingCover ? "pointer-events-none opacity-70" : "cursor-pointer"}`}
                    onClick={() => {
                        if (!uploadingCover) coverInputRef.current.click();
                    }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        ref={coverInputRef}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleCoverUpload(file);
                        }}
                    />

                    <img
                        src={
                            typeof product.coverImage === "string"
                                ? product.coverImage
                                : product.coverImage?.url
                        }
                        className="w-full aspect-square object-cover rounded-lg border border-black"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all rounded-lg flex items-center justify-center">
                        <span className="bg-white p-2 rounded-full shadow-md">
                            {uploadingCover ? "Uploading..." : <FaPencilAlt />}
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white border-2 border-black p-3 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-[9px] font-black uppercase mb-3 text-gray-400">Gallery Photos</p>
                <div className="grid grid-cols-3 gap-2">
                    {product.galleryImages.map((img, i) => (
                        <div key={i} className="relative group cursor-pointer">
                            <img
                                src={img}
                                className="w-full aspect-square object-cover rounded border border-black"
                            />

                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all rounded flex items-center justify-center">
                                <span className="bg-white p-1 rounded-full shadow-md text-xs">
                                    <FaPencilAlt />
                                </span>
                            </div>
                        </div>
                    ))}

                    <div className="border-2 border-dashed border-gray-200 rounded flex items-center justify-center text-xs text-gray-300 font-black">
                        +
                    </div>
                </div>
            </div>
            {!product.active && (
                <NavLink
                    to={`/admin/product/${product.id}/assets`}
                    className="flex-1 flex items-center justify-center bg-black text-white py-3 rounded-xl font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(234,88,12,1)] active:shadow-none active:translate-y-1 transition-all"
                >
                    Upload Assets
                </NavLink>
            )}

            {/* Actions Area */}
            <div className="flex gap-3">

                {/* Google Drive */}
                {product.fileAsset?.driveLink && (
                    <a
                        href={product.fileAsset.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-black text-cyan-600 py-2 rounded-xl text-[10px] font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-green-100 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 transition-all"
                    >
                        <FaGoogleDrive className="text-xl m-2" />
                        Drive
                    </a>
                )}

                {/* Lynk.id */}
                <a
                    href={product.lynkid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2 rounded-xl text-[10px] font-black uppercase shadow-[3px_3px_0px_0px_rgba(234,88,12,1)] hover:bg-orange-700 hover:shadow-[2px_2px_0px_0px_rgba(234,88,12,1)] active:translate-y-1 transition-all"
                >
                    <FaLink className="text-xl m-2" />
                    Lynk.id
                </a>

                {/* Delete */}
                <button
                    className="flex-1 flex items-center justify-center gap-2 bg-red-100 border-2 border-black text-red-600 py-2 rounded-xl text-[10px] font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-red-200 hover:text-red-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 transition-all"
                >
                    <FaTrash className="text-xl m-2" />
                    Delete
                </button>

            </div>

        </div>
    );
}