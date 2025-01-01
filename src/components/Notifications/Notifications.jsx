import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

import {
  fetchNotifications,
  markNotificationAsSeen,
  countNotifications,
  deleteNotification,
} from "../../features/Notifications/notificationSlice";

const Notifications = ({ recipientId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { notifications, isLoading, error } = useSelector(
    (state) => state.notification
  );
  /*
  useEffect(() => {
    if (recipientId) {
      dispatch(fetchNotifications(recipientId))
      dispatch(countNotifications(recipientId))
    }

    const interval = setInterval(() => {
      if (recipientId) {
        dispatch(fetchNotifications(recipientId))
        dispatch(countNotifications(recipientId))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [dispatch, recipientId])
  */
  useEffect(() => {
    if (recipientId) {
      dispatch(fetchNotifications(recipientId));
      //dispatch(countNotifications(recipientId))
    }
  }, []);

  const handleMarkAsSeen = (notification) => {
    console.log(notification.id);
    dispatch(deleteNotification(notification.id));
    /*
    if (notification.type === 'incident') {
      dispatch(deleteNotification(notification.id)).then(() => {
        if (recipientId) {
          dispatch(countNotifications(recipientId)).then(() => {
            dispatch(fetchNotifications(recipientId))
          })
        }
        navigate('/incidents')
      })
    }
      */
  };

  // Supprimer une notification
  const handleDeleteNotification = (notificationId) => {
    dispatch(deleteNotification(notificationId)).then(() => {
      if (recipientId) {
        dispatch(countNotifications(recipientId)).then(() => {
          dispatch(fetchNotifications(recipientId));
        });
      }
    });
  };
  const [isVisible, setIsVisible] = useState(true);
  return (
    isVisible && (
      <Box
        sx={{
          position: "absolute",
          top: 65,
          right: 15,
          bgcolor: "var(--sidebar-light)",
          boxShadow: 3,
          p: 2,
          borderRadius: 5,
          zIndex: 10,
          minWidth: 250,
          border: "2px solid var(--background-color)",
        }}
        onMouseLeave={() => setIsVisible(false)}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            mb: 1,
            color: "var(--side-blue)",
            fontSize: "1.3rem",
          }}
        >
          Notifications
        </Typography>

        {isLoading && <CircularProgress size={20} />}

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}

        {!isLoading && notifications.length > 0 ? (
          notifications.map((notification) => (
            <Box
              key={notification.id}
              sx={{
                mb: 1,
                p: 1,
                bgcolor: notification.seen ? "dark" : "var(--background-color)",
                borderRadius: 1,
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                borderRadius: 5,
                alignItems: "center",
                color: "var(--side-blue)",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              <Typography
                variant="body2"
                onClick={() => handleMarkAsSeen(notification)}
                sx={{ cursor: "pointer", flexGrow: 1 }}
              >
                {notification.contenu}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: "var(--side-blue)" }}>
            Aucune notification disponible.
          </Typography>
        )}
      </Box>
    )
  );
};

export default Notifications;
