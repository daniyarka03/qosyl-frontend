import React from "react";
import cleekLogo from "../../assets/cleek-logo.png";
import potokLogo from "../../assets/potok-logo.png";
import easytapLogo from "../../assets/easytap-logo.png";
import openaiLogo from "../../assets/openai-logo.png";
import styles from "./Carousel.module.sass";
const Carousel = () => {
  return (
    <section className={styles.trend}>
      <p className={styles.trend__title}>🔥 Hot Projects</p>
      <div className={styles.trend__projects}>
        <div className={styles.trend__project}>
          <img className={styles.trend__project__img} src={cleekLogo} alt="" />
          <p className={styles.trend__project__name}>Cleek</p>
        </div>
        <div className={styles.trend__project}>
          <img className={styles.trend__project__img} src={potokLogo} alt="" />
          <p className={styles.trend__project__name}>ПОТОК</p>
        </div>
        <div className={styles.trend__project}>
          <img
            className={styles.trend__project__img}
            src={easytapLogo}
            alt=""
          />
          <p className={styles.trend__project__name}>EasyTap</p>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
