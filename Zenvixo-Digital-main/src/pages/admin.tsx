import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const categories = [
  { id: 'graphic-designing', name: 'Graphic Designing' },
  { id: '2d', name: '2D Art' },
  { id: '3d', name: '3D Art' },
  { id: '2d-animation', name: '2D Animation' },
  { id: '3d-animation', name: '3D Animation' },
  { id: 'web-dev', name: 'Web Development' },
  { id: 'ui-ux', name: 'UI/UX Development' },
  { id: 'video-editing', name: 'Video Editing' },
  { id: 'ai-ads', name: 'AI Ad Generation' },
  { id: 'yt-automation', name: 'YouTube Automation' },
];

export default function Admin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('graphic-designing');
  const [loading, setLoading] = useState(false);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Media Type State
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'link'>('image');

  // Image Source & File States
  const [imageSource, setImageSource] = useState<'file' | 'url'>('file');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isImageDragging, setIsImageDragging] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const adminContainerRef = useRef<HTMLDivElement>(null);

  // Video Source & File States
  const [videoSource, setVideoSource] = useState<'file' | 'url'>('file');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [isVideoDragging, setIsVideoDragging] = useState(false);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Link State
  const [projectUrl, setProjectUrl] = useState('');

  // List of uploaded projects
  const [projects, setProjects] = useState<any[]>([]);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const startEditing = (proj: any) => {
    setEditingProjectId(proj.id);
    setTitle(proj.title || '');
    setDescription(proj.description || '');
    
    if (proj.category === 'digital-art') {
      setSelectedCategory(proj.subCategory || '2d');
    } else {
      setSelectedCategory(proj.category || 'graphic-designing');
    }
    
    setMediaType(proj.media_type || 'image');
    setImageFile(null);
    setVideoFile(null);
    
    if (proj.image) {
      setImageUrl(proj.image);
      setImagePreview(proj.image);
      setImageSource('url');
    } else {
      setImageUrl('');
      setImagePreview(null);
      setImageSource('file');
    }

    if (proj.video_url) {
      setVideoUrl(proj.video_url);
      setVideoPreview(proj.video_url);
      setVideoSource('url');
    } else {
      setVideoUrl('');
      setVideoPreview(null);
      setVideoSource('file');
    }

    setProjectUrl(proj.project_url || '');
    
    // Scroll the admin container to top
    setTimeout(() => {
      if (adminContainerRef.current) {
        adminContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const cancelEditing = () => {
    setEditingProjectId(null);
    setTitle('');
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
    setImageUrl('');
    setVideoFile(null);
    setVideoPreview(null);
    setVideoUrl('');
    setProjectUrl('');
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProjects(data);
    if (error) console.error("Error fetching projects:", error);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  const getFilePathFromUrl = (url?: string) => {
    if (!url) return null;
    const marker = '/storage/v1/object/public/portfolio-images/';
    const index = url.indexOf(marker);
    if (index !== -1) {
      return decodeURIComponent(url.substring(index + marker.length));
    }
    return null;
  };

  const getDropdownCategory = (proj: any) => {
    if (proj.category === 'digital-art') {
      return proj.subCategory || '2d';
    }
    return proj.category;
  };

  const handleDeleteProject = async (id: string, imageUrl: string, videoUrl: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      // 1. Delete image file from storage
      const imagePath = getFilePathFromUrl(imageUrl);
      if (imagePath) {
        try {
          await supabase.storage.from('portfolio-images').remove([imagePath]);
        } catch (e) {
          console.warn("Storage image delete failed:", e);
        }
      }

      // 2. Delete video file from storage
      const videoPath = getFilePathFromUrl(videoUrl);
      if (videoPath) {
        try {
          await supabase.storage.from('portfolio-images').remove([videoPath]);
        } catch (e) {
          console.warn("Storage video delete failed:", e);
        }
      }

      // 3. Delete record from projects table
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      alert("Project deleted successfully!");
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Delete failed!");
    }
  };

  // Auto-derive category and subCategory for Supabase
  const getCategoryData = () => {
    const digitalArtMap: Record<string, string> = {
      '2d': '2d',
      '3d': '3d',
      '2d-animation': '2d-animation',
      '3d-animation': '3d-animation',
    };
    if (digitalArtMap[selectedCategory]) {
      return { category: 'digital-art', subCategory: digitalArtMap[selectedCategory] };
    }
    return { category: selectedCategory, subCategory: null };
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      email === import.meta.env.VITE_ADMIN_EMAIL &&
      password === import.meta.env.VITE_ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid email or password!");
    }
  };

  // Image handlers
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsImageDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      } else {
        alert("Please drop an image file!");
      }
    }
  };

  // Video handlers
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsVideoDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        setVideoPreview(URL.createObjectURL(file));
      } else {
        alert("Please drop a video file!");
      }
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return alert("Title aur Description zaroori hain!");

    // Validate media selection
    if (!editingProjectId) {
      if (mediaType === 'image') {
        if (imageSource === 'file' && !imageFile) return alert("Please upload an image file!");
        if (imageSource === 'url' && !imageUrl) return alert("Please enter an image URL!");
      } else if (mediaType === 'video') {
        if (videoSource === 'file' && !videoFile) return alert("Please upload a video file!");
        if (videoSource === 'url' && !videoUrl) return alert("Please enter a video URL!");
      } else if (mediaType === 'link') {
        if (!projectUrl) return alert("Please enter the external link URL!");
        if (imageSource === 'file' && !imageFile) return alert("Please upload a thumbnail image for the link!");
        if (imageSource === 'url' && !imageUrl) return alert("Please enter a thumbnail image URL!");
      }
    }

    setLoading(true);
    let finalImageUrl = imageUrl;
    let finalVideoUrl = videoUrl;

    try {
      // 1. Upload Thumbnail/Image if file is used
      if (
        (mediaType === 'image' && imageSource === 'file') ||
        (mediaType === 'video' && imageSource === 'file' && imageFile) ||
        (mediaType === 'link' && imageSource === 'file')
      ) {
        if (imageFile) {
          const fileExt = imageFile.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('portfolio-images')
            .upload(filePath, imageFile);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('portfolio-images')
            .getPublicUrl(filePath);

          finalImageUrl = publicUrl;
        }
      }

      // 2. Upload Video if file is used
      if (mediaType === 'video') {
        if (videoSource === 'file' && videoFile) {
          const fileExt = videoFile.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `videos/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('portfolio-images')
            .upload(filePath, videoFile);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('portfolio-images')
            .getPublicUrl(filePath);

          finalVideoUrl = publicUrl;
        }
      }

      // 3. Save / Update in Supabase
      const { category, subCategory } = getCategoryData();
      const projectPayload = {
        title,
        description,
        image: finalImageUrl || null,
        category,
        subCategory,
        media_type: mediaType,
        video_url: finalVideoUrl || null,
        project_url: mediaType === 'link' ? projectUrl : null
      };

      if (editingProjectId) {
        const { error: dbError } = await supabase
          .from('projects')
          .update(projectPayload)
          .eq('id', editingProjectId);

        if (dbError) throw dbError;
        alert("Project successfully update ho gaya!");
      } else {
        const { error: dbError } = await supabase
          .from('projects')
          .insert([projectPayload]);

        if (dbError) throw dbError;
        alert("Project successfully add ho gaya!");
      }

      fetchProjects();
      // Reset Form states
      setEditingProjectId(null);
      setTitle('');
      setDescription('');
      setImageFile(null);
      setImagePreview(null);
      setImageUrl('');
      setVideoFile(null);
      setVideoPreview(null);
      setVideoUrl('');
      setProjectUrl('');
    } catch (err) {
      console.error("Error:", err);
      alert("Kuch gadbad ho gayi upload ke doran!");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-brand-black flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-brand-yellow font-display font-bold text-xs uppercase tracking-widest">Restricted Area</span>
            <h2 className="text-3xl font-display font-bold text-white mt-2">Admin Login</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white/60 text-sm font-medium mb-2">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-black/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-white/60 text-sm font-medium mb-2">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-black/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-brand-yellow text-brand-black font-display font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-white transition-colors mt-4"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div ref={adminContainerRef} className="fixed inset-0 z-50 bg-brand-black overflow-y-auto pb-20">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10 sticky top-0 z-10 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-display font-bold text-white">
            Zenvixo <span className="text-brand-yellow">Admin</span>
          </h2>
          <button 
            onClick={() => setIsAuthenticated(false)} 
            className="text-white/50 hover:text-white text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 mt-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter">
            {editingProjectId ? 'EDIT' : 'ADD NEW'} <span className="text-brand-yellow">PROJECT</span>.
          </h1>
          <p className="text-white/50 mt-2">
            {editingProjectId ? 'Modify the details of your selected project below.' : 'Publish a new case study or artwork to your portfolio.'}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl">
          <form onSubmit={handleAddProject} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Title */}
              <div className="md:col-span-2">
                <label className="block text-white/60 text-sm font-medium mb-2">Project Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="w-full bg-black/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors"
                  placeholder="e.g., Creative Website"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-white/60 text-sm font-medium mb-2">Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  className="w-full bg-black/50 border border-white/10 text-white rounded-lg px-4 py-3 h-32 resize-none focus:outline-none focus:border-brand-yellow transition-colors"
                  placeholder="Tell the story behind this project..."
                />
              </div>

              {/* Category selector */}
              <div>
                <label className="block text-white/60 text-sm font-medium mb-2">Category</label>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)} 
                  className="w-full bg-black/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors appearance-none"
                >
                  <option value="graphic-designing">Graphic Designing</option>
                  <option value="2d">2D Art</option>
                  <option value="3d">3D Art</option>
                  <option value="2d-animation">2D Animation</option>
                  <option value="3d-animation">3D Animation</option>
                  <option value="web-dev">Web Development</option>
                  <option value="ui-ux">UI/UX Development</option>
                  <option value="video-editing">Video Editing</option>
                  <option value="ai-ads">AI Ad Generation</option>
                  <option value="yt-automation">YouTube Automation</option>
                </select>
              </div>

              {/* Media Type Selector */}
              <div>
                <label className="block text-white/60 text-sm font-medium mb-2">Media Type</label>
                <select 
                  value={mediaType} 
                  onChange={(e) => setMediaType(e.target.value as any)} 
                  className="w-full bg-black/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors appearance-none"
                >
                  <option value="image">🖼️ Image</option>
                  <option value="video">🎥 Video</option>
                  <option value="link">🔗 External Link</option>
                </select>
              </div>

              {/* Conditionally Render Inputs based on Media Type */}
              {mediaType === 'link' && (
                <div className="md:col-span-2">
                  <label className="block text-white/60 text-sm font-medium mb-2">External Project Link URL</label>
                  <input 
                    type="url" 
                    value={projectUrl} 
                    onChange={(e) => setProjectUrl(e.target.value)} 
                    className="w-full bg-black/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors"
                    placeholder="https://behance.net/my-project or https://mywebsite.com"
                  />
                </div>
              )}

              {/* If Video selection */}
              {mediaType === 'video' && (
                <div className="md:col-span-2 space-y-6">
                  {/* Video Source Toggle */}
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">Video Source</label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setVideoSource('file')}
                        className={`flex-1 py-2 px-4 border rounded-lg font-display font-bold uppercase text-[10px] tracking-wider transition-all ${
                          videoSource === 'file'
                            ? 'bg-brand-yellow border-brand-yellow text-brand-black'
                            : 'bg-black/50 border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        Upload Video File
                      </button>
                      <button
                        type="button"
                        onClick={() => setVideoSource('url')}
                        className={`flex-1 py-2 px-4 border rounded-lg font-display font-bold uppercase text-[10px] tracking-wider transition-all ${
                          videoSource === 'url'
                            ? 'bg-brand-yellow border-brand-yellow text-brand-black'
                            : 'bg-black/50 border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        Video URL / YouTube Link
                      </button>
                    </div>
                  </div>

                  {/* Video Upload Zone or Input */}
                  {videoSource === 'file' ? (
                    <div>
                      <label className="block text-white/60 text-sm font-medium mb-2">Upload Video File</label>
                      <div 
                        className={`w-full border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isVideoDragging ? 'border-brand-yellow bg-brand-yellow/10' : 'border-white/20 hover:border-white/40 bg-black/50'}`}
                        onDragOver={(e) => { e.preventDefault(); setIsVideoDragging(true); }}
                        onDragLeave={() => setIsVideoDragging(false)}
                        onDrop={handleVideoDrop}
                        onClick={() => videoInputRef.current?.click()}
                      >
                        <input 
                          type="file" 
                          ref={videoInputRef} 
                          className="hidden" 
                          accept="video/*" 
                          onChange={handleVideoFileChange} 
                        />
                        {videoPreview ? (
                          <div className="relative inline-block w-full max-w-xs">
                            <video src={videoPreview} className="max-h-48 rounded-lg object-contain w-full" controls muted />
                            <div className="mt-2 text-white/60 text-xs truncate">
                              {videoFile?.name}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <svg className="w-12 h-12 text-white/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            <p className="text-white/80 font-medium">Click to upload video or drag and drop</p>
                            <p className="text-white/40 text-sm mt-1">MP4, WebM (MAX. 50MB)</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-white/60 text-sm font-medium mb-2">Video URL / YouTube Link</label>
                      <input 
                        type="url" 
                        value={videoUrl} 
                        onChange={(e) => setVideoUrl(e.target.value)} 
                        className="w-full bg-black/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors"
                        placeholder="e.g. https://www.youtube.com/watch?v=... or direct mp4 url"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Preview Image / Thumbnail (Needed for Image and Link only) */}
              {(mediaType === 'image' || mediaType === 'link') && (
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">
                      {mediaType === 'image' ? 'Image Source' : 'Thumbnail / Preview Image Source'}
                    </label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setImageSource('file')}
                        className={`flex-1 py-2 px-4 border rounded-lg font-display font-bold uppercase text-[10px] tracking-wider transition-all ${
                          imageSource === 'file'
                            ? 'bg-brand-yellow border-brand-yellow text-brand-black'
                            : 'bg-black/50 border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        Upload Image File
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageSource('url')}
                        className={`flex-1 py-2 px-4 border rounded-lg font-display font-bold uppercase text-[10px] tracking-wider transition-all ${
                          imageSource === 'url'
                            ? 'bg-brand-yellow border-brand-yellow text-brand-black'
                            : 'bg-black/50 border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        Paste Image URL
                      </button>
                    </div>
                  </div>

                  {imageSource === 'file' ? (
                    <div>
                      <label className="block text-white/60 text-sm font-medium mb-2">
                        {mediaType === 'image' ? 'Upload Image' : 'Upload Thumbnail Image'}
                      </label>
                      <div 
                        className={`w-full border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isImageDragging ? 'border-brand-yellow bg-brand-yellow/10' : 'border-white/20 hover:border-white/40 bg-black/50'}`}
                        onDragOver={(e) => { e.preventDefault(); setIsImageDragging(true); }}
                        onDragLeave={() => setIsImageDragging(false)}
                        onDrop={handleImageDrop}
                        onClick={() => imageInputRef.current?.click()}
                      >
                        <input 
                          type="file" 
                          ref={imageInputRef} 
                          className="hidden" 
                          accept="image/*" 
                          onChange={handleImageFileChange} 
                        />
                        {imagePreview ? (
                          <div className="relative inline-block">
                            <img src={imagePreview} alt="Preview" className="max-h-48 rounded-lg object-contain" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                              <span className="text-white font-medium text-sm">Click or Drag to change</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <svg className="w-12 h-12 text-white/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            <p className="text-white/80 font-medium">Click to upload or drag and drop</p>
                            <p className="text-white/40 text-sm mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-white/60 text-sm font-medium mb-2">Image URL</label>
                      <input 
                        type="url" 
                        value={imageUrl} 
                        onChange={(e) => setImageUrl(e.target.value)} 
                        className="w-full bg-black/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors"
                        placeholder="e.g. https://images.unsplash.com/photo-..."
                      />
                    </div>
                  )}
                </div>
              )}

            </div>

            <div className="pt-4 border-t border-white/10 mt-8 flex justify-end gap-4">
              {editingProjectId && (
                <button 
                  type="button"
                  onClick={cancelEditing}
                  className="px-8 py-3 bg-white/10 text-white/80 font-display font-bold uppercase tracking-widest rounded-lg hover:bg-white/20 hover:text-white transition-colors"
                >
                  Cancel Edit
                </button>
              )}
              <button 
                type="submit" 
                disabled={loading}
                className="px-8 py-3 bg-brand-yellow text-brand-black font-display font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Publishing...' : editingProjectId ? 'Update Project' : 'Publish Project'}
              </button>
            </div>
          </form>
        </div>

        {/* All Portfolio Items Grouped by Category */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl mb-12">
          <h2 className="text-2xl font-display font-bold text-white mb-6 border-b border-white/10 pb-4">
            ALL <span className="text-brand-yellow">PORTFOLIO ITEMS</span>.
          </h2>

          {(() => {
            const allItems = projects;

            const hasItems = allItems.length > 0;
            if (!hasItems) return <p className="text-white/40">No projects uploaded yet.</p>;

            return (
              <div className="space-y-10">
                {categories.map((cat) => {
                  const catItems = allItems.filter(item => {
                    return getDropdownCategory(item) === cat.id;
                  });
                  if (catItems.length === 0) return null;

                  return (
                    <div key={cat.id} className="space-y-4">
                      <h3 className="text-lg font-display font-bold text-brand-yellow uppercase tracking-wider flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-brand-yellow animate-pulse" />
                        {cat.name} ({catItems.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {catItems.map((proj) => (
                          <div key={proj.id} className="bg-black/50 border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all duration-300">
                            <div>
                              <div className="relative aspect-[4/3] bg-black flex items-center justify-center">
                                {proj.media_type === 'video' && proj.video_url && !proj.video_url?.includes('youtube.com') && !proj.video_url?.includes('youtu.be') ? (
                                  <video src={proj.video_url} className="w-full h-full object-cover" muted />
                                ) : (
                                  <img 
                                    src={
                                      proj.image || 
                                      (proj.media_type === 'video' && proj.video_url && (proj.video_url?.includes('youtube.com') || proj.video_url?.includes('youtu.be'))
                                        ? `https://img.youtube.com/vi/${(() => {
                                            let videoId = '';
                                            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                                            const match = proj.video_url.match(regExp);
                                            if (match && match[2].length === 11) {
                                              videoId = match[2];
                                            }
                                            return videoId;
                                          })()}/maxresdefault.jpg`
                                        : 'https://picsum.photos/seed/default/1200/800')
                                    } 
                                    alt={proj.title} 
                                    className="w-full h-full object-cover" 
                                  />
                                )}
                                <div className="absolute top-2 right-2 flex gap-1.5">
                                  {proj.media_type && proj.media_type !== 'image' && (
                                    <span className="bg-black/60 text-white/80 text-[9px] px-2 py-0.5 rounded border border-white/10 uppercase">
                                      {proj.media_type}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="p-4">
                                <h4 className="font-bold text-white truncate text-sm">{proj.title}</h4>
                                <p className="text-white/40 text-xs mt-1 line-clamp-2">{proj.description}</p>
                              </div>
                            </div>
                            <div className="p-4 pt-0 flex gap-2">
                              <button
                                type="button"
                                onClick={() => startEditing(proj)}
                                className="flex-1 bg-white/10 hover:bg-brand-yellow text-white hover:text-brand-black border border-white/10 font-display font-bold text-[10px] uppercase tracking-widest py-2 rounded-lg transition-all"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProject(proj.id, proj.image, proj.video_url)}
                                className="flex-1 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 font-display font-bold text-[10px] uppercase tracking-widest py-2 rounded-lg transition-all"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </main>
    </div>
  );
}