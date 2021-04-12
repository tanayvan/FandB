import {
  Avatar,
  CircularProgress,
  Icon,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import React, { useState } from "react";
import color from "../Config/Color";

export default function Listitem({ text, icon, onClick }) {
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <ListItem style={{ opacity: loading ? 0.5 : 1 }}>
        <ListItemAvatar>
          <Avatar>
            <Icon>{icon}</Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={text} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={async () => {
              setLoading(true);
              await onClick();
              setLoading(false);
            }}
          >
            <Icon>delete</Icon>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {loading && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            right: "45%",
            top: "30%",

            color: color.green,
          }}
        />
      )}
    </div>
  );
}
