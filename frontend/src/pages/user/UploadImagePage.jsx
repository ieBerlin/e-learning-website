import { useRef, useState } from "react";
import Button from "../../components/Button";
import PageTemplate from "../../components/PageTemplate";
import DefaultUserImage from "/DefaultUserImage.jpg";
import Spinner from "../../components/Spinner";

export default function UploadImagePage() {
  let isSubmitting = false;
  const isUploading = false;
  const fileInputRef = useRef();
  const [avatar, setAvatar] = useState(DefaultUserImage);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <PageTemplate title="Upload Image">
      <div className="border border-gray-300 rounded-md bg-gray-50">
        <h2 className="text-xl font-semibold text-center text-gray-600 p-2">
          Upload Profile Picture
        </h2>
        <h3 className="text-center font-extralight text-gray-600 p-2">
          A clear and welcoming image makes your profile more appealing and
          helps others connect with you better.
        </h3>
        <hr className="my-2" />
        <main className="flex flex-col justify-center items-center p-2">
          <h3 className="text-start text-gray-600 font-light mb-2 w-full">
            Image Preview
          </h3>
          <div className="w-48 h-48 border border-gray-400 rounded-md relative">
            {isUploading && (
              <div className="absolute w-full h-full bg-gray-100 z-10 opacity-40" />
            )}
            <img
              src={avatar}
              className="rounded-md object-fill w-full"
              alt="Profile Preview"
            />
            {isUploading && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[11]">
                <Spinner />
              </div>
            )}
          </div>
          <h3 className="text-start text-gray-600 font-light mb-2 w-full">
            Upload New Image
          </h3>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr auto" }}
            className="mx-3 my-2 border border-gray-400 w-full items-center rounded-md pr-2"
          >
            <h2 className="text-gray-700 inline-block p-2">
              {isUploading ? "Uploading..." : "Select an image to preview"}
            </h2>
            <Button
              isLoading={isUploading}
              label="Select Image"
              onClick={() => fileInputRef.current.click()}
            />
          </div>
          <form className="w-full">
            <input
              ref={fileInputRef}
              type="file"
              name="avatar"
              id="avatar"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button isLoading={isSubmitting} label="Save Image" />
          </form>
        </main>
      </div>
    </PageTemplate>
  );
}
