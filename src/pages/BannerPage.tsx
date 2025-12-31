import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const bannerFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
});

type BannerFormValues = z.infer<typeof bannerFormSchema>;

interface BannerImage {
  file: File;
  preview: string;
}

const BannerPage = () => {
  const navigate = useNavigate();
  const [bannerImage, setBannerImage] = useState<BannerImage | null>(null);

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (bannerImage) {
        URL.revokeObjectURL(bannerImage.preview);
      }
      setBannerImage({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const removeImage = () => {
    if (bannerImage) {
      URL.revokeObjectURL(bannerImage.preview);
      setBannerImage(null);
    }
  };

  const onSubmit = (data: BannerFormValues) => {
    if (!bannerImage) {
      toast.error("Banner image required", {
        description: "Please upload a banner image",
      });
      return;
    }

    const formData = {
      ...data,
      bannerImage: {
        url: bannerImage.preview,
        public_id: `banner_${Date.now()}`,
      },
    };

    console.log("Banner submitted:", formData);

    toast.success("Banner Saved!", {
      description: `"${data.title}" has been saved successfully.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Add New Banner</h1>
            <p className="text-muted-foreground">Create a new banner for your website</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Banner Details</CardTitle>
                <CardDescription>Enter the banner title and upload an image</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter banner title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Banner Image Upload */}
                <div className="space-y-3">
                  <FormLabel>Banner Image *</FormLabel>
                  
                  {!bannerImage ? (
                    <label className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-secondary/50 transition-colors block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-foreground font-medium">Click to upload banner image</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </label>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden border border-border bg-muted">
                      <img
                        src={bannerImage.preview}
                        alt="Banner preview"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-sm text-white truncate">{bannerImage.file.name}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                Save Banner
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default BannerPage;
