interface TemplateProps {
  children: React.ReactNode
}

const Template: React.FC<TemplateProps> = ({ children }) => {
  return <div className="flex min-h-screen justify-center p-6 ">{children}</div>
}

export default Template
