export interface IFile {
  id: string;
  name: string;
  isFolder: boolean;
  children?: IFile[];
  content?: string;
}

export interface MessageType {
  id: string;
  content: string[];
  sender: 'user' | 'model'
}

export interface Choice {
  message: {
      content: string;
  };
}