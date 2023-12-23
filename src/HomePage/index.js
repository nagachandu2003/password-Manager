import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const bgArr = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6']

class HomePage extends Component {
  state = {
    count: 0,
    website: '',
    username: '',
    password: '',
    passwordArr: [],
    isChecked: false,
    searchInput: '',
  }

  onClickDelete = value => {
    const {passwordArr, count} = this.state
    const filteredArr = passwordArr.filter(ele => ele.id !== value)
    this.setState({passwordArr: filteredArr, count: count - 1})
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onToggleCheckBox = event => {
    this.setState({isChecked: event.target.checked})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickAdd = event => {
    event.preventDefault()
    const {count, website, username, password} = this.state
    const setBgColor = bgArr[Math.floor(Math.random(0, bgArr.length - 1) * 10)]
    const newObj = {
      id: uuidv4(),
      website,
      username,
      password,
      myBg: setBgColor,
      isShowed: false,
    }
    this.setState(prevState => ({
      website: '',
      username: '',
      password: '',
      passwordArr: [...prevState.passwordArr, newObj],
      count: count + 1,
    }))
  }

  render() {
    const {
      count,
      website,
      username,
      password,
      passwordArr,
      isChecked,
      searchInput,
    } = this.state
    console.log(searchInput)
    let filteredArr
    filteredArr = passwordArr
    if (searchInput !== '')
      filteredArr = passwordArr.filter(ele =>
        ele.website.toLowerCase().includes(searchInput.toLowerCase()),
      )
    console.log(filteredArr)
    if (isChecked)
      filteredArr = filteredArr.map(ele => {
        if (ele.isShowed === false) return {...ele, isShowed: !ele.isShowed}
        return ele
      })

    return (
      <div className="home-bg">
        <div className="title-cont">
          <img
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
        </div>
        <div className="card1">
          <div className="home-image-cont">
            <img
              className="home-image dis1"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />
            <img
              className="home-image dis2"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
          <div className="info-cont">
            <h1 className="heading">Add New Password</h1>
            <form onSubmit={this.onClickAdd}>
              <div className="flexi">
                <label htmlFor="website" className="image-cont">
                  <img
                    className="icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                </label>
                <input
                  onChange={this.onChangeWebsite}
                  value={website}
                  type="text"
                  id="website"
                  placeholder="Enter Website"
                  className="input-field"
                />
              </div>
              <div className="flexi">
                <label htmlFor="username" className="image-cont">
                  <img
                    className="icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                </label>
                <input
                  onChange={this.onChangeUsername}
                  value={username}
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  className="input-field"
                />
              </div>
              <div className="flexi">
                <label htmlFor="password" className="image-cont">
                  <img
                    className="icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                </label>
                <input
                  onChange={this.onChangePassword}
                  value={password}
                  id="password"
                  placeholder="Enter Password"
                  className="input-field"
                  type="password"
                />
              </div>
              <div className="buttonCenter">
                <button type="submit" className="button1">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="card2">
          <div className="flexi2">
            <div className="flexi">
              <h1 className="heading">Your Passwords</h1>
              <p className="password-count">{count}</p>
            </div>
            <div className="flexi3">
              <img
                className="search-icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onSearch}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="flexi3 al">
            <input
              onChange={this.onToggleCheckBox}
              id="check"
              type="checkbox"
              className="checkbox-input"
            />
            <label htmlFor="check" className="check-label">
              Show Passwords
            </label>
          </div>
          {filteredArr.length === 0 && (
            <div className="nopassword-container">
              <img
                className="nopasswords-image"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>No Passwords</p>
            </div>
          )}
          {filteredArr.length !== 0 && (
            <ul className="list-container">
              {filteredArr.map(ele => (
                <PasswordItem
                  key={ele.id}
                  passwordDetails={ele}
                  onClickDelete={this.onClickDelete}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default HomePage
