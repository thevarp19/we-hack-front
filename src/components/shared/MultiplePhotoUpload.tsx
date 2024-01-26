import {
    compressPhoto,
    deletePhoto,
    optimizePhoto,
    uploadPhoto,
} from "@/api/photo";
import { UploadPhotoDTO } from "@/types/api";
import {
    DndContext,
    DragEndEvent,
    PointerSensor,
    useSensor,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Upload, UploadFile, UploadProps } from "antd";
import { AxiosProgressEvent } from "axios";
import {
    Dispatch,
    FC,
    JSXElementConstructor,
    ReactElement,
    SetStateAction,
} from "react";

interface MultiplePhotoUploadProps {
    fileList: UploadFile[];
    setFileList: Dispatch<SetStateAction<UploadFile[]>>;
    doesCompress?: boolean;
    doesOptimizePhoto?: boolean;
}

export const MultiplePhotoUpload: FC<MultiplePhotoUploadProps> = ({
    fileList,
    setFileList,
    doesCompress = true,
    doesOptimizePhoto = false,
}) => {
    const sensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            setFileList((prev) => {
                const activeIndex = prev.findIndex((i) => i.uid === active.id);
                const overIndex = prev.findIndex((i) => i.uid === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };

    const customRequest: UploadProps["customRequest"] = async (options) => {
        const { onSuccess, file, onProgress, onError } = options;
        const config = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: (event: AxiosProgressEvent) => {
                if (onProgress) {
                    onProgress({
                        percent: (event.loaded / (event?.total || 1)) * 100,
                    });
                }
            },
        };

        const photos: UploadPhotoDTO = { pcImage: file as File };

        if (doesCompress) {
            const compressedPhoto = await compressPhoto(photos.pcImage);
            photos.pcImage = compressedPhoto;
        }

        if (doesOptimizePhoto) {
            await optimizePhoto(photos);
        }

        try {
            const res = await uploadPhoto(photos, config);
            if (onSuccess) {
                onSuccess(res);
            }
        } catch (error) {
            console.error(error);
            if (onError) {
                // @ts-ignore
                onError();
            }
        }
    };

    const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const getAxiosUploadedFileId = (file: UploadFile<any>): string => {
        return file?.response?.data?.id || file.uid;
    };

    return (
        <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
            <SortableContext
                items={fileList.map((file) => file.uid)}
                strategy={verticalListSortingStrategy}
            >
                <Upload.Dragger
                    customRequest={customRequest}
                    fileList={fileList}
                    onChange={onChange}
                    listType="picture"
                    multiple
                    accept="image/*"
                    itemRender={(originNode, file) => (
                        <DraggableUploadListItem
                            originNode={originNode}
                            file={file}
                        />
                    )}
                    onRemove={async (file) => {
                        await deletePhoto(getAxiosUploadedFileId(file));
                    }}
                >
                    Drop your file here, or click to browse
                </Upload.Dragger>
            </SortableContext>
        </DndContext>
    );
};

interface DraggableUploadListItemProps {
    originNode: ReactElement<any, string | JSXElementConstructor<any>>;
    file: UploadFile<any>;
}

const DraggableUploadListItem = ({
    originNode,
    file,
}: DraggableUploadListItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: file.uid,
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "move",
    };
    return (
        <div
            ref={setNodeRef}
            style={style}
            className={isDragging ? "is-dragging" : ""}
            {...attributes}
            {...listeners}
        >
            {file.status === "error" && isDragging
                ? originNode.props.children
                : originNode}
        </div>
    );
};
