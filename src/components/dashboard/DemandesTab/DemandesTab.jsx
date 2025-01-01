import { useEffect, useState } from "react";
import axios from "axios";
import "./DemandesTab.scss";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import UpdateForm from "../../../screens/Crud/UpdateForm.jsx";
import AreaTableAction from "../areaTable/AreaTableAction.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  importDemandes,
  importAllDemandes,
} from "../../../features/demande/demandesSlice.js";
import emtyTable from "../../../assets/images/emtyTable.png";
import Technicians from "../../../screens/Technicians.jsx";
import {
  deleteDemande,
  updateDemande,
} from "../../../features/demande/demandeSlice.js";
import {
  FaCircleExclamation,
  FaFile,
  FaFileCircleCheck,
  FaFileCirclePlus,
  FaPlus,
} from "react-icons/fa6";
import { getTechnicians } from "../../../features/Technician/technicianSlice.js";
const TABLE_HEADS = [
  "Désignation Demande",
  "Date Création",
  "Status",
  "Utilisateur",
  "Action",
];
const TABLE_HEADSADMIN = [
  "Désignation Demande",
  "Priorité",
  "Date Création",
  "Status",
  "Utilisateur",
  "Technicien",
  "Action",
];

const DemandesTab = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [openTech, setOpenTech] = useState(false);

  const { SelectedTechnicianId } = useSelector((store) => store.technician);
  const dispatch = useDispatch();
  const { demandes, isLoading } = useSelector((store) => store.demandes);
  const { user, isFinalUser } = useSelector((store) => store.user);
  const handleClose = () => {
    setOpen(false);
    setSelectedData(null);
  };

  const handleOpen = (data) => {
    setSelectedData(data);
    setOpen(true);
  };

  const handleUpdateSubmit = async (updatedData) => {
    try {
      if (!updatedData.id) {
        console.error(
          "L'ID de la demande est manquant ou invalide:",
          updatedData.id
        );
        return;
      }
      dispatch(updateDemande(updatedData));
      handleClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la demande :", error);
    }
  };
  const handleDelete = async (id) => {
    dispatch(deleteDemande(id));
  };
  useEffect(() => {
    if (user.roles.includes("USER")) {
      dispatch(importDemandes());
    } else {
      dispatch(importAllDemandes());
    }
  }, []);
  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  const handleButtonClick = () => {
    dispatch(getTechnicians());
    setOpenTech(true);
  };

  if (isLoading) {
    return (
      <section className="content-area-table">
        <div className="loader-container">
          <div className="loader">
            <div className="inner-circle"></div>
          </div>
        </div>
      </section>
    );
  }
  const tableHeads = isFinalUser ? TABLE_HEADS : TABLE_HEADSADMIN;
  if (demandes.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full mt-20">
        <img src={emtyTable} alt="" width={400} />
        <p className="text-[#011187eb] font-bold  text-[20px]">
          Pas de Demande trouvé
        </p>
        <p className="text-[#011187eb]">
          Ajouter une demande pour voir le contenue
        </p>
      </div>
    );
  }
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h1 className="data-table-title mt-10 font-bebas tracking-wider text-7xl ">
          LISTE DES DEMANDES
        </h1>{" "}
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {tableHeads.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {demandes.map((dataItem) => {
              const utilisateurFinal = dataItem.utilisateurFinalDTO;

              return (
                <tr key={dataItem.id}>
                  <td>{dataItem.designation}</td>
                  {!isFinalUser && (
                    <td>
                      <div className="dt-priority">
                        <span
                          className={`dt-priority-dot dot-${
                            dataItem.priorite || "NON_DEFINI"
                          }`}
                        >
                          {dataItem.priorite === "BASSE" && "Basse"}
                          {dataItem.priorite === "MOYENNE" && "Moyenne"}
                          {dataItem.priorite === "ELEVEE" && "Elevé"}
                        </span>
                      </div>
                    </td>
                  )}
                  <td>
                    {new Date(dataItem.dateCreation).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="dt-status">
                      <span
                        className={`dt-status-dot dot-${
                          dataItem.status || "NON_DEFINI"
                        }`}
                      >
                        {dataItem.status === "EN_ATTENTE" && "En attente"}
                        {dataItem.status === "EN_COURS" && "En cours"}
                        {dataItem.status === "ACCEPTEE" && "Acceptée"}
                        {dataItem.status === "REJETEE" && "Rejetée"}
                        {!dataItem.status && "Non défini"}{" "}
                        {/* Message par défaut si status est null ou vide */}
                        {/* Message par défaut si status est null ou vide */}
                      </span>
                    </div>
                  </td>
                  <td>
                    {utilisateurFinal
                      ? `${utilisateurFinal.nom} ${utilisateurFinal.prenom}`
                      : "Inconnu"}
                  </td>
                  {!isFinalUser && (
                    <td className="font-bold text-xl text-center">-</td>
                  )}
                  <td className="dt-cell-action">
                    <AreaTableAction
                      onDelete={handleDelete}
                      itemId={dataItem.id}
                      onEdit={() => handleOpen(dataItem)}
                      selectedRows={selectedRows}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedRows.length > 0 && (
        <button
          onClick={handleButtonClick}
          className="btn bg-[#011187eb] text-white p-3 absolute mt-5 right-0 mr-[4%] flex items-center space-x-2 rounded-lg hover:tracking-tight hover:shadow-2xl hover:shadow-black transition-all hover:text-[#011187eb] ease-in-out duration-500"
        >
          <FaPlus />
          <span>Choisir technicien</span>
        </button>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <UpdateForm
            selectedData={selectedData}
            onClose={handleClose}
            onSubmit={handleUpdateSubmit}
            type="incident"
          />
        </Box>
      </Modal>
      <Modal open={openTech} onClose={() => setOpenTech(false)}>
        <Box sx={modalStyle}>
          <Technicians selectedRows={selectedRows} setOpenTech={setOpenTech} />
        </Box>
      </Modal>
    </section>
  );
};

const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  outline: "none",
  height: "100vh",
};

export default DemandesTab;
