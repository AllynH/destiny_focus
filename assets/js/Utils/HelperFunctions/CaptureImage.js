/* eslint-disable import/prefer-default-export */
// Expecting to add additional functions...
import { exportComponentAsPNG } from 'react-component-export-image'
import { iOS } from '.'

import { GAImageCapture } from '../../Components/Analytics/Events'

export const takePictureEvent = (currRef, name = 'Destiny-Focus', component = 'Unknown') => {
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
  GAImageCapture('Image capture', component)
}
