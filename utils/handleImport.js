import FileClass from "../templates/File";
import React from 'react'
import {toDataURL} from "../../../core/utils/imageManipulation";

export default function handleImport(files, hook) {
    let f = files
    f.forEach((fi, i) => {
        let reader = new FileReader();
        const split = fi.name.split(/\.([a-zA-Z].+)$/)
        const nFile = new FileClass(split[0], split[1], fi.size)
        if (split[1].includes('png') || split[1].includes('jpeg'))
            toDataURL(URL.createObjectURL(fi), base64 => hook.pushFile(nFile, base64))
        else {
            reader.addEventListener('load', event => {
                hook.pushFile(nFile, event.target.result)
            });
            reader.readAsText(fi)
        }
    })
}
