import React, { useRef, useState } from 'react';
import styles from "./Avatar.module.sass"
import initialAvatar from "../../assets/load-avatar.svg"

const Avatar = ({imageSrc, setImageSrc}) => {
  
  const [avatarUrl, setAvatarUrl] = useState(initialAvatar);
  const inputRef = useRef(null);
  
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target.result);
        setImageSrc(selectedFile)
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
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleImageChange}
      />
    </div>
  );
}

export default Avatar;
