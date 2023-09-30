import axios from "axios";

const cloudinary = (upload) => {
    const formData = new FormData();
    formData.append("file", upload);
    formData.append("upload_preset", "c2f1uza6");
    return axios.post(
        "https://api.cloudinary.com/v1_1/dw7ypqejp/image/upload",
        formData
    )
}

export default cloudinary