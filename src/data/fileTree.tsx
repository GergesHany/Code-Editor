import { IFile } from "../interfaces/index";

export const fileTree: IFile = {
    name: "src",
    isFolder: true,
    children: [
        {
            name: "node_modules",
            isFolder: true,
            children: [
                { 
                    name: "public", 
                    isFolder: true,
                    children: [
                        { name: "index.tsx", isFolder: false },
                        { name: "index.txt", isFolder: false }
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