import axios from "axios";
import toast from "react-hot-toast";


export const uploadFileToCloudinary = async (file, setProgress) => {
 
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await axios.post(CLOUDINARY_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        if (setProgress) {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        }
      },
    });

    return res.data.secure_url;
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    toast.error("Image upload failed");
    throw err;
  }
};
