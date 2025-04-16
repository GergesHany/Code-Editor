import { v4 as uuid } from "uuid"
import { IFile } from "../interfaces";

export const fileTree: IFile = {
  id: uuid(),
  name: "VS Code Clone",
  isFolder: true,
  children: [
    {
      id: uuid(),
      name: "node_modules",
      isFolder: true,
      children: [],
    },
    {
      id: uuid(),
      name: "src",
      isFolder: true,
      children: [
        {
          id: uuid(),
          name: "components",
          isFolder: true,
          children: [
            {
              id: uuid(),
              name: "Button.tsx",
              isFolder: false,
              content: `import React from 'react';

                        interface IProps {
                          text: string;
                          onClick: () => void;
                        }

                        const Button = ({ text, onClick }: IProps) => {
                          return (
                            <button onClick={onClick}>{text}</button>
                          )
                        }

                        export default Button`,
            },
            {
              id: uuid(),
              name: "App.tsx",
              isFolder: false,
              content: `import React from 'react';
                        import Button from './Button';

                        const App = () => {
                            const handleClick = () => {
                                console.log('Button clicked!');
                            }

                            return (
                                <div>
                                <h1>Hello, world!</h1>
                                <Button text="Click me!" onClick={handleClick} />
                                </div>
                            );
                        }
                        export default App;`,
            },
          ],
        },
        {
          id: uuid(),
          name: "index.tsx",
          isFolder: false,
          content: `import React from 'react';
                        import ReactDOM from 'react-dom';
                        import App from './components/App';

                        ReactDOM.render(
                          <React.StrictMode>
                            <App />
                          </React.StrictMode>,
                          document.getElementById('root')
                        );`,
        },
      ],
    },
    {
      name: "public",
      id: uuid(),
      isFolder: true,
      children: [
        {
          id: uuid(),
          name: "index.html",
          isFolder: false,
          content: `<!DOCTYPE html>
                        <html lang="en">
                          <head>
                            <meta charset="UTF-8" />
                            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <title>Vite + React + TS</title>
                          </head>
                          <body>
                            <div id="root"></div>
                            <script type="module" src="/src/main.tsx"></script>
                          </body>
                        </html>`,
        },
      ],
    },
    {
      id: uuid(),
      name: "package.json",
      isFolder: false,
      content: `{
                          "name": "vite-react-ts",
                          "version": "1.0.0",
                          "scripts": {
                            "dev": "vite",
                            "build": "vite build",
                            "serve": "vite preview"
                          },
                          "dependencies": {
                            "react": "^17.0.0",
                            "react-dom": "^17.0.0"
                          },
                          "devDependencies": {
                            "@vitejs/plugin-react-refresh": "^1.3.1",
                            "@types/react": "^17.0.0",
                            "@types/react-dom": "^17.0.0",
                            "typescript": "^4.1.2",
                            "vite": "^2.0.0"
                          }
                        }`,
    },
    {
      id: uuid(),
      name: "tsconfig.json",
      isFolder: false,
      content: `{
                          "compilerOptions": {
                            "target": "esnext",
                            "module": "esnext",
                            "strict": true,
                            "jsx": "preserve",
                            "importHelpers": true,
                            "moduleResolution": "node",
                            "experimentalDecorators": true,
                            "skipLibCheck": true,
                            "esModuleInterop": true,
                            "allowSyntheticDefaultImports": true,
                            "sourceMap": true,
                            "baseUrl": ".",
                            "types": [
                              "vite/client",
                              "jest"
                            ],
                            "paths": {
                              "@/*": [
                                "src/*"
                              ]
                            },
                            "lib": [
                              "DOM",
                              "DOM.Iterable",
                              "ESNext"
                            ]
                          },
                          "include": [
                            "src/**/*.ts",
                            "src/**/*.tsx",
                            "src/**/*.d.ts",
                            "tests/**/*.ts",
                            "tests/**/*.tsx"
                          ],
                          "exclude": [
                            "node_modules"
                          ]
                        }`,
    },
  ],
};