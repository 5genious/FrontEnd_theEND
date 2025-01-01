import { FaCircleExclamation, FaPlus } from 'react-icons/fa6'
import { AreaTable } from '../../components'
import './Incidents.scss'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { useState } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { FloatLabel } from 'primereact/floatlabel'
import { Dropdown } from 'primereact/dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { createIncident } from '../../features/incident/incidentSlice'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import { FaFilter } from 'react-icons/fa'
import {
  importAllIncidents,
  importIncidentsByPriorite,
  importIncidentsByFilters,
} from '../../features/incident/incidentsSlice'
const Incidents = () => {
  const [show, setShow] = useState(false)
  const { user, isFinalUser } = useSelector((store) => store.user)
  const [selectedValue1, setSelectedValue1] = useState('ALL')
  const [selectedValue2, setSelectedValue2] = useState('ALL')
  const [selectedValue3, setSelectedValue3] = useState('ALL')
  const handelAddIncidentBtn = () => {
    setShow(!show)
  }
  // const [value, setValue] = useState("");
  const [description, setDesctiption] = useState('')
  const [type, setType] = useState(null)
  const dispatch = useDispatch()
  const types = ['TYPE1', 'TYPE2', 'TYPE3', 'TYPE4', 'TYPE5']
  // const [incidentData, setIncidentData] = useState({ type, description });

  const handelAddIncident = (e) => {
    // const id = getUserFromLocalStorage().userId;
    dispatch(createIncident({ typeIncident: type, designation: description }))
    setShow(false)
    // console.log("Request Body:", { id, description });

    // setDesctiption("");
    return
  }
  const handleSelectChange1 = (event) => {
    setSelectedValue1(event.target.value)
  }
  const handleSelectChange2 = (event) => {
    setSelectedValue2(event.target.value)
  }
  const handleSelectChange3 = (event) => {
    setSelectedValue3(event.target.value)
  }
  const handleClick = () => {
    if (
      selectedValue1 === 'ALL' &&
      selectedValue2 === 'ALL' &&
      selectedValue3 === 'ALL'
    ) {
      dispatch(importAllIncidents())
    } else {
      dispatch(
        importIncidentsByFilters({
          value1: selectedValue1 === 'ALL' ? '' : selectedValue1,
          value2: selectedValue2 === 'ALL' ? '' : selectedValue2,
          value3: selectedValue3 === 'ALL' ? '' : selectedValue3,
        })
      )
    }
  }

  return (
    <>
      {/* Bouton d'ajout */}
      {isFinalUser && (
        <div>
          <button
            onClick={handelAddIncidentBtn}
            className="btn bg-[#011187eb] text-white p-3 absolute my-10 right-0 mr-[4%] flex items-center space-x-2 rounded-lg hover:tracking-tight hover:shadow-2xl hover:shadow-black transition-all ease-in-out duration-500"
          >
            <FaPlus />
            <span>Ajouter incident</span>
          </button>
        </div>
      )}
      {!isFinalUser && (
        <div className="flex mb-0 justify-between items-center rounded-lg p-4 mt-16 bg-white">
          <FaFilter className="text-3xl pt-2 text-[#011187eb]" />
          <div className="w-64">
            <div class="label pb-0">
              <span class="label-text">Choisir une Priorite :</span>
            </div>
            <select
              className="select select-info w-full   bg-white border border-gray-300 text-gray-700"
              value={selectedValue1}
              onChange={handleSelectChange1}
            >
              <option value="ALL">ALL</option>
              <option value="BASSE">Basse</option>
              <option value="MOYENNE">Moyenne</option>
              <option value="ELEVEE">Elevee</option>
            </select>
          </div>
          <div className="w-64">
            <div class="label pb-0">
              <span class="label-text">Choisir un Status :</span>
            </div>
            <select
              className="select select-info w-full  bg-white border border-gray-300 text-gray-700"
              value={selectedValue2}
              onChange={handleSelectChange2}
            >
              <option value="ALL">ALL</option>
              <option value="EN_ATTENTE">EN ATTENTE</option>
              <option value="EN_COURS">EN COURS</option>
              <option value="TRAITE">TRAITE</option>
              <option value="ANNULE">ANNULE</option>
            </select>
          </div>
          <div className="w-64">
            <div class="label pb-0">
              <span class="label-text">Choisir un Type :</span>
            </div>
            <select
              className="select select-info w-full  bg-white border border-gray-300 text-gray-700"
              value={selectedValue3}
              onChange={handleSelectChange3}
            >
              <option value="ALL">ALL</option>
              <option value="TYPE1">TYPE1</option>
              <option value="TYPE2">TYPE2</option>
              <option value="TYPE3">TYPE3</option>
              <option value="TYPE4">TYPE4</option>
              <option value="TYPE4">TYPE5</option>
            </select>
          </div>
          <button
            onClick={handleClick}
            className="bg-[#011187eb] btn text-white mt-7"
          >
            SEARCH
          </button>
          {/* <button
            onClick={handleClick}
            className="bg-[#011187eb] btn text-white mt-7"
          >
            importer
          </button> */}
        </div>
      )}
      {/* Zone de contenu */}
      <div className="content-area h-full">
        <AreaTable />
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
            onSubmit={handelAddIncident}
            method="POST"
          >
            <Card
              title={
                <div className="flex items-center space-x-3 gap-3 text-[#011187eb]">
                  Ajouter Incident <FaCircleExclamation className=" text-1xl" />
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
                options={types}
                optionLabel="name"
                placeholder="Selectionner type d'incident"
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
                    fontWeight: 'bold',
                    border: '2px solid gray',
                  }}
                  className="p-button-text p-2 border-2 border-gray-700 text-gray-600 hover:bg-gray-600 hover:text-white"
                  onClick={() => setShow(false)}
                />

                <Button
                  label="Ajouter"
                  type="submit"
                  style={{
                    fontWeight: 'bold', // Appliquer un texte en gras
                    border: '2px solid #011187eb',
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
}

export default Incidents
