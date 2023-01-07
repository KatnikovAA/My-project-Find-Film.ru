import Button from "../button"
import "./modal.css"
export function Modal ({textModal,onSubmit,onClose}) {
    const clickModal = () =>{
        console.log("Клик по модалке!")
        onClose();
    }
    return (
    <div>  
        <div className="backDiv" onClick={clickModal}></div>
        <div className="modal">
            <div className="textModal">{textModal}</div>
            <Button text="Потоврить" onClick={onSubmit}/>
        </div>
    </div> 
    )
}