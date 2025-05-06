import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"


interface IProps {
    defaultLayout?: number[] | undefined;
    LeftPanel: React.ReactNode;
    RightPanel: React.ReactNode;
    ShowLeftPanel?: boolean;
}

const ResizablePanel = ({defaultLayout = [33, 67], LeftPanel, RightPanel, ShowLeftPanel = true}: IProps) => {
    const onLayout = (sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
    };

    // Ensure defaultLayout has exactly 2 items
    const safeLayout = Array.isArray(defaultLayout) && defaultLayout.length >= 2 
        ? [defaultLayout[0], defaultLayout[1]] 
        : [33, 67];

    return (
        <PanelGroup direction="horizontal" onLayout={onLayout} autoSaveId="condition">
            {
                ShowLeftPanel && 
                <>
                    <Panel defaultSize={safeLayout[0]}>{LeftPanel}</Panel>
                    <PanelResizeHandle className="border-r border-[#ffffff1f]" />
                </>
            }
            <Panel defaultSize={safeLayout[1]} minSize={40}>{RightPanel}</Panel>
        </PanelGroup>
    );    
};

export default ResizablePanel;