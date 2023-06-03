import axios from "axios";

const uploadHandler = async (file: File | null) => {
  const bucketUrl = "https://storage.googleapis.com/bucket-ps396";
  const apiUrl = "https://leftlovers-backend-nqh3dgyegq-et.a.run.app/api/v1";

  if (!file) return `${bucketUrl}/not-found-image.jpeg`;

  let formData = new FormData();
  formData.append("imgFile", file);
  const token = localStorage.getItem("authToken");

  const res = await axios.post(`${apiUrl}/upload`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 200) {
    return `https://storage.googleapis.com/bucket-ps396/${file.name}`;
  }

  return `${bucketUrl}/not-found-image.jpeg`;
};

export default uploadHandler;
