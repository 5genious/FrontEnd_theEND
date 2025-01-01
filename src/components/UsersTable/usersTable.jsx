import React from 'react'
import { useEffect, useState } from 'react'
import './usersTable.scss'
import { Modal } from '@mui/material'
import Box from '@mui/material/Box'
//import UpdateForm from '../../../screens/Crud/UpdateForm.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, importUsers } from '../../features/user/userSlice.js'
import UsersTableAction from './UsersTableAction.jsx'

const TABLE_HEADS = [
  'Nom',
  'Prénom',
  'email',
  'Type Utilisateur',
  'Numéro de telephone',
  'Action',
]
const usersTable = () => {
  const { users, isLoading } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const handleOpen = (data) => {
    console.log('handleOpen')
    //setSelectedData(data)
    //setOpen(true)
  }
  const handleDelete = (id) => {
    dispatch(deleteUser(id))
  }
  useEffect(() => {
    dispatch(importUsers())
  }, [])

  if (isLoading) {
    return (
      <section className="content-area-table">
        <div className="loader-container">
          <div className="loader">
            <div className="inner-circle"></div>
          </div>
        </div>
      </section>
    )
  }
  if (users.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full mt-20">
        No user found
      </div>
    )
  }
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Liste des Utilisateurs</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((dataItem) => {
              const utilisateur = dataItem.typeUtilisateurFinal
              return (
                <tr key={dataItem.id}>
                  <td>{dataItem.nom}</td>
                  <td>{dataItem.prenom}</td>
                  <td>
                    <div className="dt-priority">
                      <span className="text-gray-950">{dataItem.email}</span>
                    </div>
                  </td>
                  <td>
                    <div className="dt-status">
                      <span className="text-gray-950">
                        {utilisateur ? utilisateur : 'TECHNICIEN'}
                      </span>
                    </div>
                  </td>
                  <td>{dataItem.numeroTelephone}</td>
                  <td className="dt-cell-action">
                    <UsersTableAction
                      onDelete={handleDelete}
                      itemId={dataItem.id}
                      onEdit={() => handleOpen(dataItem)}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {/*
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <UpdateForm
            selectedData={selectedData}
            onClose={handleClose}
            onSubmit={handleUpdateSubmit}
            type="demande"
          />
        </Box>
      </Modal>
      */}
    </section>
  )
}

export default usersTable

/*


const DemandesTab = () => {
  const [selectedData, setSelectedData] = useState(null)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const { demandes, isLoading } = useSelector((store) => store.demandes)
  const { user } = useSelector((store) => store.user)
  const handleClose = () => {
    setOpen(false)
    setSelectedData(null)
  }

  const handleOpen = (data) => {
    setSelectedData(data)
    setOpen(true)
  }
  const handleDelete = async (id) => {
    dispatch(deleteDemande(id))
  }
  const handleUpdateSubmit = async (updatedData) => {
    try {
      if (!updatedData.id) {
        console.error(
          "L'ID de la demande est manquant ou invalide:",
          updatedData.id
        )
        return
      }
      dispatch(updateDemande(updatedData))
      handleClose()
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la demande :', error)
    }
  }
  
  useEffect(() => {
    if (user.roles.includes('USER')) {
      dispatch(importDemandes())
    } else {
      dispatch(importAllDemandes())
    }
  }, [])
  if (isLoading) {
    return (
      <section className="content-area-table">
        <div className="loader-container">
          <div className="loader">
            <div className="inner-circle"></div>
          </div>
        </div>
      </section>
    )
  }
  if (demandes.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full mt-20">
        <img src={emtyTable} alt="" width={400} />
        <p className="text-[#011187eb] font-bold  text-[20px]">
          Pas de Demande trouver
        </p>
        <p className="text-[#011187eb]">
          Ajouter une demande pour voir le contenue
        </p>
      </div>
    )
  }
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Liste des Demandes</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {demandes.map((dataItem) => {
              const utilisateurFinal = dataItem.utilisateurFinalDTO
              return (
                <tr key={dataItem.id}>
                  <td>{dataItem.designation}</td>
                  <td>
                    <div className="dt-priority">
                      <span
                        className={`dt-priority-dot dot-${
                          dataItem.priorite || 'NON_DEFINI'
                        }`}
                      >
                        {dataItem.priorite === 'BASSE' && 'Basse'}
                        {dataItem.priorite === 'MOYENNE' && 'Moyenne'}
                        {dataItem.priorite === 'ELEVEE' && 'Elevé'}
                      </span>
                    </div>
                  </td>

                  <td>
                    {new Date(dataItem.dateCreation).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="dt-status">
                      <span
                        className={`dt-status-dot dot-${
                          dataItem.status || 'NON_DEFINI'
                        }`}
                      >
                        {dataItem.status === 'EN_ATTENTE' && 'En attente'}
                        {dataItem.status === 'EN_COURS' && 'En cours'}
                        {dataItem.status === 'ACCEPTEE' && 'Acceptée'}
                        {dataItem.status === 'REJETEE' && 'Rejetée'}
                        {!dataItem.status && 'Non défini'}{' '}
                        
                      </span>
                    </div>
                  </td>
                  <td>
                    {utilisateurFinal
                      ? `${utilisateurFinal.nom} ${utilisateurFinal.prenom}`
                      : 'Inconnu'}
                  </td>
                  <td className="dt-cell-action">
                    <AreaTableAction
                      onDelete={handleDelete}
                      itemId={dataItem.id}
                      onEdit={() => handleOpen(dataItem)}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <UpdateForm
            selectedData={selectedData}
            onClose={handleClose}
            onSubmit={handleUpdateSubmit}
            type="demande"
          />
        </Box>
      </Modal>
    </section>
  )
}

const modalStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 'none',
  height: '100vh',
}

export default DemandesTab
*/
