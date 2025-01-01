import React, { useState } from 'react'
import { IconButton, Badge } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Notifications from './Notifications'

function NotificationButton() {
  const [open, setOpen] = useState(false)

  const toggleNotifications = () => {
    setOpen(!open)
  }

  return (
    <div>
      {}
      <IconButton size="large" color="inherit" onClick={toggleNotifications}>
        {}
        <Badge badgeContent={2} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {}
      {open && <Notifications />}
    </div>
  )
}

export default NotificationButton
