"use client";
import { MultiplePhotoUpload } from "@/components/photo/MultiplePhotoUpload";
import { LanguageSelector } from "@/components/shared/LanguageSelector";
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
                doesCompress={false}
            />
        </div>
    );
}
