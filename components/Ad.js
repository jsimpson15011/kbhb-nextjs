import React, {useEffect} from "react"

const Ad = (props) => {
  const { currentPath } = props

  useEffect(() => {
    window.adsbygoogle = window.adsbygoogle || []
    try {
      window.adsbygoogle.push({})
    }catch (e){
      console.log(e)
    }
  }, [currentPath])

  return(
    <div key={currentPath}>
      <ins className="adsbygoogle"
           style={props.style}
           data-ad-layout={props.layout ? props.layout : undefined}
           data-ad-format={props.format}
           data-ad-client="ca-pub-6596096319870359"
           data-ad-slot={props.slot}
           data-full-width-responsive={props.responsive}
      />
    </div>
  )
}

export default Ad