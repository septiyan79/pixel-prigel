import { useState } from "react";
import UploadBox from "./UploadBox";

export default function ProdCreateAssets() {
    const [cover, setCover] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [asset, setAsset] = useState(null);

    return (
        <>
            <div className="lg:col-span-5 space-y-6">
                <UploadBox
                    step="1"
                    title="Primary Cover Image"
                    accept="image/*"
                    onFilesChange={(file) => setCover(file)}
                />
            </div>

            <div className="lg:col-span-7 space-y-6">
                <UploadBox
                    step="2"
                    title="Gallery Showcase"
                    accept="image/*"
                    mode="gallery"
                    onFilesChange={(files) => setGallery(files)}
                />

                <UploadBox
                    step="3"
                    title="Source File (PDF/ZIP)"
                    accept=".pdf,.zip"
                    mode="asset"
                    onFilesChange={(file) => setAsset(file)}
                />
            </div>
        </>
    );
}