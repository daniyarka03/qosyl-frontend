import React, { useEffect, useRef, useState } from "react";
import styles from "./Avatar.module.sass";

const Avatar = ({ imageSrc, setImageSrc }) => {
  const [avatarUrl, setAvatarUrl] = useState();
  const defaultAvatar = "data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIFRyYW5zZm9ybWVkIGJ5OiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4KPHN2ZyBmaWxsPSIjZmZmZmZmIiBoZWlnaHQ9IjgwMHB4IiB3aWR0aD0iODAwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmlld0JveD0iMCAwIDQ4OS44IDQ4OS44IiB4bWw6c3BhY2U9InByZXNlcnZlIiBzdHJva2U9IiNmZmZmZmYiPgoNPGcgaWQ9IlNWR1JlcG9fYmdDYXJyaWVyIiBzdHJva2Utd2lkdGg9IjAiLz4KDTxnIGlkPSJTVkdSZXBvX3RyYWNlckNhcnJpZXIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgoNPGcgaWQ9IlNWR1JlcG9faWNvbkNhcnJpZXIiPiA8Zz4gPGc+IDxwYXRoIGQ9Ik00MzguMiwwSDUxLjZDMjMuMSwwLDAsMjMuMiwwLDUxLjZ2Mzg2LjZjMCwyOC41LDIzLjIsNTEuNiw1MS42LDUxLjZoMzg2LjZjMjguNSwwLDUxLjYtMjMuMiw1MS42LTUxLjZWNTEuNiBDNDg5LjgsMjMuMiw0NjYuNiwwLDQzOC4yLDB6IE00NjUuMyw0MzguMmMwLDE0LjktMTIuMiwyNy4xLTI3LjEsMjcuMUg1MS42Yy0xNC45LDAtMjcuMS0xMi4yLTI3LjEtMjcuMVY1MS42IGMwLTE0LjksMTIuMi0yNy4xLDI3LjEtMjcuMWgzODYuNmMxNC45LDAsMjcuMSwxMi4yLDI3LjEsMjcuMVY0MzguMnoiLz4gPHBhdGggZD0iTTMzNy40LDIzMi43aC04MC4zdi04MC4zYzAtNi44LTUuNS0xMi4zLTEyLjMtMTIuM3MtMTIuMyw1LjUtMTIuMywxMi4zdjgwLjNoLTgwLjNjLTYuOCwwLTEyLjMsNS41LTEyLjMsMTIuMiBjMCw2LjgsNS41LDEyLjMsMTIuMywxMi4zaDgwLjN2ODAuM2MwLDYuOCw1LjUsMTIuMywxMi4zLDEyLjNzMTIuMy01LjUsMTIuMy0xMi4zdi04MC4zaDgwLjNjNi44LDAsMTIuMy01LjUsMTIuMy0xMi4zIEMzNDkuNywyMzguMSwzNDQuMiwyMzIuNywzMzcuNCwyMzIuN3oiLz4gPC9nPiA8L2c+IDwvZz4KDTwvc3ZnPg=="
  const inputRef = useRef(null);
  useEffect(() => {
    if (!(typeof imageSrc === "object")) {
      setAvatarUrl(import.meta.env.VITE_SERVER_URL_MEDIA + imageSrc);
    }
    if (!imageSrc) {
      setAvatarUrl(defaultAvatar);
      // Convert defaultAvatar to File object
      const base64String = defaultAvatar.split(",")[1];
      const binaryString = atob(base64String);
      const arrayBuffer = new ArrayBuffer(binaryString.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }

      // Create a Blob
      const blob = new Blob([uint8Array], { type: "image/jpeg" });

      // Create a File object
      const file = new File([blob], "defaultAvatar.jpg", {
        type: "image/jpeg",
      });
      console.log(file)
      setImageSrc(file);
    }
  }, [imageSrc]);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target.result);
        setImageSrc(selectedFile);
        console.log(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className={styles.avatar__wrapper}>
      <img
        className={styles.avatar}
        src={avatarUrl}
        alt="Аватар"
        onClick={() => inputRef.current.click()}
      />
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default Avatar;
