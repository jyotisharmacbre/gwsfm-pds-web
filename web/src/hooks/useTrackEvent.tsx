import {useState, useEffect, useRef} from 'react'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'

export default function useTrackEvent(
  appInsights: ApplicationInsights,
  eventName:string,
  eventData:any,
  skipFirstRun:boolean = true,
) {
  const [data, setData] = useState(eventData)
  const firstRun = useRef(skipFirstRun)

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
      appInsights.trackEvent({name: eventName}, data)
  }, [appInsights, data, eventName])

  return setData
}
