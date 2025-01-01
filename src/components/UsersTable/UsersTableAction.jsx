import React from 'react'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSelector } from 'react-redux'

const UsersTableAction = ({ onDelete, itemId }) => {
  return (
    <div style={styles.container}>
      <IconButton
        aria-label="supprimer"
        style={{ ...styles.iconButton, color: 'red' }}
        onClick={() => onDelete(itemId)}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px', // Espace entre les icônes
  },
  iconButton: {
    // Styles communs peuvent être ajoutés ici si nécessaire
  },
}
export default UsersTableAction
