import './index.css'

const PasswordItem = props => {
  const {passwordDetails, onClickDelete} = props
  const {id, website, username, password, isShowed, myBg} = passwordDetails
  const onDelete = () => {
    onClickDelete(id)
  }
  return (
    <li className="list-item">
      <div className="inner-cont">
        <p className={`web-title ${myBg}`}>{website[0].toUpperCase()}</p>
        <div>
          <p>{website}</p>
          <p>{username}</p>
          {isShowed && <p>{password}</p>}
          {!isShowed && (
            <img
              className="star-image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </div>
      </div>
      <button
        onClick={onDelete}
        data-testid="delete"
        type="button"
        className="button3"
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default PasswordItem
