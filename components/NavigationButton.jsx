import Link from 'next/link'
import React from 'react'

const NavigationButton = (props) => {
  return (
    <>
    <Link 
    href={props.navigate_path}
    className={props.class}
    >
        {props.text}
        </Link>
    </>
  )
}

export default NavigationButton