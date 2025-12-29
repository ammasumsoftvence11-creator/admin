import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, X, Upload, Video, Image as ImageIcon, ArrowLeft, Save, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const historyFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  summary: z.string().trim().min(1, "Summary is required").max(500, "Summary must be less than 500 characters"),
  content: z.string().trim().min(1, "Content is required"),
  status: z.enum(["draft", "published"]).default("draft"),
  videoUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  images: z.array(z.object({
    url: z.string().url("Please enter a valid image URL"),
    public_id: z.string().optional(),
  })).optional(),
  videos: z.array(z.object({
    url: z.string().url("Please enter a valid video URL"),
    public_id: z.string().optional(),
  })).optional(),
});

type HistoryFormValues = z.infer<typeof historyFormSchema>;

const HistoryPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [images, setImages] = useState<{ url: string; public_id: string }[]>([]);
  const [videos, setVideos] = useState<{ url: string; public_id: string }[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");

  const form = useForm<HistoryFormValues>({
    resolver: zodResolver(historyFormSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      status: "draft",
      videoUrl: "",
      images: [],
      videos: [],
    },
  });

  const addImage = () => {
    if (newImageUrl.trim()) {
      try {
        new URL(newImageUrl);
        setImages([...images, { url: newImageUrl, public_id: `img_${Date.now()}` }]);
        setNewImageUrl("");
      } catch {
        toast({
          title: "Invalid URL",
          description: "Please enter a valid image URL",
          variant: "destructive",
        });
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addVideo = () => {
    if (newVideoUrl.trim()) {
      try {
        new URL(newVideoUrl);
        setVideos([...videos, { url: newVideoUrl, public_id: `vid_${Date.now()}` }]);
        setNewVideoUrl("");
      } catch {
        toast({
          title: "Invalid URL",
          description: "Please enter a valid video URL",
          variant: "destructive",
        });
      }
    }
  };

  const removeVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const onSubmit = (data: HistoryFormValues) => {
    const formData = {
      ...data,
      images,
      videos,
    };
    
    console.log("Form submitted:", formData);
    
    toast({
      title: data.status === "published" ? "History Published!" : "Draft Saved!",
      description: `"${data.title}" has been ${data.status === "published" ? "published" : "saved as draft"} successfully.`,
    });
  };

  return (
    <DashboardLayout title="History">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/")}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">Add New History</h2>
              <p className="text-muted-foreground">Create a new history entry for your website</p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info Card */}
            <Card className="shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-display">Basic Information</CardTitle>
                <CardDescription>Enter the main details for this history entry</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter history title..." 
                          className="bg-secondary border-0 focus-visible:ring-primary"
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
                      <FormLabel>Summary <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Write a brief summary (max 500 characters)..." 
                          className="bg-secondary border-0 focus-visible:ring-primary min-h-[100px] resize-none"
                          maxLength={500}
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-right">
                        {field.value?.length || 0}/500 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Write the full content here..." 
                          className="bg-secondary border-0 focus-visible:ring-primary min-h-[200px]"
                          {...field} 
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-secondary border-0 focus:ring-primary">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="draft">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                              Draft
                            </div>
                          </SelectItem>
                          <SelectItem value="published">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-chart-4" />
                              Published
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Images Card */}
            <Card className="shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  Images
                </CardTitle>
                <CardDescription>Add images for this history entry</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter image URL..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="bg-secondary border-0 focus-visible:ring-primary flex-1"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
                  />
                  <Button type="button" onClick={addImage} className="bg-gradient-gold hover:opacity-90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {images.map((image, index) => (
                      <div 
                        key={index} 
                        className="relative group rounded-lg overflow-hidden border border-border bg-muted aspect-video"
                      >
                        <img 
                          src={image.url} 
                          alt={`Image ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Invalid+Image";
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {images.length === 0 && (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No images added yet</p>
                    <p className="text-sm text-muted-foreground">Add image URLs above</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Videos Card */}
            <Card className="shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  <Video className="h-5 w-5 text-chart-2" />
                  Videos
                </CardTitle>
                <CardDescription>Add video content for this history entry</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Video URL (YouTube, Vimeo, etc.)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://youtube.com/watch?v=..." 
                          className="bg-secondary border-0 focus-visible:ring-primary"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 border-t border-border">
                  <Label className="text-sm font-medium mb-3 block">Additional Videos</Label>
                  <div className="flex gap-3">
                    <Input
                      placeholder="Enter video URL..."
                      value={newVideoUrl}
                      onChange={(e) => setNewVideoUrl(e.target.value)}
                      className="bg-secondary border-0 focus-visible:ring-primary flex-1"
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addVideo())}
                    />
                    <Button type="button" onClick={addVideo} variant="secondary">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>

                {videos.length > 0 && (
                  <div className="space-y-3 mt-4">
                    {videos.map((video, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-3 p-3 rounded-lg bg-secondary group"
                      >
                        <Video className="h-5 w-5 text-chart-2 flex-shrink-0" />
                        <span className="flex-1 text-sm truncate">{video.url}</span>
                        <button
                          type="button"
                          onClick={() => removeVideo(index)}
                          className="w-8 h-8 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive flex items-center justify-center transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                className="flex-1 sm:flex-none"
                onClick={() => {
                  form.setValue("status", "draft");
                  form.handleSubmit(onSubmit)();
                }}
              >
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
              <Button
                type="submit"
                className="flex-1 sm:flex-none bg-gradient-gold hover:opacity-90 shadow-glow"
                onClick={() => form.setValue("status", "published")}
              >
                <Eye className="h-4 w-4 mr-2" />
                Publish Now
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default HistoryPage;
