import axios from 'axios';

export async function uploadMedia({ type, file, preset }) {
  const formData = new FormData();
  formData.append('upload_preset', preset);
  formData.append('file', file);

  const data = await axios
    .post(`https://api/cloudinary.com/v1_1/dzjxqvicl/${type}/upload`, formData)
    .then(response => response.data);

  return data.secure_url;
}
