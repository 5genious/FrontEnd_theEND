import './UpdateForm.scss';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {  createNotification} from '../../features/Notifications/notificationSlice';
import { importUserIdsByRole} from '../../features/user/userSlice'

const UpdateForm = ({ selectedData, onClose, onSubmit, type }) => {
  const [designation, setDesignation] = useState('');
  const [utilisateur, setUtilisateur] = useState('');
  const [status, setStatus] = useState('');
  const [priorite, setPriorite] = useState('');
  const [dateCreation, setDateCreation] = useState('');
  const { user, isFinalUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedData) {
      setDesignation(selectedData.designation || '');
      setUtilisateur(
        selectedData.utilisateurFinalDTO
          ? `${selectedData.utilisateurFinalDTO.nom} ${selectedData.utilisateurFinalDTO.prenom}`
          : 'Inconnu'
      );
      setStatus(selectedData.status || '');
      setPriorite(selectedData.priorite || '');

      if (selectedData.dateCreation) {
        const date = new Date(selectedData.dateCreation);
        setDateCreation(date.toISOString().split('T')[0]);
      } else {
        setDateCreation('');
      }
    }
  }, [selectedData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      id: selectedData.id,
      designation,
      utilisateurFinalDTO: {
        nom: utilisateur.split(' ')[0] || '',
        prenom: utilisateur.split(' ')[1] || '',
      },
      status,
      priorite,
      dateCreation,
    };

    try {
      
      await onSubmit(updatedData);

      // Importer les utilisateurs à notifier
      const roleName = 'USER'; 
      const idsResponse = await dispatch(
        importUserIdsByRole(roleName)
      ).unwrap();

      if (Array.isArray(idsResponse)) {
        const recipientIds = idsResponse.map((user) => user.id);

        let notificationMessage = '';

        switch (status) {
          case 'EN_COURS':
            notificationMessage = 'Votre incident est en cours de traitement';
            break;
          case 'TRAITE':
            notificationMessage = 'Votre incident a été traité';
            break;
          case 'ANNULE':
            notificationMessage = 'Votre incident a été annulé';
            break;
          default:
            notificationMessage = 'Votre incident est en attente';
            break;
        }

        // Envoi des notifications uniquement aux utilisateurs concernés
        recipientIds.forEach((recipientId) => {
          // Si l'ID de l'utilisateur concerné correspond à l'ID du destinataire de la notification
          if (selectedData.utilisateurFinalDTO.id === recipientId) {
            dispatch(
              createNotification({
                senderId: user.userId,
                recipientId,
                contenu: notificationMessage,
                type: type,
              })
            );
          }
        });
        toast.success('Modification et notifications envoyées avec succès');
      } else {
        toast.error(
          'Erreur lors de la récupération des utilisateurs à notifier'
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des notifications :", error);
      toast.error(
        "Erreur lors de la modification ou de l'envoi des notifications"
      );
    }
  };

  return (
    <div className="update-form">
      <div className="form-container">
        <div className="header">
          <div className="icon">
            <IconButton aria-label="modifier" style={{ color: 'green' }}>
              <EditIcon />
            </IconButton>
          </div>
          <div className="title">
            <h2>
              {type === 'demande'
                ? 'Modifier une demande'
                : 'Modifier un incident'}
            </h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form-fields">
          <div className="input-group">
            <label>
              {type === 'demande'
                ? 'Désignation Demande'
                : 'Désignation Incident'}
            </label>
            <input
              type="text"
              className="input-field"
              placeholder={
                type === 'demande'
                  ? 'Désignation Demande'
                  : 'Désignation Incident'
              }
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>
          {!isFinalUser && (
            <>
              <div className="input-group">
                <label>Utilisateur</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Utilisateur"
                  value={utilisateur}
                  readOnly
                />
              </div>
              <div className="date-fields">
                <div className="input-group">
                  <label>Status</label>
                  <select
                    className="input-field"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {type === 'demande' ? (
                      <>
                        <option value="EN_ATTENTE">En Attente</option>
                        <option value="EN_COURS">En Cours</option>
                        <option value="ACCEPTEE">Acceptée</option>
                        <option value="REJETEE">Rejetée</option>
                      </>
                    ) : (
                      <>
                        <option value="EN_ATTENTE">En Attente</option>
                        <option value="EN_COURS">En Cours</option>
                        <option value="TRAITE">Traité</option>
                        <option value="ANNULE">Annulé</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="input-group">
                  <label>Priorité</label>
                  <select
                    className="input-field"
                    value={priorite}
                    onChange={(e) => setPriorite(e.target.value)}
                  >
                    <option value="BASSE">Basse</option>
                    <option value="MOYENNE">Moyenne</option>
                    <option value="ELEVEE">Élevée</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label>Date création</label>
                <input
                  type="date"
                  className="input-field"
                  value={dateCreation}
                  onChange={(e) => setDateCreation(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="button-group">
            <button type="button" className="cancel-button" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="create-button">
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
