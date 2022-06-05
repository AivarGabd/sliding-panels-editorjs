import React, { useState, useEffect } from 'react';
import data from './EditorjsData copy.json'

export default function RenderNewEditorjs(panels: any) {
  console.log(panels.panels)

  useEffect(() => {
    const Editor = require('@editorjs/editorjs')
    const tools = {
      header: {
        class: require('@editorjs/header'),
        config: {
          placeholder: 'Enter a header',
          defaultLevel: 3
        }
      },
      paragraph: {
        class: require('@editorjs/paragraph'),
        inlineToolbar: true
      },
      embed: {
        class: require('@editorjs/embed'),
        config: {
          services: {
            youtube: true,
            miro: true,
            twitter: true
          }
        }
      },
      linkTool: {
        class: require('@editorjs/link'),
        config: {
          endpoint: '/link',
        }
      },
      image: {
        class: require('@editorjs/image'),
        config: {
          endpoints: {
            byFile: '/editor_add_photo_file',
            byUrl: '/editor_add_photo_link',
          },
          captionPlaceholder: false
        }
      },
      table: {
        class: require('@editorjs/table'),
        inlineToolbar: true,
        config: {
          rows: 2,
          cols: 3,
        },
      },
      code: require('@editorjs/code'),
      Marker: {
        class: require('@editorjs/marker'),
        shortcut: 'CMD+SHIFT+M',
      },
      delimiter: require('@editorjs/delimiter'),
    }

    panels.panels.map((i, index) => {
      if (i.editor == null) {
        i.editor = new Editor({
          holder: `editor${i.id}`,
          placeholder: "Insert your text here!",
          minHeight: 100,
          data: data,
          readOnly: i.contentReadOnly,
          tools: tools,
        });
      }
    })
  }, [])
}




