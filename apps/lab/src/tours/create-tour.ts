import { driver, type DriveStep } from 'driver.js'
import 'driver.js/dist/driver.css'

export interface TourLabels {
  next: string
  previous: string
  done: string
  close: string
  progress: string
}

export function startGuidedTour(steps: DriveStep[], labels: TourLabels, rtl: boolean): void {
  const progressText = labels.progress
    .replace(':current', '{{current}}')
    .replace(':total', '{{total}}')

  driver({
    steps,
    animate: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    allowClose: true,
    overlayClickBehavior: 'nextStep',
    showProgress: true,
    progressText,
    nextBtnText: labels.next,
    prevBtnText: labels.previous,
    doneBtnText: labels.done,
    popoverClass: rtl ? 'lab-tour lab-tour-rtl' : 'lab-tour',
    onPopoverRender: (popover) => popover.closeButton.setAttribute('aria-label', labels.close),
  }).drive()
}
