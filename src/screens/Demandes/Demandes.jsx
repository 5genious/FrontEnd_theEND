import "./Demandes.scss";
import { DemandesTab } from "../../components/index.js";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import {
  FaCircleExclamation,
  FaFile,
  FaFileCircleCheck,
  FaFileCirclePlus,
  FaPlus,
} from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import { AreaTable } from "../../components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDemande } from "../../features/demande/demandeSlice.js";
import {
  importAllDemandes,
  importDemandesByPriorite,
} from "../../features/demande/demandesSlice.js";
const Demandes = () => {
  const [show, setShow] = useState(false);
  const [selectedValue, setSelectedValue] = useState("ALL");
  const { user, isFinalUser } = useSelector((store) => store.user);
  const handelAddDemandeBtn = () => {
    setShow(!show);
  };
  // const [value, setValue] = useState("");
  const [description, setDesctiption] = useState("");
  const [type, setType] = useState(null);
  const dispatch = useDispatch();
  const cities = [
    { name: " Type01", code: "1" },
    { name: " Type02", code: "2" },
    { name: " Type03", code: "3" },
    { name: " Type04", code: "4" },
  ];
  // const [DemandeData, setDemandeData] = useState({ type, description });

  const handelAddDemande = (e) => {
    e.preventDefault();
    // const id = getUserFromLocalStorage().userId;
    dispatch(createDemande({ designation: description }));
    setShow(false);
    // console.log("Request Body:", { id, description });

    // setDesctiption("");
    return;
  };
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleClick = () => {
    if (selectedValue === "ALL") {
      dispatch(importAllDemandes());
    } else {
      dispatch(importDemandesByPriorite(selectedValue));
    }
  };

  return (
    <>
      {isFinalUser && (
        <div>
          <button
            onClick={handelAddDemandeBtn}
            className="btn bg-[#011187eb] text-white p-3 absolute mt-10 right-0 mr-[4%] flex items-center space-x-2 rounded-lg hover:tracking-tight hover:shadow-2xl hover:shadow-black transition-all ease-in-out duration-500 "
          >
            <FaPlus />
            <span>Ajouter Demande</span>
          </button>
        </div>
      )}
      {!isFinalUser && (
        <div className="flex mb-0 justify-between rounded-lg p-4 mt-16 bg-white">
          <FaFilter className="text-3xl pt-2 text-[#011187eb]" />
          <select
            className="select select-info w-full max-w-xs  bg-white border border-gray-300 text-gray-700"
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option value="ALL">ALL</option>
            <option value="BASSE">Basse</option>
            <option value="MOYENNE">Moyenne</option>
            <option value="ELEVEE">Elevee</option>
          </select>
          <button
            onClick={handleClick}
            className="bg-[#011187eb] btn text-white "
          >
            SEARCH
          </button>
        </div>
      )}
      <div className="content-area">
        <DemandesTab />
      </div>
      {/* Overlay et Card */}
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
            onSubmit={handelAddDemande}
            method="POST"
          >
            <Card
              title={
                <div className="flex items-center space-x-3 gap-3 text-[#011187eb]">
                  Ajouter Demande <FaFileCirclePlus className=" text-1xl" />
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
              <Dropdown
                value={type}
                onChange={(e) => setType(e.target.value)}
                options={cities}
                optionLabel="name"
                placeholder="Selectionner type de Demande"
                className="dropdown-placeholder w-full md:w-14rem mt-5 pl-3 border border-[#011187eb] p-2 text-[#011187eb]"
                required
              />
              <FloatLabel className="mt-5">
                <InputTextarea
                  id="Description"
                  value={description}
                  onChange={(e) => setDesctiption(e.target.value)}
                  rows={5}
                  cols={30}
                  className="w-full mt-2 border-[1px] border-[#011187eb] p-2"
                  required
                />
                <label htmlFor="Description" className="text-[#011187eb]">
                  Description
                </label>
              </FloatLabel>
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

export default Demandes;
