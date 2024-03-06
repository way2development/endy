import React from 'react'
import styled, { css } from 'styled-components'

import './skin.css?raw'

const Logo = ({ projectName }) => {
  return (
    <Icon isLogin={projectName}>
      <svg viewBox="0 0 132 60" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <path fill="#B22352" d="M0 59.985h132V0H0z" />
          <path
            d="M25.291 32.603v-.416c1.895.151 3.858-.066 5.595-.932 1.168-.583 2.236-1.641 2.491-3.112-1.396 1.305-3.483 1.165-5.169.962-.975-.117-1.945-.304-2.917-.466v-5.966h13.347v-4.876H19.846v10.615a9.224 9.224 0 0 0-2.731.843c-1.168.582-2.237 1.64-2.492 3.111 1.397-1.305 3.484-1.165 5.169-.963l.054.009v11.3h18.97v-4.877H25.291v-5.232M60.398 33.138 48.724 17.797H43.67v24.915h5.409V26.873l12.066 15.839h4.663V17.797h-5.41v15.341M87.888 30.326c0 4.413-3.026 7.439-7.51 7.439h-4.236v-15.02h4.236c4.484 0 7.51 3.096 7.51 7.51v.07Zm-7.51-12.529h-9.717v24.915h9.717c7.83 0 13.24-5.446 13.24-12.458v-.071c0-7.011-5.41-12.386-13.24-12.386ZM111.168 17.797l-6.051 10.001-5.944-10.001h-6.407l9.575 15.091v9.824h5.481v-9.93l9.575-14.985h-6.229"
            fill="#FFFFFE"
          />
        </g>
      </svg>
    </Icon>
  )
}

const Icon = styled.div`
  display: block;
  width: auto;
  height: 2em;
  max-width: 100%;
  margin: -0.75rem auto;
  color: white;

  ${props =>
    props.isLogin &&
    css`
      display: block;
      margin: 0 auto;
      height: 4rem;
      color: black;
    `}

  svg {
    display: block;
    margin: 0 auto;
    height: 100% !important;
    width: auto;
    fill: currentColor;
  }
`

export default Logo
