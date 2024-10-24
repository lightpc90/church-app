import { useEffect, useState } from "react";

interface AudioFile {
  name: string;
  url: string;
}

export default function Audio() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);

  useEffect(() => {
    // Fetch audio files dynamically from the public folder
    const fetchAudioFiles = async () => {
      // Simulate a server-side listing by hardcoding audio file paths
      // (You would list them here or fetch them from an API)
      const files = ["file1.mp3", "file2.mp3"]; // Replace with your actual files
      const audioList = files.map((file) => ({
        name: file,
        url: `/audio/${file}`,
      }));
      setAudioFiles(audioList);
    };

    fetchAudioFiles();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Audio Library</h1>
      <ul className="space-y-4">
        {audioFiles.map((file) => (
          <li key={file.name} className="border p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-medium mb-2">{file.name}</h3>

            {/* Audio Player */}
            <audio controls className="mb-4 w-full">
              <source src={file.url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>

            {/* Download Link */}
            <a
              href={file.url}
              download
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
