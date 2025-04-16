import { IFile } from "../interfaces/index";

export const fileTree: IFile = {
    name: "VS Code Clone",
    isFolder: true,
    children: [
        {
            name: "node_modules",
            isFolder: true,
            children: [
                { 
                    name: "@types", 
                    isFolder: true,
                    children: [
                        { name: "typescript", isFolder: false }
                    ] 
                },
            ]
        },
        {
            name: "index.html",
            isFolder: false,
        }
    ]
};