import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ImageUpload";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Send } from "lucide-react";

interface UploadedImage {
  file: File;
  preview: string;
  id: string;
}

const cultureFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  summary: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  status: z.enum(["draft", "published"]),
});

type CultureFormValues = z.infer<typeof cultureFormSchema>;

const CulturePage = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const form = useForm<CultureFormValues>({
    resolver: zodResolver(cultureFormSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      status: "draft",
    },
  });

  const onSubmit = (data: CultureFormValues) => {
    const formData = {
      ...data,
      images: uploadedImages.map((img) => img.file),
    };
    console.log("Culture form submitted:", formData);
    toast.success("Culture entry saved successfully!");
  };

  return (
    <DashboardLayout title="Culture">
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Create Culture Entry
            </h2>
            <p className="text-muted-foreground mt-1">
              Add new cultural content with rich text formatting
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-card rounded-xl border border-border/50 shadow-card p-6 space-y-6">
              <h3 className="text-lg font-display font-semibold text-foreground">
                Basic Information
              </h3>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter culture title"
                        className="bg-background border-border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief summary of the culture entry"
                        className="bg-background border-border min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content *</FormLabel>
                    <FormControl>
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Write your culture content here..."
                        className="rich-text-editor"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Images Section */}
            <div className="bg-card rounded-xl border border-border/50 shadow-card p-6 space-y-4">
              <h3 className="text-lg font-display font-semibold text-foreground">
                Images
              </h3>
              <ImageUpload
                images={uploadedImages}
                onChange={setUploadedImages}
                maxFiles={10}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => form.setValue("status", "draft")}
              >
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
              <Button
                type="submit"
                className="bg-gradient-gold hover:opacity-90 shadow-glow w-full sm:w-auto"
                onClick={() => form.setValue("status", "published")}
              >
                <Send className="h-4 w-4 mr-2" />
                Publish Now
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default CulturePage;
