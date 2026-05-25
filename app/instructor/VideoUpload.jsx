"use client";

export default function VideoUpload() {
  return (
    <div className="border-2 border-dashed p-10 rounded text-center">
      <p>Upload Video</p>

      <input type="file" accept="video/*" />
    </div>
  );
}
