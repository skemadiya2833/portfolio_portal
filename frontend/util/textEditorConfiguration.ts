export function textEditorConfiguration(charLimit?: number, placeholder?: string) {
    return {
        "placeholder": placeholder ?? '',
        "toolbarButtonSize": "middle" as unknown as "middle",
        "allowResizeY": false,
        "showWordsCounter": false,
        "showXPathInStatusbar": false,
        "disablePlugins": "color,drag-and-drop-element,file,iframe,image,image-processor,image-properties,line-height,media,powered-by-jodit,print,select-cells,table,table-keyboard-navigation,video,wrap-nodes,xpath,speech-recognize,ai-assistant",
        "height": "200px",
        "width": "100%",
        "limitChars": charLimit ?? 600,
        "buttons": "bold,italic,underline,strikethrough,link,eraser,ul,ol,font,fontsize,fullsize,paragraph,superscript,subscript,undo,redo,cut,copy,paste",
        "useNativeTooltip": true
    }
}