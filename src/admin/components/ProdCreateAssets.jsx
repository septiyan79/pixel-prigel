import { useState } from "react";
import UploadBox from "./UploadBox";

export default function ProdCreateAssets({ setCoverFile, setGalleryFiles, setAssetFile  }) {
    return (
        <>
            <div className="lg:col-span-5 space-y-6">
                <UploadBox
                    step="1"
                    title="Primary Cover Image"
                    accept="image/*"
                    onFilesChange={(file) => setCoverFile(file)}
                />
            </div>

            <div className="lg:col-span-7 space-y-6">
                <UploadBox
                    step="2"
                    title="Gallery Showcase"
                    accept="image/*"
                    mode="gallery"
                    onFilesChange={(files) => setGalleryFiles(files)}
                />

                <UploadBox
                    step="3"
                    title="Source File (PDF/ZIP)"
                    accept=".pdf,.zip"
                    mode="asset"
                    onFilesChange={(file) => setAssetFile(file)}
                />
            </div>
        </>
    );
}