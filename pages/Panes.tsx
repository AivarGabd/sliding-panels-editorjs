

import { AllotmentProps, PaneProps } from "allotment/dist/types/src/allotment";
import { ComponentType, useEffect, useRef, useState } from "react";
import Panels from './panels.json'
import data from './EditorjsData copy.json'
import { IconContext } from "react-icons";
import { BsChevronBarLeft } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { HiDotsVertical } from 'react-icons/hi';
import RenderNewEditorjs from './RenderNewEditorjs'


export function Panes() {
    const isMountedRef = useRef(false);
    const ref = useRef(null);
    const panelMinSize = 30
    let panelsSizesArray: any = []
    const [state, setState] = useState({
        panels: [
            { visible: true, contentReadOnly: true, id: '0', editor: null },
            { visible: true, contentReadOnly: true, id: '1', editor: null }
        ]
    })
    const [Allotment, setAllotment] = useState<(ComponentType<AllotmentProps> & { Pane: ComponentType<PaneProps> }) | null>(null);


    useEffect(() => {
        isMountedRef.current = true;
        import("allotment")
            .then((mod) => {
                if (!isMountedRef.current) {
                    return;
                }
                setAllotment(mod.Allotment);
            })
            .catch((err) =>
                console.error(err, `could not import allotment ${err.message}`)
            );
        return () => {
            isMountedRef.current = false;
        };

    }, []);
    if (!Allotment) {
        return <div>loading...</div>;
    }



    function collapsePanel(i: any) {
        panelsSizesArray[i - 1] = panelMinSize
        ref.current.resize(panelsSizesArray)
    }

    function collapseAll() {
        let resizeArray: any = []
        Panels.forEach(() => { resizeArray.push(panelMinSize) })
        ref.current.resize(resizeArray);
    }

    const handleMyChange = (targetComponentIndex: any) => {
        let newState = state.panels.map((i, index) => index == targetComponentIndex ? { ...i, visible: false } : i);
        //удалять
        setState(() => ({ panels: newState }));
    };

    function openNewArticle() {
        const newPanelIndex = state.panels.length
        let newPanel = { visible: true, contentReadOnly: false, id: String(newPanelIndex), editor: null }
        state.panels.push(newPanel)
        setState(() => ({ panels: state.panels }))

        //console.log(newPanel)
        //console.log(state.panels)
    }

    function contentClick(targetComponentId: any) {
        const clickedPanel = state.panels.find(x => x.id == targetComponentId)
        if (clickedPanel.contentReadOnly) {
            clickedPanel.contentReadOnly = false
            setState(() => ({ panels: state.panels }))
            clickedPanel.editor.readOnly.toggle()
        }
    }

    function CollapsePanelButton({ index }) {
        if (index != 0) return <button onClick={() => collapsePanel(index)}><BsChevronBarLeft /></button>
        return
    }

    function panelsResize(raay) {
        panelsSizesArray = raay
        state.panels.forEach((panel) => {
            panel.contentReadOnly = true
            panel.editor.isReady
                .then(() => {
                    //console.log('Editor.js is ready to work!')
                    //panel.editor.readOnly.toggle(true)
                    /** Do anything you need after editor initialization */
                })
                .catch((reason:any) => {
                    console.log(`Editor.js initialization failed because of ${reason}`)
                });
            //panel.editor.readOnly.toggle(true)
        })
        setState(() => ({ panels: state.panels }))
    }



    return (
        <Allotment
            ref={ref}
            //onReset={() => collapseAll()}
            onChange={(raay) => panelsResize(raay)}
            defaultSizes={[panelsSizesArray]}

        >
            {
                state.panels.map((obj, index) => {
                    return (
                        <Allotment.Pane minSize={panelMinSize} className={`panel`} key={index} onMyChange={() => handleMyChange(index)} visible={obj.visible}>
                            <div className="panel-info-block">
                                <div className="container">
                                    <CollapsePanelButton index={index} />
                                    <button onClick={(e) => handleMyChange(index)}><GrClose /></button>
                                    <button onClick={() => alert('!')}><HiDotsVertical /></button>
                                </div>
                            </div>
                            <div className="panel-main-content" onClick={() => contentClick(obj.id)} style={obj.contentReadOnly ? { backgroundColor: '#f8f5f1' } : { backgroundColor: 'white' }}>
                                <div className="content-container">
                                    <h2>{String(obj.contentReadOnly)}</h2>
                                    <div id={`editor${obj.id}`}></div>
                                </div>
                            </div>
                            <RenderNewEditorjs panels={state.panels} />
                        </Allotment.Pane>
                    )
                })
            }
            <div>
                <div className="last-panel-pretty-sliding-block">
                    <div>
                    </div>
                </div>
                <button onClick={() => openNewArticle()}> Open new article</button>
            </div>
        </Allotment>
    )
}






