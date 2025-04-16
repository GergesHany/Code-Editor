import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFile } from '../../interfaces';

interface IClickedFile {
    filename: string;
    fileContent: string | undefined;
}

interface IInitialState {
    openedFiles: IFile[];
    clickedFile: IClickedFile;
}

const initialState: IInitialState = {
    openedFiles: [],
    clickedFile: {
        filename: "",
        fileContent: "",
    }
}

export const fileTreeSlice = createSlice({
    name: "fileTree",
    initialState,
    reducers: {
       setOpenedFiles: (state, action: PayloadAction<IFile[]>) => {
             state.openedFiles = action.payload;
       },
       setClikedFile: (state, action: PayloadAction<IClickedFile>) => {
            state.clickedFile.filename = action.payload.filename;
            state.clickedFile.fileContent = action.payload.fileContent;
       }
    }
})

export const { setOpenedFiles, setClikedFile } = fileTreeSlice.actions;
export default fileTreeSlice.reducer;
