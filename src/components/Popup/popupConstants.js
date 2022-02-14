const PopupType = {
  DELETE_POPUP: "delete-popup",
  EDIT_POPUP: "edit-popup",
}

const PopupConfig = {
  [PopupType.DELETE_POPUP]: {
    title: "Are you sure you want to delete this recording?",
    buttons: [{
      value: "Delete",
      confirmAction: true,
    }, {
      value: "Cancel",
      confirmAction: false,
    }],
  },
  [PopupType.EDIT_POPUP]: {
    title: "Enter a new name",
    buttons: [{
      value: "Edit",
      confirmAction: true,
    }, {
      value: "Cancel",
      confirmAction: false,
    }],
  },
}

export {
  PopupConfig,
  PopupType,
}
