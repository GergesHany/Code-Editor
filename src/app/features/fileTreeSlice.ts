import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFile } from '../../interfaces';

interface IClickedFile {
    filename: string;
    fileContent: string;
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
    }
})

export const { setOpenedFiles } = fileTreeSlice.actions;
export default fileTreeSlice.reducer;
