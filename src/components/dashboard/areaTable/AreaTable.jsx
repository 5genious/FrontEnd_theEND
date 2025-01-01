import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Paginator } from "primereact/paginator";
import AreaTableAction from "./AreaTableAction";
import "./AreaTable.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Modal } from "@mui/material";
import { Ripple } from "primereact/ripple";
import Box from "@mui/material/Box";
import UpdateForm from "../../../screens/Crud/UpdateForm.jsx";
//import { useDispatch, useSelector } from 'react-redux'
import emtyTable from "../../../assets/images/emtyTable.png";

const TABLE_HEADS = [
  "Désignation Incident",
  "Type",
  "Date Création",
  "Status",
  "Utilisateur",

  "Action",
];
const TABLE_HEADSADMIN = [
  "Désignation Incident",
  "Type",
  "Priorité",
  "Date Création",
  "Status",
  "Utilisateur",
  "Intervenant",
  "Action",
];
import { useDispatch, useSelector } from "react-redux";
import {
  importIncidents,
  importAllIncidents,
  paginationIncident,
  importIncidentsOfTech,
} from "../../../features/incident/incidentsSlice.js";
import {
  deleteIncident,
  updateIncident,
} from "../../../features/incident/incidentSlice.js";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCircleExclamation,
  FaDiagramNext,
  FaFile,
  FaFileCircleCheck,
  FaFileCirclePlus,
  FaPlus,
} from "react-icons/fa6";
import Technicians from "../../../screens/Technicians.jsx";
import { getTechnicians } from "../../../features/Technician/technicianSlice.js";
import { Button } from "keep-react";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import Incidents from "../../../screens/Incidents/Incidents.jsx";
const AreaTable = () => {
  const [tableData, setTableData] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [openTech, setOpenTech] = useState(false);
  const dispatch = useDispatch();
  const { incidents, incidentTotal, isLoading } = useSelector(
    (store) => store.incidents
  );
  console.log("hado incidents");

  console.log(incidents);
  const refreshData = () => {
    setRefreshTrigger((prev) => prev + 1);
  };
  useEffect(() => {
    if (user.roles.includes("USER")) {
      dispatch(paginationIncident({ page: 1 }));
    } else if (user.roles.includes("TECHNICIEN")) {
      dispatch(importIncidentsOfTech());
    } else {
      dispatch(importAllIncidents({ page: 1 }));
    }
  }, [refreshTrigger]);

  const { user, isFinalUser } = useSelector((store) => store.user);
  //const { incident } = useSelector((store) => store.incident)
  const handleClose = () => {
    setOpen(false);
    setSelectedData(null);
  };
  const [first, setFirst] = useState([0, 0, 0]);
  const [rows, setRows] = useState([10, 10, 10]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );

  const onPageChange = (e, index) => {
    setFirst(first.map((f, i) => (index === i ? e.first : f)));
    setRows(rows.map((r, i) => (index === i ? e.rows : r)));
    const page = Math.floor(e.first / e.rows) + 1;
    const limite = e.rows;

    if (user.roles.includes("USER")) {
      dispatch(paginationIncident({ page }));
    }
    if (user.roles.includes("ADMIN")) {
      console.log("akramhada");
      dispatch(importAllIncidents({ page }));
    }
  };

  const onPageInputChange = (event) => {
    setCurrentPage(event.target.value);
  };

  const leftContent = (
    <Button type="button" icon="pi pi-star" className="p-button-outlined" />
  );
  const rightContent = <Button type="button" icon="pi pi-search" />;

  const template2 = {
    PrevPageLink: (options) => {
      return (
        <button
          type="button"
          className={classNames(options.className, "border-round mt-2")}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3 bg-[#011187] text-white flex items-center space-x-2">
            <IoIosArrowBack />
          </span>
          <Ripple />
        </button>
      );
    },
    PageLinks: (options) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, { "p-disabled": true });

        return (
          <span className={className} style={{ userSelect: "none" }}>
            ...
          </span>
        );
      }

      return (
        <button
          type="button"
          // style={{ color: "none" }}
          className={options.className}
          onClick={options.onClick}
        >
          {options.page + 1}
          <Ripple />
        </button>
      );
    },
    NextPageLink: (options) => {
      return (
        <button
          type="button"
          className={classNames(options.className, "border-round mt-2")}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3 bg-[#011187eb] text-white flex items-center space-x-2 ">
            <IoIosArrowForward className="font-bold" />
          </span>
          <Ripple />
        </button>
      );
    },

    // const handleDelete = (id) => {
    //   dispatch(deleteIncident(id));
    // };
    // RowsPerPageDropdown: (options) => {
    //   const dropdownOptions = [
    //     { label: 10, value: 10 },
    //     { label: 20, value: 20 },
    //     { label: 30, value: 30 },
    //     { label: "All", value: options.totalRecords },
    //   ];

    //   return (
    //     <Dropdown
    //       value={options.value}
    //       options={dropdownOptions}
    //       onChange={options.onChange}
    //     />
    //   );
    // },
  };
  const handleOpen = (data) => {
    setSelectedData(data);
    setOpen(true);
  };

  const handleUpdateSubmit = async (updatedData) => {
    if (!updatedData.id) return;
    dispatch(updateIncident(updatedData)).then(() => {
      refreshData();
      handleClose();
    });
  };

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
  // useEffect(() => {
  //   if (user.roles.includes("USER")) {
  //     dispatch(importIncidents());
  //   } else if (user.roles.includes("TECHNICIEN")) {
  //     dispatch(importIncidentsOfTech());
  //   } else {
  //     dispatch(importAllIncidents());
  //   }
  // }, []);

  useEffect(() => {
    if (user.roles.includes("USER")) {
      dispatch(paginationIncident({ page: 1 }));
    } else if (user.roles.includes("TECHNICIEN")) {
      dispatch(importIncidentsOfTech());
    } else {
      dispatch(importAllIncidents({ page: 1 }));
    }
  }, []);
  const handleDelete = (id) => {
    dispatch(deleteIncident(id)).then(() => {
      refreshData();
    });
  };
  console.log("hadoincident : " + incidents);

  if (isLoading) {
    return (
      <>
        <section className="content-area-table">
          <div className="loader-container">
            <div className="loader">
              <div className="inner-circle"></div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (incidents.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full mt-20">
        <img src={emtyTable} alt="" width={400} />
        <p className="text-[#011187eb] font-bold  text-[20px]">
          Pas d'incident trouvé
        </p>
        <p className="text-[#011187eb]">
          Ajouter un incident pour voir le contenue
        </p>
      </div>
    );
  }

  const tableHeads = isFinalUser ? TABLE_HEADS : TABLE_HEADSADMIN;
  console.log("hada total tani " + incidentTotal);

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h1 className="data-table-title font-bebas mt-10 tracking-wider text-7xl ">
          LISTE DES INCIDENTS
        </h1>
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
            {[...incidents].reverse().map((incident) => {
              const utilisateurFinal = incident.utilisateurFinalDTO;
              return (
                <tr key={incident.id} className="text-lg text-center ">
                  <td>{incident.designation}</td>
                  <td>{incident.typeIncident}</td>
                  {!isFinalUser && (
                    <td>
                      <div className="dt-priority">
                        <span
                          className={`dt-priority-dot dot-${
                            incident.priorite || "NON_DEFINI"
                          }`}
                        >
                          {incident.priorite === "BASSE" && "Basse"}
                          {incident.priorite === "MOYENNE" && "Moyenne"}
                          {incident.priorite === "ELEVEE" && "Élevée"}
                        </span>
                      </div>
                    </td>
                  )}
                  <td>
                    {new Date(incident.dateCreation).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="dt-status">
                      <span className={`dt-status-dot dot-${incident.status}`}>
                        {incident.status === "EN_ATTENTE" && "En attente"}
                        {incident.status === "EN_COURS" && "En cours"}
                        {incident.status === "TRAITE" && "Traité"}
                        {incident.status === "ANNULE" && "Annulé"}
                      </span>
                    </div>
                  </td>
                  <td>
                    {utilisateurFinal
                      ? `${utilisateurFinal.nom} ${utilisateurFinal.prenom}`
                      : "Inconnu"}
                  </td>
                  {!isFinalUser &&
                    (incident.technicien ? (
                      <td className="text-center ">
                        {incident.technicien.nom} {incident.technicien.prenom}
                      </td>
                    ) : (
                      <td className="font-bold text-xl text-center">-</td>
                    ))}
                  {isFinalUser && incident.status !== "EN_ATTENTE" ? (
                    <td className="dt-cell-action">
                      <AreaTableAction
                        onDelete={handleDelete}
                        itemId={incident.id}
                        affected={incident.technicien ? true : false}
                        onEdit={() => handleOpen(incident)}
                        selectedRows={selectedRows}
                        handleCheckboxChange={handleCheckboxChange}
                        disableActions={true}
                      />
                    </td>
                  ) : (
                    <td className="dt-cell-action">
                      <AreaTableAction
                        onDelete={handleDelete}
                        itemId={incident.id}
                        affected={incident.technicien ? true : false}
                        onEdit={() => handleOpen(incident)}
                        selectedRows={selectedRows}
                        handleCheckboxChange={handleCheckboxChange}
                        disableActions={false}
                      />
                    </td>
                  )}
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
          <span>Choisir Intervenant</span>
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
      {(Math.ceil(incidentTotal.length / 5) * 10) / 10 === 1 ? (
        <Paginator className="hidden" />
      ) : (
        <Paginator
          template={template2}
          first={first[0]}
          rows={rows[0]}
          totalRecords={Math.ceil(incidentTotal.length / 5) * 10}
          onPageChange={(e) => onPageChange(e, 0)}
          leftContent={leftContent}
          rightContent={rightContent}
        />
      )}
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

export default AreaTable;
