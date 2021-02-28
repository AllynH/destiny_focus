import { exportComponentAsJPEG, exportComponentAsPNG } from 'react-component-export-image'
import { iOS } from '.'

export const takePicture = (currRef, name = 'Destiny-Focus') => {
  if (iOS()) {
    window.scrollTo(0, 0)
  }
  window.scrollTo(0, 0)
  const html2CanvasOpts = {
    fileName: name,
    html2CanvasOptions: { scrollX: 0, scrollY: -0 },
    // html2CanvasOptions: { scrollX: 0, scrollY: -window.scrollY },
  }
  exportComponentAsJPEG(currRef, { ...html2CanvasOpts })
}

export const capturePngWithName = (currRef, name = 'Destiny-Focus') => {
  if (iOS()) {
    window.scrollTo(0, 0)
  }
  window.scrollTo(0, 0)
  const html2CanvasOpts = {
    fileName: name,
    html2CanvasOptions: { scrollX: 0, scrollY: -0 },
    // html2CanvasOptions: { scrollX: 0, scrollY: -window.scrollY },
  }
  exportComponentAsPNG(currRef, { ...html2CanvasOpts })
}
