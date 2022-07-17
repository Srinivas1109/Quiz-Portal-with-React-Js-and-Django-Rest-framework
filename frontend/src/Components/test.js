import { forwardRef, useRef, useImperativeHandle } from "react"

const ChildComp = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    showAlert() {
      alert("Hello from Child Component")
    },
  }))
  return <div></div>
})

function App() {
  const childCompRef = useRef()
  return (
    <div>
      <button onClick={() => childCompRef.current.showAlert()}>Click Me</button>
      <ChildComp ref={childCompRef} />
    </div>
  )
}

export default App
