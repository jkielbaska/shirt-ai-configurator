import { CustomButton } from "./CustomButton";

export const FilePicker = ({
  file,
  setFile,
  readFile,
}: {
  file: File | null;
  setFile: (file: File | null) => void;
  readFile: (type: string) => boolean;
}) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === null ? "No file selected" : file.name}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <CustomButton
            type="outline"
            title="Logo"
            handleClick={() => readFile("logo")}
            customStyles="text-xs"
          ></CustomButton>
          <CustomButton
            type="filled"
            title="full"
            handleClick={() => readFile("full")}
            customStyles="text-xs"
          ></CustomButton>
        </div>
      </div>
    </div>
  );
};
