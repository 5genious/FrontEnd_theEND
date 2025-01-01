import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTechnician } from "../features/Technician/technicianSlice";
import {
  affectIncidentsToTechnician,
  importAllIncidents,
} from "../features/incident/incidentsSlice";

const Technicians = ({ selectedRows, setOpenTech }) => {
  const { technicians, SelectedTechnicianId } = useSelector(
    (store) => store.technician
  );

  const dispatch = useDispatch();

  const handleRowClick = (technicianId) => {
    if (SelectedTechnicianId === technicianId) {
      dispatch(setSelectedTechnician(0));
    } else {
      dispatch(setSelectedTechnician(technicianId));
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 text-gray-800">
            <th className="px-6 py-4 text-left"></th>
            <th className="px-6 py-4 text-left">Nom</th>
            <th className="px-6 py-4 text-left">Prénom</th>
            <th className="px-6 py-4 text-left">Numéro téléphone</th>
            <th className="px-6 py-4 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((technician) => (
            <tr
              key={technician.id}
              onClick={() => handleRowClick(technician.id)}
              className={`cursor-pointer hover:bg-blue-50 transition-all duration-300 ease-in-out ${
                SelectedTechnicianId === technician.id ? "bg-blue-100" : ""
              }`}
            >
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={SelectedTechnicianId === technician.id}
                  readOnly
                />
              </td>
              <td className="px-6 py-4 font-medium text-gray-700">
                {technician.nom}
              </td>
              <td className="px-6 py-4 text-gray-600">{technician.prenom}</td>
              <td className="px-6 py-4 text-gray-600">
                {technician.numeroTelephone}
              </td>
              <td className="px-6 py-4 text-gray-600">{technician.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="flex flex-col items-center mx-auto gap-6 mt-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <button
              type="button"
              className="btn btn-error text-white bg-red-600  hover:bg-white py-2 px-6 rounded-lg shadow-md focus:outline-none transform transition duration-700 hover:text-red-600 hover:border-red-500 ease-in-out"
              onClick={() => {
                dispatch(setSelectedTechnician(0));
                setOpenTech(false);
              }}
            >
              Annuler
            </button>
          </div>

          <div>
            <div>
              <button
                type="button"
                className={`btn btn-success text-white bg-green-600 hover:bg-white border-4 py-2 px-6 rounded-lg shadow-md transform hover:text-green-600 hover:border-green-500 transition duration-700 ease-in-out ${
                  SelectedTechnicianId === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } active:scale-110 active:rotate-3 active:bg-green-700`}
                onClick={() => {
                  dispatch(
                    affectIncidentsToTechnician({
                      selectedRows,
                      SelectedTechnicianId,
                    })
                  );
                  toast.success("Affected Successfully");
                  setOpenTech(false);
                  window.location.reload();
                }}
                disabled={SelectedTechnicianId === 0}
              >
                Affecter
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technicians;
