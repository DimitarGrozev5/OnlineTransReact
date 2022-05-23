import { useDispatch } from "react-redux";
import addMessageThunk from "../../../../../store/thunks-messages/add-message";
import pasteThunk from "../../../../../store/thunks/textarea-thunks/paste";
import readDxfThunk from "../../../../../store/thunks/textarea-thunks/readDxfThunk";
import { ReadFileAsText } from "../../../../../utils/read-file-as-text";

export const useTextAreaOpenFile = (allowedDividers) => {
  const dispatch = useDispatch();
  
  return (files) => {
    // The app accepts only one file
    if (files.length > 1) {
      dispatch(addMessageThunk("Приема се само един файл наведнъж", null));
    }

    const file = files[0];

    // Handle text file
    if (file.type === "text/plain") {
      ReadFileAsText(file)
        .then((res) => {
          dispatch(
            pasteThunk(
              allowedDividers.filter((div) => div.on),
              res
            )
          );
        })
        .catch(() =>
          dispatch(
            addMessageThunk({
              msg: "Проблем при отваряне на файл " + file.name,
            })
          )
        );
    }

    // Handle dxf file
    else if (file.name.split(".").pop().toLowerCase() === "dxf") {
      ReadFileAsText(file)
        .then((res) => {
          dispatch(readDxfThunk(res));
        })
        .catch((err) =>
          dispatch(
            addMessageThunk({
              msg:
                "Проблем при отваряне на файл " +
                file.name +
                "\n" +
                err.message,
            })
          )
        );
    }
    // Reject other formats
    else {
      dispatch(
        addMessageThunk({
          msg: "Приемат се само .txt и .dxf файлове",
        })
      );
    }
  };
};
