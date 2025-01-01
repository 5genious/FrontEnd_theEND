import React from "react";
import { UsersTable } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { FaCircleExclamation, FaPlus } from "react-icons/fa6";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import FormRow from "./FormRow";
import { toast } from "react-toastify";
import {
  addEnseignant,
  addEtudiant,
  addTechnicien,
  uploadExcel,
} from "../../features/user/userSlice";
import * as XLSX from "xlsx";
const initialState = {
  nom: "",
  prenom: "",
  email: "",
  motDePasse: "",
  numeroTelephone: "",
};
const Users = () => {
  const { isFinalUser } = useSelector((store) => store.user);
  const [show, setShow] = useState(false);
  // const [value, setValue] = useState("");
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("Enseignant");
  const [file, setFile] = useState(null);
  const [validationError, setValidationError] = useState("");
  const requiredColumns = [
    "nom",
    "prenom",
    "email",
    "motDePasse",
    "numeroTelephone",
  ];
  const handleFileValidation = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      // Validation des colonnes
      const firstRow = Object.keys(jsonData[0] || {});
      const missingColumns = requiredColumns.filter(
        (col) => !firstRow.includes(col)
      );

      if (missingColumns.length > 0) {
        setValidationError(
          `Colonnes manquantes : ${missingColumns.join(", ")}`
        );
        setFile(null);
      } else {
        setValidationError("");
        setFile(selectedFile);
      }
    };

    reader.readAsBinaryString(selectedFile);
  };
  const handleSubmit = async () => {
    if (!file) {
      toast.error("Veuillez sélectionner un fichier valide.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log("File details:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Vérifier le contenu du FormData
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    dispatch(uploadExcel(formData));
  };
  const handleSelectedChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { nom, prenom, email, motDePasse, numeroTelephone } = values;
    if (!nom || !prenom || !email || !motDePasse || !numeroTelephone) {
      toast.error("Please Fill Out All Fields");
      return;
    }
    if (selectedOption === "Technicien") {
      dispatch(
        addTechnicien({ nom, prenom, email, motDePasse, numeroTelephone })
      );
    } else if (selectedOption === "Enseignant") {
      dispatch(
        addEnseignant({ nom, prenom, email, motDePasse, numeroTelephone })
      );
    } else {
      dispatch(
        addEtudiant({ nom, prenom, email, motDePasse, numeroTelephone })
      );
    }
    setValues("");
    setShow(false);
  };

  return (
    <>
      {!isFinalUser && (
        <div className="flex  pb-0 justify-between sm:justify-normal  mt-10">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileValidation}
            className="block  text-sm text-slate-500 
     file:p-3  
    file:rounded-lg file:border-0 
    file:text-sm file:font-semibold 
    file:bg-[#F9A125] file:text-white 
    hover:file:bg-[#E89114]
    file:cursor-pointer
    bg-transparent
    [&::file-selector-button]:bg-[#F9A125]
    [&::-webkit-file-upload-button]:bg-[#F9A125]"
          />
          {validationError && <p style={{ color: "red" }}>{validationError}</p>}
          <button
            onClick={handleSubmit}
            disabled={!file}
            className={` p-3  rounded-lg flex items-center gap-2  ml-5
      ${
        !file
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-[#011187eb] hover:bg-[#011187cc] text-white"
      } transition-colors duration-200`}
          >
            Envoyer
          </button>

          <button
            onClick={() => {
              setShow(!show);
            }}
            className="btn bg-[#011187eb] text-white p-3 absolute  right-0 mr-[4%] flex items-center space-x-2 rounded-lg hover:tracking-tight hover:shadow-2xl hover:shadow-black transition-all ease-in-out duration-500"
          >
            <FaPlus />
            <span>Ajouter User</span>
          </button>
        </div>
      )}

      <div className="content-area h-full">
        <UsersTable />
      </div>
      {show && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
          {/* Fond semi-transparent */}
          <div
            className="absolute top-0 left-0 w-screen h-screen bg-black opacity-50"
            onClick={() => setShow(false)} // Clique sur le fond pour fermer
          ></div>
          {/* La Card */}
          <form
            className="relative z-50 flex justify-center content-center w-full"
            onSubmit={onSubmit}
            method="POST"
          >
            <Card
              title={
                <div className="flex items-center space-x-3 gap-3 text-[#011187eb]">
                  Ajouter Utilisateur
                  <FaCircleExclamation className=" text-1xl" />
                </div>
              }
              className="lg:w-[28%] md:w-[50%] bg-white rounded-lg shadow-lg p-3"
            >
              <style>
                {`
          .dropdown-placeholder .p-dropdown input::placeholder {
            color: #ff0000; /* Changer la couleur du placeholder en rouge */
          }
        `}
              </style>
              <div className="mt-5 flex flex-col w-full">
                <div className="flex flex-col w-full">
                  <select
                    className="rounded-md px-3  py-1 border border-gray-300 bg-white"
                    value={selectedOption}
                    onChange={handleSelectedChange}
                  >
                    <option value="Technicien">Intervenant</option>
                    <option value="Enseignant">Enseignant</option>
                    <option value="Etudiant">Etudiant</option>
                  </select>
                </div>
                <FormRow
                  type="text"
                  name="nom"
                  value={values.nom}
                  handleChange={handleChange}
                  labelText="Nom"
                />
                <FormRow
                  type="text"
                  name="prenom"
                  value={values.prenom}
                  handleChange={handleChange}
                  labelText="Prenom"
                />
                <FormRow
                  type="text"
                  name="email"
                  value={values.email}
                  handleChange={handleChange}
                  labelText="Email"
                />
                <FormRow
                  type="text"
                  name="numeroTelephone"
                  value={values.numeroTelephone}
                  handleChange={handleChange}
                  labelText="numero de Telephone"
                />
                <FormRow
                  type="password"
                  name="motDePasse"
                  value={values.motDePasse}
                  handleChange={handleChange}
                  labelText="mot De Passe"
                />
              </div>
              <div className="flex justify-center gap-3 mt-4">
                <Button
                  label="Annuler"
                  style={{
                    fontWeight: "bold", // Appliquer un texte en gras
                    border: "2px solid gray",
                  }}
                  className="p-button-text p-2 border-2 border-gray-700 text-gray-600 hover:bg-gray-600 hover:text-white"
                  onClick={() => setShow(false)}
                />
                <Button
                  label="Ajouter"
                  type="submit"
                  style={{
                    fontWeight: "bold", // Appliquer un texte en gras
                    border: "2px solid #011187eb",
                  }}
                  className="p-button-text bg-[#011187eb] p-2 text-white pl-6 pr-6 hover:bg-white hover:border-[5px] border border-[#011187eb] hover:text-[#011187eb]"
                />
              </div>
            </Card>
          </form>
        </div>
      )}
    </>
  );
};

export default Users;
