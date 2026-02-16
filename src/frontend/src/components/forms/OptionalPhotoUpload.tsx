import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';

interface OptionalPhotoUploadProps {
  onPhotoChange?: (file: File | null) => void;
  disabled?: boolean;
}

export default function OptionalPhotoUpload({ onPhotoChange, disabled }: OptionalPhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onPhotoChange?.(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onPhotoChange?.(null);
  };

  if (disabled) {
    return null;
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="photo-upload">Photo (Optional)</Label>
      {preview ? (
        <Card className="relative p-4">
          <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </Card>
      ) : (
        <div className="flex items-center gap-2">
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('photo-upload')?.click()}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Photo
          </Button>
          <span className="text-sm text-muted-foreground">Optional - helps technicians assess the issue</span>
        </div>
      )}
    </div>
  );
}
