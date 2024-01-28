import { useDeletePhoto } from "@/hooks/photo/useDeletePhoto";
import { createCustomRequest } from "@/utils/photo.util";
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
import {
    Dispatch,
    FC,
    JSXElementConstructor,
    ReactElement,
    SetStateAction,
    useEffect,
} from "react";

interface MultiplePhotoUploadProps {
    fileList: UploadFile[];
    setFileList: Dispatch<SetStateAction<UploadFile[]>>;
    maxCount?: number;
    doesCompress?: boolean;
    doesOptimizePhoto?: boolean;
}

export const MultiplePhotoUpload: FC<MultiplePhotoUploadProps> = ({
    fileList,
    setFileList,
    maxCount = 10,
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

    const customRequest = createCustomRequest(doesCompress, doesOptimizePhoto);

    const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const { handleDeletePhoto } = useDeletePhoto();
    useEffect(() => {
        console.log(fileList);
    }, [fileList]);
    return (
        <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
            <SortableContext
                items={fileList.map((file) => file.uid)}
                strategy={verticalListSortingStrategy}
            >
                <Upload.Dragger
                    maxCount={maxCount}
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
                    onRemove={handleDeletePhoto}
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
