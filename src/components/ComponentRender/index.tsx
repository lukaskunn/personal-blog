import { lazy } from 'react'

const Paragraph = lazy(() => import('../Paragraph'))
const SectionTitle = lazy(() => import('../SectionTitle'))
const Image = lazy(() => import('../Image'))
const CodeBlock = lazy(() => import('../CodeBlock'))
const Quote = lazy(() => import('../Quote'))
const ExternalLink = lazy(() => import('../ExternalLink'))
const SectionDivider = lazy(() => import('../SectionDivider'))

type ComponentType = {
    type: string
    data?: {[key: string]: any}
}

type ComponentRenderProps = {
    componentList: ComponentType[]
}

const ComponentRender = ({
    componentList
}: ComponentRenderProps) => {

    const componentMap: { [key: string]: React.ComponentType<any> } = {
        paragraph: Paragraph,
        image: Image,
        quote: Quote,
        divider: SectionDivider,
        "section-title": SectionTitle,
        "code-block": CodeBlock,
        "external-link": ExternalLink
    }
    
  return (
    componentList.map((component, index) => {
        const { type, data } = component
        const Component = componentMap[type]

        if (!Component) return null
        return <Component key={index} {...data} />
    })
  )
}

export default ComponentRender