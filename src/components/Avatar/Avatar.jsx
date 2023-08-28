import React, {useEffect, useRef, useState} from 'react';
import styles from "./Avatar.module.sass"
import initialAvatar from "../../assets/tiger.jpg"

const Avatar = ({ imageSrc, setImageSrc }) => {

  const [avatarUrl, setAvatarUrl] = useState(import.meta.env.VITE_SERVER_URL_MEDIA + imageSrc);
  const inputRef = useRef(null);


  // const defaultAvatarBlob = fetch(initialAvatar)
  //   .then(response => response.blob())
  //   .then(blob => new File([blob], 'tiger.jpg', { type: 'image/jpeg', lastModified: Date.now() }))
  //   .catch(error => console.error('Error fetching default avatar:', error));

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    //console.log(selectedFile)
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target.result);
        setImageSrc(selectedFile)
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setAvatarUrl(imageSrc);
      // defaultAvatarBlob.then(defaultAvatarFile => {
      //   setImageSrc(defaultAvatarFile)
      //   console.log(defaultAvatarFile)
      // });
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
