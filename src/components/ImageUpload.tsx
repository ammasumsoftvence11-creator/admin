import { useCallback, useRef } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadedImage {
  file: File;
  preview: string;
  id: string;
}

interface ImageUploadProps {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  maxFiles?: number;
  className?: string;
}

export const ImageUpload = ({
  images,
  onChange,
  maxFiles = 10,
  className,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const remainingSlots = maxFiles - images.length;
      const filesToAdd = files.slice(0, remainingSlots);

      const newImages: UploadedImage[] = filesToAdd.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }));

      onChange([...images, ...newImages]);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [images, maxFiles, onChange]
  );

  const removeImage = useCallback(
    (id: string) => {
      const imageToRemove = images.find((img) => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      onChange(images.filter((img) => img.id !== id));
    },
    [images, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );
      const remainingSlots = maxFiles - images.length;
      const filesToAdd = files.slice(0, remainingSlots);

      const newImages: UploadedImage[] = filesToAdd.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }));

      onChange([...images, ...newImages]);
    },
    [images, maxFiles, onChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return (
    <div className={cn("space-y-4", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-secondary/50 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-foreground font-medium">Click to upload or drag and drop</p>
        <p className="text-sm text-muted-foreground mt-1">
          PNG, JPG, GIF up to 10MB each
        </p>
        {images.length > 0 && (
          <p className="text-xs text-primary mt-2">
            {images.length}/{maxFiles} images added
          </p>
        )}
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group rounded-lg overflow-hidden border border-border bg-muted aspect-square"
            >
              <img
                src={image.preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(image.id);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-xs text-white truncate">{image.file.name}</p>
              </div>
            </div>
          ))}
          
          {/* Add More Button */}
          {images.length < maxFiles && (
            <div
              onClick={() => inputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-secondary/50 transition-colors"
            >
              <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Add More</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
