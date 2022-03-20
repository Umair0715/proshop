import './Alert.css'

const Alert = (props) => {
  
  return (
    <div  style={ props.height && {height: props.height}} className='alert__wrapper'>
       <div className={`alert alert-${props.variant || 'info'}`}>{props.children}</div>
    </div>
  )
}

export default Alert