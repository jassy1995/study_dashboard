
import "./SquareBox.css"

const SquareBox = ({children}) => {
  return (
    <div className="aspect-ratio-parent square">
    <div className="aspect-ratio">
        <div className="content">
           {children}
        </div>
    </div>
</div>
  )
}

export default SquareBox