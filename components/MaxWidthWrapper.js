import React from 'react'

const MaxWidthWrapper = props => {
  const theme = props.theme === 'dark' ?
    {
      background: '#131111',
      color: '#f3f4ef'
    } :
    null
  return (
    <div className='max-width-wrapper'>
      { props.children }
      <style jsx>{`
      .max-width-wrapper{
        display: ${props.display ? props.display : 'flex'};
        background: ${theme ? theme.background : 'none'};
        color: ${theme ? theme.color : ''};
        justify-content: space-between;
        flex-wrap: wrap;
        max-width: 1200px;
        margin: 0 auto;
        padding: 7px;
        box-sizing: border-box;
      }
`}
      </style>
    </div>
  )
}

export default MaxWidthWrapper