import React from 'react'
import { pascalCase } from 'pascal-case'
import * as components from '../components/index'

const Fallback = (props) => <div {...props} />

// prettier-ignore
export const componentSelector = (componentType = '') => (components[pascalCase(componentType)] || Fallback)

const isRichText = (val) => {
  return (
    Array.isArray(val) && val.find((content) => content?._type === 'richText')
  )
}

const isObject = (value) => {
  return typeof value === 'object' && !Array.isArray(value) && !!value
}

const hasSubComponent = (val) => {
  if (isRichText(val)) {
    return true
  }

  if (Array.isArray(val)) {
    return !!val.find(
      (content) =>
        !!content?._type && componentSelector(content._type) !== Fallback
    )
  }

  return !!val?._type && componentSelector(val?._type) !== Fallback
}

export const buildComponent = (componentData, buildContext) => {
  if (isRichText(componentData)) {
    const Component = componentSelector('richText')
    const props = componentData.map((item) => {
      return buildPageProps(item, buildContext)
    })
    return <Component value={props} {...buildContext} references={{}} />
  }

  const Component = componentSelector(componentData._type)
  const props = buildPageProps(componentData, buildContext)

  return (
    <Component
      key={componentData._key}
      {...buildContext}
      {...props}
      references={{}}
    />
  )
}

export const buildPageProps = (pageData, buildContext = {}) => {
  let props = { ...pageData }

  if (props._ref) {
    const dataWithRefs = buildContext.references.find((reference) => {
      return reference._id.includes(props._ref)
    })

    if (hasSubComponent(dataWithRefs)) {
      return buildComponent(dataWithRefs, buildContext)
    } else {
      props = { ...dataWithRefs }
    }
  }

  Object.keys(props).forEach((field) => {
    const val = props[field]
    if (hasSubComponent(val)) {
      if (Array.isArray(val)) {
        if (isRichText(val)) {
          props[field] = buildComponent(val, buildContext)
        } else {
          props[field] = val.map((sub) =>
            hasSubComponent(sub) ? buildComponent(sub, buildContext) : sub
          )
        }
      } else {
        props[field] = buildComponent(val, buildContext)
      }
    } else if (isObject(val) && val._type !== 'image') {
      props[field] = buildPageProps(val, buildContext)
    } else if (Array.isArray(val)) {
      props[field] = val.map((item) =>
        isObject(item) ? buildPageProps(item, buildContext) : item
      )
    }
  })

  return props
}
