import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFile } from '../../interfaces';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-hot-toast';

interface IClickedFile {
    activeTabId: string | null;
    filename: string;
    fileContent: string | undefined;
}

interface IContextMenuState {
    isVisible: boolean;
    position: { x: number, y: number };
    folderId: string;
}

interface IInitialState {
    openedFiles: IFile[];
    clickedFile: IClickedFile;
    tapIdToRemove: string | null;
    fileTree: IFile;
    contextMenu: IContextMenuState;
}

// Import the initial file tree
import { fileTree as initialFileTree } from '../../data/fileTree';

const initialState: IInitialState = {
    openedFiles: [],
    clickedFile: {
        activeTabId: null,
        filename: "",
        fileContent: "",
    },
    tapIdToRemove: null,
    fileTree: initialFileTree,
    contextMenu: {
        isVisible: false,
        position: { x: 0, y: 0 },
        folderId: ""
    }
}

// Helper function to find a folder by id and add a new item to it
const addItemToFolder = (tree: IFile, folderId: string, newItem: IFile): IFile => {
    if (tree.id === folderId && tree.isFolder) {
        return {
            ...tree,
            children: [...(tree.children || []), newItem]
        };
    }

    if (tree.children && tree.isFolder) {
        return {
            ...tree,
            children: tree.children.map(child => addItemToFolder(child, folderId, newItem))
        };
    }

    return tree;
};

// Helper function to find a folder by id
const findFolderById = (tree: IFile, folderId: string): IFile | null => {
    if (tree.id === folderId && tree.isFolder) {
        return tree;
    }

    if (tree.children && tree.isFolder) {
        for (const child of tree.children) {
            const found = findFolderById(child, folderId);
            if (found) return found;
        }
    }

    return null;
};

// check if the file name exists in the specific folder 
const fileFolderNameExists = (fileName: string, folder: IFile): boolean => {
    if (!folder.isFolder || !folder.children) return false;
    
    return folder.name == fileName || folder.children.some(child => child.name === fileName);
};

export const fileTreeSlice = createSlice({
    name: "fileTree",
    initialState,
    reducers: {
       setOpenedFiles: (state, action: PayloadAction<IFile[]>) => {
             state.openedFiles = action.payload;
       },
       setClikedFile: (state, action: PayloadAction<IClickedFile>) => {
            state.clickedFile = action.payload;
            // Update the content in openedFiles array
            if (action.payload.activeTabId) {
                const fileIndex = state.openedFiles.findIndex(file => file.id === action.payload.activeTabId);
                if (fileIndex !== -1) {
                    state.openedFiles[fileIndex].content = action.payload.fileContent;
                }
            }
       },
       setTapIdToRemove: (state, action: PayloadAction<string | null>) => {
           state.tapIdToRemove = action.payload;
       },
       showContextMenu: (state, action: PayloadAction<{ position: { x: number, y: number }, folderId: string }>) => {
           state.contextMenu = {
               isVisible: true,
               position: action.payload.position,
               folderId: action.payload.folderId
           };
       },
       hideContextMenu: (state) => {
           state.contextMenu.isVisible = false;
       },
       createFile: (state, action: PayloadAction<{ folderId: string, fileName: string, content?: string }>) => {
           const { folderId, fileName } = action.payload;
           
           // Find the target folder
           const targetFolder = findFolderById(state.fileTree, folderId);
           
           // Check if the folder exists and if the file name already exists in this folder
           if (targetFolder && fileFolderNameExists(fileName, targetFolder)) {
               toast.error("File name already exists in this folder");
               return;
           } 

           const newFile: IFile = {
               id: uuid(),
               name: fileName,
               isFolder: false,
               content: undefined,
           };   
           
           state.fileTree = addItemToFolder(state.fileTree, folderId, newFile);
       },
       createFolder: (state, action: PayloadAction<{ folderId: string, folderName: string }>) => {
           const { folderId, folderName } = action.payload;
           
           // Find the target folder
           const targetFolder = findFolderById(state.fileTree, folderId);
           
           // Check if the folder exists and if the folder name already exists in this folder
           if (targetFolder && fileFolderNameExists(folderName, targetFolder)) {
               toast.error("Folder name already exists in this folder");
               return;
           }
           
           const newFolder: IFile = {
               id: uuid(),
               name: folderName,
               isFolder: true,
               children: [],
           };
           
           state.fileTree = addItemToFolder(state.fileTree, folderId, newFolder);
       },
    }
})

export const { 
    setOpenedFiles, 
    setClikedFile, 
    setTapIdToRemove,
    createFile,
    createFolder,
    showContextMenu,
    hideContextMenu
} = fileTreeSlice.actions;

export default fileTreeSlice.reducer;
