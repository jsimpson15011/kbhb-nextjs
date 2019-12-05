import React from 'react'

const MaxWidthWrapper = props => (
  <div className='max-width-wrapper'>
    { props.children }
    <style jsx>{`
      .max-width-wrapper{
        display: ${props.display ? props.display : 'flex'};
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
        padding: 5px;
        box-sizing: border-box;
      }
`}
    </style>
  </div>
)

export default MaxWidthWrapper