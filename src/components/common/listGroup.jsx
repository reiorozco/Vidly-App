import React from "react";
import PropTypes from "prop-types";

import { Box, List, ListItemButton, ListItemText } from "@mui/material";

function ListGroup({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        marginLeft: 2,
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      <List
        component="div"
        aria-label="secondary mailbox folder"
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          flexWrap: { xs: "wrap", md: "wrap" },
        }}
      >
        {items.map((item) => {
          return (
            <ListItemButton
              key={item[valueProperty]}
              selected={selectedItem === item}
              onClick={() => onItemSelect(item)}
            >
              <ListItemText primary={item[textProperty]} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

ListGroup.propTypes = {
  items: PropTypes.array,
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object,
};

export default ListGroup;
