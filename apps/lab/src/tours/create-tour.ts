import introJs from 'intro.js'
import 'intro.js/introjs.css'

export interface GuidedTourStep {
  element?: string | HTMLElement
  title: string
  intro: string
  position?: 'top' | 'right' | 'bottom' | 'left' | 'floating'
}

export interface TourLabels {
  next: string
  previous: string
  done: string
  close: string
  progress: string
}

export function startGuidedTour(steps: GuidedTourStep[], labels: TourLabels, rtl: boolean): void {
  const tour = introJs.tour()
  tour.setOptions({
    steps,
    nextLabel: labels.next,
    prevLabel: labels.previous,
    doneLabel: labels.done,
    skipLabel: labels.close,
    showProgress: true,
    showStepNumbers: true,
    stepNumbersOfLabel: labels.progress.replace(':current', '').replace(':total', '').trim() || 'of',
    exitOnEsc: true,
    exitOnOverlayClick: true,
    keyboardNavigation: true,
    scrollToElement: true,
    disableInteraction: false,
    tooltipClass: rtl ? 'lab-tour lab-tour-rtl' : 'lab-tour',
  })
  void tour.start()
}
