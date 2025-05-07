import { ReactNode } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"

interface IProps {
    defaultLayout?: number[] | undefined;
    LeftPanel: ReactNode;
    RightPanel: ReactNode;
    ShowLeftPanel?: boolean;
}

const ResizablePanel = ({defaultLayout = [33, 67], LeftPanel, RightPanel, ShowLeftPanel}: IProps) => {
    const onLayout = (sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
    };

    return (
        <PanelGroup direction="horizontal" onLayout={onLayout} autoSaveId="condition">
            {
                ShowLeftPanel && 
                <>
                    <Panel defaultSize={defaultLayout[0]}>{LeftPanel}</Panel>
                    <PanelResizeHandle className="w-2" />
                </>
            }
            <Panel defaultSize={defaultLayout[1]} minSize={40}>{RightPanel}</Panel>
        </PanelGroup>
    );    
};

export default ResizablePanel;