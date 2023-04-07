import React, {useState} from 'react';
import InputComponent from "../components/InputComponent.jsx";
import './css/AddJobView.css';
import ButtonComponent from "../components/ButtonComponent.jsx";
const AddJobView = () => {

    const [title, setTitle] = useState('');
    const [descr, setDescr] = useState('');
    const [projectName, setProjectName] = useState('');

    function createJobHandler() {

    }

    return (
        <div className="section-job">
            <h2>Add Job</h2>
            <div className="section__content">
                <InputComponent
                    valueInput={title}
                    classNameInput="section__input"
                    classNameLabel="section__label"
                    valueLabel="Title job"
                    onChangeFunc={(e) => setTitle(e.target.value)}
                    typeInput="text"
                />
                <InputComponent
                    valueInput={descr}
                    classNameInput="section__input"
                    classNameLabel="section__label"
                    valueLabel="Description job"
                    onChangeFunc={(e) => setDescr(e.target.value)}
                    typeInput="text"
                />
                <InputComponent
                    valueInput={projectName}
                    classNameInput="section__input"
                    classNameLabel="section__label"
                    valueLabel="Project name"
                    onChangeFunc={(e) => setProjectName(e.target.value)}
                    typeInput="text"
                />

                <ButtonComponent
                    className="button-solid"
                    value="Create job"
                    onClick={() => createJobHandler}
                />
            </div>
        </div>
    );
};

export default AddJobView;