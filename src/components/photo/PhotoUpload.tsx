import { useDeletePhoto } from "@/hooks/photo/useDeletePhoto";
import { createCustomRequest } from "@/utils/photo.util";
import { Upload, UploadFile, UploadProps } from "antd";
import { Dispatch, FC, SetStateAction } from "react";

interface PhotoUploadProps {
    file: UploadFile<any> | null;
    setFile: Dispatch<SetStateAction<UploadFile<any> | null>>;
    doesCompress?: boolean;
    doesOptimizePhoto?: boolean;
}

export const PhotoUpload: FC<PhotoUploadProps> = ({
    file,
    setFile,
    doesCompress = true,
    doesOptimizePhoto = false,
}) => {
    const customRequest = createCustomRequest(doesCompress, doesOptimizePhoto);

    const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFile(newFileList?.[0] || null);
    };

    const { handleDeletePhoto } = useDeletePhoto();

    return (
        <Upload
            customRequest={customRequest}
            onChange={onChange}
            fileList={file ? [file] : []}
            listType="picture-card"
            accept="image/*"
            maxCount={1}
            onRemove={handleDeletePhoto}
        />
    );
};
