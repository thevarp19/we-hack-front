"use client";
import { LanguageSelector } from "@/components/shared/LanguageSelector";
import { MultiplePhotoUpload } from "@/components/shared/MultiplePhotoUpload";
import { UploadFile } from "antd";
import { useState } from "react";

export default function Page() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    return (
        <div>
            <LanguageSelector />
            <MultiplePhotoUpload
                fileList={fileList}
                setFileList={setFileList}
            />
        </div>
    );
}
