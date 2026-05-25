"use client";

import { useState } from "react";

export default function CurriculumPage() {
  const [chapters, setChapters] = useState([]);

  // ADD CHAPTER
  const addChapter = () => {
    setChapters([
      ...chapters,

      {
        title: "",

        topics: [],
      },
    ]);
  };

  // UPDATE CHAPTER NAME
  const updateChapterTitle = (chapterIndex, value) => {
    const updated = [...chapters];

    updated[chapterIndex].title = value;

    setChapters(updated);
  };

  // ADD TOPIC
  const addTopic = (chapterIndex) => {
    const updated = [...chapters];

    updated[chapterIndex].topics.push({
      title: "",

      type: "video",

      video: null,

      article: "",

      freePreview: false,
    });

    setChapters(updated);
  };

  // UPDATE TOPIC TITLE
  const updateTopicTitle = (chapterIndex, topicIndex, value) => {
    const updated = [...chapters];

    updated[chapterIndex].topics[topicIndex].title = value;

    setChapters(updated);
  };

  // SWITCH TYPE
  const changeTopicType = (chapterIndex, topicIndex, type) => {
    const updated = [...chapters];

    updated[chapterIndex].topics[topicIndex].type = type;

    setChapters(updated);
  };

  // VIDEO UPLOAD
  const handleVideoUpload = async (chapterIndex, topicIndex, file) => {
    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch("/api/upload-video", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log(data);

    if (!data.success) {
      alert(data.message);

      return;
    }

    const updated = [...chapters];

    updated[chapterIndex].topics[topicIndex].video = data.videoUrl;

    setChapters(updated);

    alert("Video Uploaded Successfully");
  };

  // ARTICLE UPDATE
  const updateArticle = (chapterIndex, topicIndex, value) => {
    const updated = [...chapters];

    updated[chapterIndex].topics[topicIndex].article = value;

    setChapters(updated);
  };

  // FREE PREVIEW
  const togglePreview = (chapterIndex, topicIndex) => {
    const updated = [...chapters];

    updated[chapterIndex].topics[topicIndex].freePreview =
      !updated[chapterIndex].topics[topicIndex].freePreview;

    setChapters(updated);
  };

  // PUBLISH
  const publishCourse = () => {
    console.log(chapters);

    alert("Course Published");
  };

  return (
    <div className="p-8">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Curriculum</h1>

          <p className="text-gray-500 mt-2">Structure your course</p>
        </div>

        <button
          onClick={addChapter}
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          + Add Chapter
        </button>
      </div>

      {/* CHAPTERS */}

      <div className="space-y-6">
        {chapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="border rounded-xl bg-white">
            {/* CHAPTER HEADER */}

            <div className="p-5 border-b flex justify-between items-center">
              <input
                type="text"
                placeholder="Chapter Name"
                value={chapter.title}
                onChange={(e) =>
                  updateChapterTitle(chapterIndex, e.target.value)
                }
                className="text-2xl font-semibold border p-2 rounded w-full mr-5"
              />

              <button
                onClick={() => addTopic(chapterIndex)}
                className="border px-4 py-2 rounded-lg"
              >
                + Add Topic
              </button>
            </div>

            {/* TOPICS */}

            <div className="p-5 space-y-5">
              {chapter.topics.map((topic, topicIndex) => (
                <div key={topicIndex} className="border rounded-lg p-5">
                  {/* TOPIC TITLE */}

                  <input
                    type="text"
                    placeholder="Topic Name"
                    value={topic.title}
                    onChange={(e) =>
                      updateTopicTitle(chapterIndex, topicIndex, e.target.value)
                    }
                    className="border p-3 rounded w-full mb-5"
                  />

                  {/* TYPE SWITCH */}

                  <div className="flex gap-3 mb-5">
                    <button
                      onClick={() =>
                        changeTopicType(chapterIndex, topicIndex, "video")
                      }
                      className={`px-4 py-2 rounded-full ${
                        topic.type === "video"
                          ? "bg-black text-white"
                          : "border"
                      }`}
                    >
                      Video
                    </button>

                    <button
                      onClick={() =>
                        changeTopicType(chapterIndex, topicIndex, "article")
                      }
                      className={`px-4 py-2 rounded-full ${
                        topic.type === "article"
                          ? "bg-black text-white"
                          : "border"
                      }`}
                    >
                      Article
                    </button>
                  </div>

                  {/* VIDEO */}

                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      handleVideoUpload(
                        chapterIndex,
                        topicIndex,
                        e.target.files[0],
                      )
                    }
                  />
                  {topic.video && (
                    <p className="mt-4 text-green-600">
                      Video Uploaded Successfully
                    </p>
                  )}

                  {/* ARTICLE */}

                  {topic.type === "article" && (
                    <textarea
                      placeholder="Write article..."
                      value={topic.article}
                      onChange={(e) =>
                        updateArticle(chapterIndex, topicIndex, e.target.value)
                      }
                      className="border rounded-lg p-4 w-full h-40"
                    />
                  )}

                  {/* FREE PREVIEW */}

                  <div className="mt-5">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={topic.freePreview}
                        onChange={() => togglePreview(chapterIndex, topicIndex)}
                      />
                      Free Preview
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* PUBLISH */}

      {chapters.length > 0 && (
        <div className="mt-10 text-right">
          <button
            onClick={publishCourse}
            className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg"
          >
            Publish Course
          </button>
        </div>
      )}
    </div>
  );
}
