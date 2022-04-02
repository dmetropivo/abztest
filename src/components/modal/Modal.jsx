import { useEffect } from 'react'
import './Modal.sass'
const Modal = ({
    visible = false,
    title = '',
    content = '',
    footer = '',
    onClose,
}) => {

// создаем обработчик нажатия клавиши Esc
const onKeydown = ({key}) => {
switch (key) {
case 'Escape':
 onClose()
 break
}
}

// c помощью useEffect цепляем обработчик к нажатию клавиш
useEffect(() => {
document.addEventListener('keydown', onKeydown)
return () => document.removeEventListener('keydown', onKeydown)
})


// если компонент невидим, то не отображаем его
if (!visible) return null;

// или возвращаем верстку модального окна
return <div className="custom-modal" onClick={onClose}>
<div className="custom-modal-dialog" onClick={e => e.stopPropagation()}>
<div className="custom-modal-header">
 <h1 className="h1-custom custom-modal-title">{title}</h1>
</div>
<div className="custom-modal-body">
 <div className="custom-modal-content">{content}</div>
</div>
{footer && <div className="custom-modal-footer">{footer}</div>}
</div>
</div>
}
export default Modal