import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSelector } from 'react-redux'

const AreaTableAction = ({
  onDelete,
  itemId,
  affected,
  onEdit,
  selectedRows,
  handleCheckboxChange,
  disableActions,
}) => {
  const { user } = useSelector((store) => store.user)

  // Style dynamique avec opacité pour l'état désactivé
  const getIconStyle = (color) => ({
    color: color,
    opacity: disableActions ? 0.3 : 1, // Réduire l'opacité si désactivé
    cursor: disableActions ? 'not-allowed' : 'pointer',
  })

  return (
    <div style={styles.container}>
      <IconButton
        aria-label="modifier"
        style={getIconStyle('green')}
        onClick={onEdit}
        disabled={disableActions}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        aria-label="supprimer"
        style={getIconStyle('red')}
        onClick={() => onDelete(itemId)}
        disabled={disableActions}
      >
        <DeleteIcon />
      </IconButton>
      {user.roles && user.roles.includes('ADMIN') && !affected && (
        <input
          type="checkbox"
          disabled={disableActions}
          checked={selectedRows.includes(itemId)}
          onChange={() => handleCheckboxChange(itemId)}
        />
      )}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px', // Espace entre les icônes
  },
}

export default AreaTableAction
