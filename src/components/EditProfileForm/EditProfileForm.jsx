import React from "react";
import styles from "./EditProfileForm.module.sass";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import Input from "../../components/Input/Input";
const animatedComponents = makeAnimated();

const hobbieOptions = [
  { value: "Учеба", label: "Учеба", color: "#5243AA" },
  { value: "Чтение", label: "Чтение", color: "#FF8B00" },
  { value: "Программирование", label: "Программирование", color: "#FFC400" },
];

const EditProfileForm = ({
  handleSubmit,
  userName,
  setUserName,
  userHobbies,
  setUserHobbies,
  userStudyPlace,
  setUserStudyPlace,
  userProfession,
  setUserProfession,
  inputErrors,
}) => {
  const handleHobbies = (newHobbies) => {
    setUserHobbies(newHobbies);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form__header}>
        <div className={styles.form__header__inputs}>
          <div className={styles.input__wrapper}>
            <Input
              placeholder="Имя пользователя"
              type="text"
              name="text"
              id="userName"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              error={inputErrors.userName}
              maxlength={30}
            />
          </div>
          <div className={styles.input__wrapper}>
            <CreatableSelect
              isSearchable={true}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={hobbieOptions}
              placeholder="Хобби"
              noOptionsMessage={() => "Нет опций :/"}
              value={userHobbies}
              onChange={handleHobbies}
              formatCreateLabel={() => "Создать"}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderRadius: "1.2rem",
                }),
                valueContainer: (baseStyles, state) => ({
                  ...baseStyles,
                  padding: "2rem",
                }),
                placeholder: (baseStyles, state) => ({
                  ...baseStyles,
                  fontSize: "1.25rem",
                  color: "#534e4e",
                  fontWeight: "700",
                }),
                multiValue: (baseStyles, state) => ({
                  ...baseStyles,
                  fontFamily: "Montserrat",
                }),
              }}
            />
          </div>
          <div className={styles.input__wrapper}>
            <Input
              placeholder="Место учебы"
              type="text"
              name="text"
              id="userStudyPlace"
              value={userStudyPlace}
              onChange={(event) => setUserStudyPlace(event.target.value)}
              maxlength={30}
            />
          </div>
          <div className={styles.input__wrapper}>
            <Input
              placeholder="Специальность"
              type="text"
              name="text"
              id="userProfession"
              value={userProfession}
              onChange={(event) => setUserProfession(event.target.value)}
              maxlength={30}
            />
          </div>
        </div>
      </div>
      <button className={styles.form__button} type="submit">
        Изменить
      </button>
    </form>
  );
};

export default EditProfileForm;
