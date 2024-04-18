export const Button = ({
    name = '',
    onDoubleClick = () => { },
    showIcon = false,
    onToggleIconClick = () => { },
    showOpenIcon = false
}) => {
    return (
        <button data-file-name={name} onDoubleClick={onDoubleClick} title={name}>
            <span className="name">{name}</span>
            {
                showIcon && <span className='toggle-icon' data-testid="toggle-icon" role='button' aria-label='toggle-button' onClick={onToggleIconClick}>{showOpenIcon ? '[-]' : '[+]'}</span>
            }
        </button>
    )
}

export default Button;